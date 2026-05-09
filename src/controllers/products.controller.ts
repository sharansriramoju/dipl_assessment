import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler";
import { ApiError } from "../errors/ApiError";
import {
  bulkUploadProductsService,
  getAllProductsService,
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

export const getAllProductsController = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      search,
      min_discounted_price,
      max_discounted_price,
      min_actual_price,
      max_actual_price,
      min_rating,
      max_rating,
      min_rating_count,
      max_rating_count,
      category_id,
      page,
      limit,
    } = req.query;
    const products = await getAllProductsService({
      search: search as string,
      start_discounted_price: min_discounted_price as string,
      end_discounted_price: max_discounted_price as string,
      start_actual_price: min_actual_price as string,
      end_actual_price: max_actual_price as string,
      start_rating: min_rating as string,
      end_rating: max_rating as string,
      start_rating_count: min_rating_count as string,
      end_rating_count: max_rating_count as string,
      category_id: category_id as string,
      page: page as string,
      limit: limit as string,
    });
    return res.status(200).json({
      message: "Products fetched successfully",
      data: products,
    });
  },
);
