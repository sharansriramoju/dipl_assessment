import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler";
import { getNoOfProductsPerCategoryService } from "../services/dashboard.service";

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
