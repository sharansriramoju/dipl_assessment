import { Transaction } from "sequelize";
import { Category, JobQueue, Product, ProductCategory } from "../models";

export const addProductRepository = async (
  productData: {
    product_id: string;
    product_name: string;
    description?: string;
    discounted_price: number;
    actual_price: number;
    discount_percentage: number;
    rating: number;
    rating_count?: number;
  },
  t?: Transaction,
) => {
  try {
    await Product.create(
      {
        product_id: productData.product_id,
        product_name: productData.product_name,
        description: productData.description,
        discounted_price: productData.discounted_price,
        actual_price: productData.actual_price,
        discount_percentage: productData.discount_percentage,
        rating: productData.rating,
        rating_count: productData.rating_count || 0,
      },
      { transaction: t },
    );
  } catch (error: any) {
    console.error("Error in addProductRepository:", error);
    throw new Error("Error in addProductRepository : " + error.message);
  }
};

export const getCategoryByNameRepository = async (
  category_name: string,
  t?: Transaction,
) => {
  try {
    return await Category.findOne({
      where: {
        name: category_name,
      },
      transaction: t,
    });
  } catch (error: any) {
    throw new Error("Error in getCategoryByNameRepository : " + error.message);
  }
};

export const addCategoryRepository = async (
  category_name: string,
  t?: Transaction,
) => {
  try {
    const [category] = await Category.findOrCreate({
      where: { name: category_name },
      defaults: { name: category_name },
      transaction: t,
    });
    return category.dataValues;
  } catch (error) {
    console.error("Error in addCategoryRepository:", error);
    throw new Error(
      "Error in addCategoryRepository : " + (error as any).message,
    );
  }
};

export const addProductCategoryRepository = async (
  product_id: string,
  category_id: string,
  t?: Transaction,
) => {
  try {
    await ProductCategory.create(
      {
        product_id,
        category_id,
      },
      { transaction: t },
    );
  } catch (error) {
    throw new Error(
      "Error in addProductCategoryRepository : " + (error as any).message,
    );
  }
};

export const getLatestRunningJobQueueRepository = async (t?: Transaction) => {
  return await JobQueue.findOne({
    order: [["created_at", "DESC"]],
    transaction: t,
  });
};
