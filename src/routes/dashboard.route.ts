import { Router } from "express";
import { getNoOfProductsPerCategoryController } from "../controllers/dashboard.controller";

export default (router: Router) => {
  router.get(
    "/dahsboard/products-per-category",
    getNoOfProductsPerCategoryController,
  );
};
