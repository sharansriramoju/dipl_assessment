import {
  getAverageRatingPerCategoryRepository,
  getDiscountPercentageDistributionRepository,
  getNoOfProductsPerCategoryRepository,
  getTopReviewedProductsRepository,
} from "../database/repositories/dashboard.repository";

export const getNoOfProductsPerCategoryService = async (query: {
  min_rating?: number;
  max_rating?: number;
  min_rating_count?: number;
  max_rating_count?: number;
  min_actual_price?: number;
  max_actual_price?: number;
  min_discounted_price?: number;
  max_discounted_price?: number;
}) => {
  return await getNoOfProductsPerCategoryRepository(query);
};

export const getAverageRatingPerCategoryService = async (query: {
  min_rating?: number;
  max_rating?: number;
  min_rating_count?: number;
  max_rating_count?: number;
  min_actual_price?: number;
  max_actual_price?: number;
  min_discounted_price?: number;
  max_discounted_price?: number;
}) => {
  return await getAverageRatingPerCategoryRepository(query);
};

export const getDiscountPercentageDistributionService = async (query: {
  min_rating?: number;
  max_rating?: number;
  min_rating_count?: number;
  max_rating_count?: number;
  min_actual_price?: number;
  max_actual_price?: number;
  min_discounted_price?: number;
  max_discounted_price?: number;
  category_ids?: string[];
}) => {
  return await getDiscountPercentageDistributionRepository(query);
};

export const getTopReviewProductsService = async () => {
  return await getTopReviewedProductsRepository();
};
