import z from "zod";

export const bulkUploadProductsSchema = z.array(
  z.object({
    product_id: z.string(),
    product_name: z.string(),
    category: z.string(),
    discounted_price: z.number().min(0),
    actual_price: z.number().min(0),
    discount_percentage: z.number().min(0),
    rating: z.number().min(0).max(5),
    rating_count: z.number().optional(),
    about_product: z.string(),
    user_name: z.string(),
    review_title: z.string(),
    review_content: z.string(),
  }),
);

export const getAllProductsSchema = z.object({
  page: z
    .string()
    .refine(
      (val) => !isNaN(Number(val)) && Number.isInteger(Number(val)),
      "need integer",
    )
    .optional(),
  limit: z
    .string()
    .refine(
      (val) => !isNaN(Number(val)) && Number.isInteger(Number(val)),
      "need integer",
    )
    .optional(),
  search: z.string().optional(),
  category_id: z.string().optional(),
  min_rating: z
    .string()
    .refine((val) => !isNaN(Number(val)), "need number")
    .optional(),
  max_rating: z
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
  min_actual_price: z
    .string()
    .refine((val) => !isNaN(Number(val)), "need number")
    .optional(),
  max_actual_price: z
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
});

export const getAllCategoriesSchema = z.object({
  search: z.string(),
});
