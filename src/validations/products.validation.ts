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
