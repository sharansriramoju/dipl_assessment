import { Router } from "express";
import {
  getAverageRatingPerCategoryController,
  getDiscountPercentageDistributionController,
  getNoOfProductsPerCategoryController,
  getTopReviewProductsController,
} from "../controllers/dashboard.controller";

export default (router: Router) => {
  router.get(
    "/dashboard/products-per-category/bargraph",
    getNoOfProductsPerCategoryController,
  );
  router.get(
    "/dashboard/average-rating-per-category/bargraph",
    getAverageRatingPerCategoryController,
  );
  router.get(
    "/dashboard/discount-percentage-distribution/histogram",
    getDiscountPercentageDistributionController,
  );
  router.get(
    "/dashboard/top-reviewed-products",
    getTopReviewProductsController,
  );
};
