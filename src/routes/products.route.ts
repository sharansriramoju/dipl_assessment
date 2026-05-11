import { Router } from "express";
import multer from "multer";
import {
  bulkUploadProductsController,
  getAllProductsController,
  getCategoriesController,
  getLatestBulkUploadJobStatusController,
} from "../controllers/products.controller";
import { validateQuery } from "../middlewares/index.middleware";
import {
  getAllCategoriesSchema,
  getAllProductsSchema,
} from "../validations/products.validation";

const upload = multer({ storage: multer.memoryStorage() });

export default (router: Router) => {
  router.post(
    "/bulk-upload/products",
    upload.single("file"),
    bulkUploadProductsController,
  );
  router.get(
    "/bulk-upload/products/latest-job-queue",
    getLatestBulkUploadJobStatusController,
  );
  router.get(
    "/products",
    validateQuery(getAllProductsSchema),
    getAllProductsController,
  );
  router.get(
    "/categories",
    validateQuery(getAllCategoriesSchema),
    getCategoriesController,
  );
};
