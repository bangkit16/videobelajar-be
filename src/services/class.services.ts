import { Sequelize } from "sequelize";
import { Class, ClassModules, Material, Review, Tutor, User } from "../model";
import { ClassCategory } from "../model";

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

    return { rows, count };
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
    const result = await Class.create(data);
    return result;
  }

  public static async update(id: number, data: Record<string, unknown>) {
    const [affected] = await Class.update(data, { where: { id } });
    if (affected === 0) return null;

    const updated = await Class.findByPk(id);
    return updated;
  }

  public static async delete(id: number) {
    const affected = await Class.destroy({ where: { id } });
    return affected > 0;
  }
}
