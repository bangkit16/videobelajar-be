import { Sequelize } from "sequelize";
import {
  Class,
  ClassModules,
  ClassTutor,
  Material,
  Review,
  Tutor,
  User,
} from "../model";
import { ClassCategory } from "../model";
import { sequelize } from "../lib/sequelize";
import type { CreateClassInput, UpdateClassInput } from "../schema/class.schema";

export class ClassService {
  public static async getAllClass(offset: number, limit: number) {
    const { count, rows } = await Class.findAndCountAll({
      offset,
      limit,
      distinct: true,
      attributes: {
        exclude: [
          "categoryId",
          "createdAt",
          "updatedAt",
          "totalVideos",
          "totalDocuments",
          "hasCertificate",
          "hasPretest",
          "hasFinalExam",
          "language",
          "duration",
          "promoEndsIn",
        ],
        include: [
          [
            Sequelize.literal(`(
              SELECT COUNT(*) FROM Review
              WHERE Review.classId = Class.id
            )`),
            "reviewCount",
          ],
          [
            Sequelize.literal(`(
              SELECT COALESCE(AVG(Review.rating), 0)
              FROM Review
              WHERE Review.classId = Class.id
            )`),
            "rating",
          ],
          [
            Sequelize.literal(`(
              SELECT categoryName FROM ClassCategory
              WHERE ClassCategory.id = Class.categoryId
            )`),
            "categoryName",
          ],
        ],
      },
      include: [
        {
          model: Tutor,
          as: "tutors",
          through: { attributes: [] },
          attributes: [
            "id",
            "avatar",
            "company",
            "role",
            [
              Sequelize.literal(`(
                SELECT fullname FROM User
                WHERE User.id = tutors.userId
              )`),
              "name",
            ],
          ],
        },
      ],
    });

    const mappedRows = rows.map((row) => {
      const { tutors, ...restData } = row.toJSON();
      return {
        ...restData,
        tutors: tutors[0],
      };
    });

    return { rows: mappedRows, count };
  }

  public static async findById(id: number) {
    const data = await Class.findByPk(id, {
      attributes: {
        exclude: ["createdAt", "updatedAt"],
        include: [
          [
            Sequelize.literal(`(
              SELECT categoryName FROM ClassCategory
              WHERE ClassCategory.id = Class.id
            )`),
            "categoryName",
          ],
          [
            Sequelize.literal(`(
              SELECT COUNT(*) FROM Review
              WHERE Review.classId = Class.id
            )`),
            "reviewCount",
          ],
          [
            Sequelize.literal(`(
              SELECT COALESCE(AVG(Review.rating), 0)
              FROM Review
              WHERE Review.classId = Class.id
            )`),
            "rating",
          ],
        ],
      },
      include: [
        {
          model: Tutor,
          as: "tutors",
          through: { attributes: [] },
          attributes: [
            "id",
            "avatar",
            "company",
            "role",
            [
              Sequelize.literal(`(
                SELECT fullname FROM User
                WHERE User.id = tutors.userId
              )`),
              "name",
            ],
          ],
        },
        {
          model: Review,
          as: "reviews",
          attributes: [
            "rating",
            ["alumniOfBatch", "batch"],
            ["text", "comment"],
            [
              Sequelize.literal(`(
                SELECT fullname FROM User
                WHERE User.id = reviews.userId
              )`),
              "name",
            ],
            [
              Sequelize.literal(`(
                SELECT profileImage FROM User
                WHERE User.id = reviews.userId
              )`),
              "avatar",
            ],
          ],
        },
        {
          model: ClassModules,
          as: "modules",
          order: [["sortOrder", "ASC"]],
          include: [
            {
              model: Material,
              as: "materials",
              order: [["sortOrder", "ASC"]],
              attributes: ["title", "type", "duration"],
            },
          ],
          attributes: ["id", "title"],
        },
      ],
    });

    return data;
  }

  public static async create(data: Record<string, unknown>) {
    const { tutors, modules, ...classData } = data as CreateClassInput;

    // Auto-generate slug if not provided
    if (!classData.slug) {
      classData.slug =
        (classData.title as string)
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "") +
        "-" +
        Date.now();
    }

    const transaction = await sequelize.transaction();

    try {
      const newClass = await Class.create(classData, { transaction });

      if (tutors && tutors.length > 0) {
        await ClassTutor.bulkCreate(
          tutors.map((tutorId) => ({
            classId: newClass.getDataValue("id"),
            tutorId,
          })),
          { transaction },
        );
      }

      // 3. Modul + Material (nested)
      if (modules && modules.length > 0) {
        for (const mod of modules) {
          const { materials, ...moduleData } = mod;
          const newModule = await ClassModules.create(
            { ...moduleData, classId: newClass.getDataValue("id") },
            { transaction },
          );

          if (materials && materials.length > 0) {
            await Material.bulkCreate(
              materials.map((mat) => ({
                ...mat,
                moduleId: newModule.getDataValue("id"),
              })),
              { transaction },
            );
          }
        }
      }

      await transaction.commit();

      // Return class with relations
      const result = await Class.findByPk(newClass.getDataValue("id"), {
        include: [
          { model: Tutor, as: "tutors", through: { attributes: [] } },
          {
            model: ClassModules,
            as: "modules",
            include: [{ model: Material, as: "materials" }],
            order: [["sortOrder", "ASC"]],
          },
        ],
      });

      return result;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  public static async update(id: number, data: Record<string, unknown>) {
    const { modules, ...classData } = data as UpdateClassInput;

    const transaction = await sequelize.transaction();

    try {
      const [affected] = await Class.update(classData, { where: { id }, transaction });
      if (affected === 0) {
        await transaction.rollback();
        return null;
      }


      if (modules !== undefined) {
        const sentModuleIds = modules.filter((m) => m.id).map((m) => m.id!);

        const existingModules = await ClassModules.findAll({
          where: { classId: id }, attributes: ["id"], transaction,
        });
        const deletedModuleIds = existingModules
          .map((m) => m.getDataValue("id"))
          .filter((mid) => !sentModuleIds.includes(mid));

        if (deletedModuleIds.length > 0) {
          await Material.destroy({ where: { moduleId: deletedModuleIds }, transaction });
          await ClassModules.destroy({ where: { id: deletedModuleIds }, transaction });
        }

        for (const mod of modules) {
          if (mod.id) {
            const { id: moduleId, materials, ...moduleData } = mod;
            await ClassModules.update(moduleData, { where: { id: moduleId }, transaction });

            if (materials !== undefined) {
              const sentMaterialIds = materials.filter((m) => m.id).map((m) => m.id!);
              const existingMaterials = await Material.findAll({
                where: { moduleId }, attributes: ["id"], transaction,
              });
              const deletedMaterialIds = existingMaterials
                .map((m) => m.getDataValue("id"))
                .filter((mid) => !sentMaterialIds.includes(mid));
              if (deletedMaterialIds.length > 0) {
                await Material.destroy({ where: { id: deletedMaterialIds }, transaction });
              }

              for (const mat of materials) {
                if (mat.id) {
                  await Material.update(mat, { where: { id: mat.id }, transaction });
                } else {
                  await Material.create({ ...mat, moduleId }, { transaction });
                }
              }
            }
          } else {
            const { id: _, materials, ...moduleData } = mod;
            const newModule = await ClassModules.create(
              { ...moduleData, classId: id },
              { transaction },
            );

            if (materials && materials.length > 0) {
              await Material.bulkCreate(
                materials.map((mat) => ({ ...mat, moduleId: newModule.getDataValue("id") })),
                { transaction },
              );
            }
          }
        }
      }

      await transaction.commit();

      const updated = await Class.findByPk(id, {
        include: [
          { model: Tutor, as: "tutors", through: { attributes: [] } },
          {
            model: ClassModules,
            as: "modules",
            include: [{ model: Material, as: "materials" }],
            order: [["sortOrder", "ASC"]],
          },
        ],
      });
      return updated;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  public static async delete(id: number) {
    const transaction = await sequelize.transaction();

    try {
      const classData = await Class.findByPk(id, {
        attributes: ["id"],
        include: [
          {
            model: ClassModules,
            as: "modules",
            attributes: ["id"],
          },
        ],
        transaction,
      });

      if (!classData) {
        await transaction.rollback();
        return false;
      }

      await ClassTutor.destroy({ where: { classId: id }, transaction });

      const modules = classData.getDataValue("modules") ?? [];
      const moduleIds = Array.isArray(modules) ? modules.map((m: any) => m.id) : [];
      if (moduleIds.length > 0) {
        await Material.destroy({ where: { moduleId: moduleIds }, transaction });
        await ClassModules.destroy({ where: { classId: id }, transaction });
      }

      await Class.destroy({ where: { id }, transaction });

      await transaction.commit();
      return true;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
