import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler";
import { ApiError } from "../errors/ApiError";
import {
  bulkUploadProductsService,
  getLatestBulkUploadJobStatusService,
} from "../services/products.service";

export const bulkUploadProductsController = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.file) {
      throw new ApiError(400, "No file uploaded");
    }
    await bulkUploadProductsService(req.file);
    return res.status(200).json({
      message: "File uploaded job started successfully",
    });
  },
);

export const getLatestBulkUploadJobStatusController = asyncHandler(
  async (req: Request, res: Response) => {
    const jobStatus = await getLatestBulkUploadJobStatusService();
    return res.status(200).json({
      message: "Latest bulk upload job status fetched successfully",
      data: jobStatus,
    });
  },
);
