import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler";
import {
  getAverageRatingPerCategoryService,
  getDiscountPercentageDistributionService,
  getNoOfProductsPerCategoryService,
  getTopReviewProductsService,
} from "../services/dashboard.service";

const convertQueryToNumbers = (query: any) => ({
  min_rating: query.min_rating ? Number(query.min_rating) : undefined,
  max_rating: query.max_rating ? Number(query.max_rating) : undefined,
  min_rating_count: query.min_rating_count
    ? Number(query.min_rating_count)
    : undefined,
  max_rating_count: query.max_rating_count
    ? Number(query.max_rating_count)
    : undefined,
  min_actual_price: query.min_actual_price
    ? Number(query.min_actual_price)
    : undefined,
  max_actual_price: query.max_actual_price
    ? Number(query.max_actual_price)
    : undefined,
  min_discounted_price: query.min_discounted_price
    ? Number(query.min_discounted_price)
    : undefined,
  max_discounted_price: query.max_discounted_price
    ? Number(query.max_discounted_price)
    : undefined,
});

export const getNoOfProductsPerCategoryController = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await getNoOfProductsPerCategoryService(
      convertQueryToNumbers(req.query),
    );
    res.status(200).json({
      success: true,
      data,
    });
  },
);

export const getAverageRatingPerCategoryController = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await getAverageRatingPerCategoryService(
      convertQueryToNumbers(req.query),
    );
    res.status(200).json({
      success: true,
      data,
    });
  },
);

export const getDiscountPercentageDistributionController = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await getDiscountPercentageDistributionService({
      ...convertQueryToNumbers(req.query),
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
