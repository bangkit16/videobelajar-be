import type { Request } from "express";

/**
 * Extract page & limit from request query, return Sequelize offset/limit.
 * Default: page=1, limit=10. Ensure positive numbers.
 */
export const getPagination = (req: Request) => {
  const rawPage = parseInt(req.query.page as string);
  const rawLimit = parseInt(req.query.limit as string);

  const page = !isNaN(rawPage) && rawPage > 0 ? rawPage : 1;
  const limit = !isNaN(rawLimit) && rawLimit > 0 ? rawLimit : 10;

  return {
    sequelize: {
      offset: (page - 1) * limit,
      limit,
    },
    page,
    limit,
  };
};

/**
 * Wrap pagination metadata for API response.
 * Compatible with Infinite Query (Mobile) & Pagination (Web).
 */
export const wrapPagination = (
  totalData: number,
  page: number,
  limit: number,
) => {
  const totalPages = Math.ceil(totalData / limit);

  return {
    totalData,
    totalPages,
    currentPage: page,
    nextPage: page < totalPages ? page + 1 : null,
    prevPage: page > 1 ? page - 1 : null,
  };
};
