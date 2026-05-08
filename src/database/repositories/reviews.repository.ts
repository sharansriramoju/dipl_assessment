import { Transaction } from "sequelize";
import { Review } from "../models";

export const addReviewRepository = async (
  review: {
    product_id: string;
    user_name: string;
    review_title: string;
    review_content: string;
  },
  t?: Transaction,
) => {
  try {
    await Review.create(review, { transaction: t });
  } catch (error: any) {
    throw new Error("Error in addReviewRepository : " + error.message);
  }
};
