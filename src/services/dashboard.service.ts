import { getNoOfProductsPerCategoryRepository } from "../database/repositories/dashboard.repository";

export const getNoOfProductsPerCategoryService = async (
  category_ids?: string[],
) => {
  return await getNoOfProductsPerCategoryRepository(category_ids);
};
