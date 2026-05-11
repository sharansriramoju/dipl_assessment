import z from "zod";

export const getAllJobsSchema = z.object({
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
  status: z.enum(["completed", "pending"]).optional(),
});
