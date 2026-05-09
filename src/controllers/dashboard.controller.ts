import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler";
import {
  getAverageRatingPerCategoryService,
  getNoOfProductsPerCategoryService,
} from "../services/dashboard.service";

export const getNoOfProductsPerCategoryController = asyncHandler(
  async (req: Request, res: Response) => {
    const { category_ids } = req.query;
    const data = await getNoOfProductsPerCategoryService(
      category_ids ? JSON.parse(category_ids as string) : undefined,
    );
    res.status(200).json({
      success: true,
      data,
    });
  },
);

export const getAverageRatingPerCategoryController = asyncHandler(
  async (req: Request, res: Response) => {
    const { category_ids } = req.query;
    const data = await getAverageRatingPerCategoryService(
      category_ids ? JSON.parse(category_ids as string) : undefined,
    );
    res.status(200).json({
      success: true,
      data,
    });
  },
);
