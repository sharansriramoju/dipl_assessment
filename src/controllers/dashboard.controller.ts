import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler";
import {
  getAverageRatingPerCategoryService,
  getDiscountPercentageDistributionService,
  getNoOfProductsPerCategoryService,
  getTopReviewProductsService,
} from "../services/dashboard.service";

export const getNoOfProductsPerCategoryController = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await getNoOfProductsPerCategoryService(req.query);
    res.status(200).json({
      success: true,
      data,
    });
  },
);

export const getAverageRatingPerCategoryController = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await getAverageRatingPerCategoryService(req.query);
    res.status(200).json({
      success: true,
      data,
    });
  },
);

export const getDiscountPercentageDistributionController = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await getDiscountPercentageDistributionService({
      ...req.query,
      category_ids: req.query.category_ids
        ? JSON.parse(req.query.category_ids as string)
        : undefined,
    });
    res.status(200).json({
      success: true,
      data,
    });
  },
);

export const getTopReviewProductsController = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await getTopReviewProductsService();
    res.status(200).json({
      success: true,
      data,
    });
  },
);
