import { Sequelize } from "sequelize";
import { Class, Review, Tutor, User } from "../model";
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
            "totalReviews",
          ],
          [
            Sequelize.literal(`(
              SELECT COALESCE(AVG(Review.rating), 0)
              FROM Review
              WHERE Review.classId = Class.id
            )`),
            "averageRating",
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
      attributes: {
        exclude: ["createdAt", "updatedAt"],

        include: [
          ["id", "idHebat"],
          ["title", "titlewoww"],
          // Subquery: total reviews
          [
            Sequelize.literal(`(
              SELECT COUNT(*) FROM Review
              WHERE Review.classId = Class.id
            )`),
            "totalReviews",
          ],
          // Subquery: average rating
          [
            Sequelize.literal(`(
              SELECT COALESCE(AVG(Review.rating), 0)
              FROM Review
              WHERE Review.classId = Class.id
            )`),
            "averageRating",
          ],
        ],
      },
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
