import { Class } from "../model";
import { ClassCategory } from "../model";

type PaginationResult = {
  data: any[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export class ClassService {
  public static async getAllClass(page: number, limit: number): Promise<PaginationResult> {
    const offset = (page - 1) * limit;

    const { count, rows } = await Class.findAndCountAll({
      limit,
      offset,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: ClassCategory,
          as: "category",
          attributes: ["id", "categorySlug", "categoryName"],
        },
      ],
    });

    return {
      data: rows,
      pagination: {
        page,
        limit,
        total: count,
        totalPages: Math.ceil(count / limit),
      },
    };
  }
}
