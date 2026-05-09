import { Op, Transaction } from "sequelize";
import {
  Category,
  JobQueue,
  Product,
  ProductCategory,
  Review,
} from "../models";

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

export const getProductsRepository = async (
  query: {
    offset?: number;
    limit?: number;
    search?: string;
    category_id?: string;
    start_rating?: number;
    end_rating?: number;
    start_discounted_price?: number;
    end_discounted_price?: number;
    start_actual_price?: number;
    end_actual_price?: number;
    start_rating_count?: number;
    end_rating_count?: number;
  },
  t?: Transaction,
) => {
  const whereClause: any = {};
  if (query.search) {
    whereClause.product_name = {
      [Op.iLike]: `%${query.search}%`,
    };
  }
  if (query.start_rating !== undefined || query.end_rating !== undefined) {
    whereClause.rating = {};
    if (query.start_rating !== undefined) {
      whereClause.rating[Op.gte] = query.start_rating;
    }
    if (query.end_rating !== undefined) {
      whereClause.rating[Op.lte] = query.end_rating;
    }
  }
  if (
    query.start_discounted_price !== undefined ||
    query.end_discounted_price !== undefined
  ) {
    whereClause.discounted_price = {};
    if (query.start_discounted_price !== undefined) {
      whereClause.discounted_price[Op.gte] = query.start_discounted_price;
    }
    if (query.end_discounted_price !== undefined) {
      whereClause.discounted_price[Op.lte] = query.end_discounted_price;
    }
  }
  if (
    query.start_actual_price !== undefined ||
    query.end_actual_price !== undefined
  ) {
    whereClause.actual_price = {};
    if (query.start_actual_price !== undefined) {
      whereClause.actual_price[Op.gte] = query.start_actual_price;
    }
    if (query.end_actual_price !== undefined) {
      whereClause.actual_price[Op.lte] = query.end_actual_price;
    }
  }
  if (
    query.start_rating_count !== undefined ||
    query.end_rating_count !== undefined
  ) {
    whereClause.rating_count = {};
    if (query.start_rating_count !== undefined) {
      whereClause.rating_count[Op.gte] = query.start_rating_count;
    }
    if (query.end_rating_count !== undefined) {
      whereClause.rating_count[Op.lte] = query.end_rating_count;
    }
  }

  return await Product.findAndCountAll({
    where: whereClause,
    distinct: true,
    include: [
      {
        model: Review,
        as: "reviews",
        attributes: [
          "review_id",
          "review_title",
          "review_content",
          "user_name",
        ],
      },
      {
        model: Category,
        as: "categories",
        through: { attributes: ["product_id", "category_id"] },
        where: query.category_id
          ? {
              category_id: query.category_id,
            }
          : undefined,
      },
    ],
    offset: query.offset,
    limit: query.limit,
    transaction: t,
  });
};

export const getCategoriesRepository = async (
  search?: string,
  t?: Transaction,
) => {
  return await Category.findAll({
    where: search
      ? {
          name: {
            [Op.iLike]: `%${search}%`,
          },
        }
      : undefined,
    transaction: t,
  });
};
