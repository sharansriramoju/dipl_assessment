import {
  getAverageRatingPerCategoryRepository,
  getNoOfProductsPerCategoryRepository,
} from "../database/repositories/dashboard.repository";

export const getNoOfProductsPerCategoryService = async (
  category_ids?: string[],
) => {
  return await getNoOfProductsPerCategoryRepository(category_ids);
};

export const getAverageRatingPerCategoryService = async (
  category_ids?: string[],
) => {
  return await getAverageRatingPerCategoryRepository(category_ids);
};
