import { Router } from "express";
import {
  getAverageRatingPerCategoryController,
  getDiscountPercentageDistributionController,
  getNoOfProductsPerCategoryController,
  getTopReviewProductsController,
} from "../controllers/dashboard.controller";
import { validateQuery } from "../middlewares/index.middleware";
import {
  getNoOfProductsPerCategorySchema,
  getAverageRatingPerCategorySchema,
  getDiscountPercentageDistributionSchema,
  getTopReviewedProductsSchema,
} from "../validations/dashboard.validation";

export default (router: Router) => {
  router.get(
    "/dashboard/products-per-category/bargraph",
    validateQuery(getNoOfProductsPerCategorySchema),
    getNoOfProductsPerCategoryController,
  );
  router.get(
    "/dashboard/average-rating-per-category/bargraph",
    validateQuery(getAverageRatingPerCategorySchema),
    getAverageRatingPerCategoryController,
  );
  router.get(
    "/dashboard/discount-percentage-distribution/histogram",
    validateQuery(getDiscountPercentageDistributionSchema),
    getDiscountPercentageDistributionController,
  );
  router.get(
    "/dashboard/top-reviewed-products",
    validateQuery(getTopReviewedProductsSchema),
    getTopReviewProductsController,
  );
};
