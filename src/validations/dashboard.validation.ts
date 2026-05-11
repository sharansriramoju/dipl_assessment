import z from "zod";

const filterSchema = z.object({
  min_rating: z
    .string()
    .refine((val) => !isNaN(Number(val)), "need number")
    .optional(),
  max_rating: z
    .string()
    .refine((val) => !isNaN(Number(val)), "need number")
    .optional(),
  min_rating_count: z
    .string()
    .refine((val) => !isNaN(Number(val)), "need number")
    .optional(),
  max_rating_count: z
    .string()
    .refine((val) => !isNaN(Number(val)), "need number")
    .optional(),
  min_actual_price: z
    .string()
    .refine((val) => !isNaN(Number(val)), "need number")
    .optional(),
  max_actual_price: z
    .string()
    .refine((val) => !isNaN(Number(val)), "need number")
    .optional(),
  min_discounted_price: z
    .string()
    .refine((val) => !isNaN(Number(val)), "need number")
    .optional(),
  max_discounted_price: z
    .string()
    .refine((val) => !isNaN(Number(val)), "need number")
    .optional(),
});

export const getNoOfProductsPerCategorySchema = filterSchema;

export const getAverageRatingPerCategorySchema = filterSchema;

export const getDiscountPercentageDistributionSchema = filterSchema.extend({
  category_ids: z.string().optional(),
});

export const getTopReviewedProductsSchema = z.object({});
