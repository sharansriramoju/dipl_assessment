import { Router } from "express";
import {
  getAverageRatingPerCategoryController,
  getNoOfProductsPerCategoryController,
} from "../controllers/dashboard.controller";

export default (router: Router) => {
  router.get(
    "/dashboard/products-per-category",
    getNoOfProductsPerCategoryController,
  );
  router.get(
    "/dashboard/average-rating-per-category",
    getAverageRatingPerCategoryController,
  );
};
