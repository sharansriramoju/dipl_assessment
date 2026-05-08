import { Router } from "express";
import multer from "multer";
import {
  bulkUploadProductsController,
  getLatestBulkUploadJobStatusController,
} from "../controllers/products.controller";

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
};
