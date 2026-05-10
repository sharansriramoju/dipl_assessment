import { cast, col, fn, Op, QueryTypes, Transaction } from "sequelize";
import { Category, Product, ProductCategory, sequelize } from "../models";

export const getNoOfProductsPerCategoryRepository = async (
  query: {
    min_rating?: number;
    max_rating?: number;
    min_rating_count?: number;
    max_rating_count?: number;
    min_actual_price?: number;
    max_actual_price?: number;
    min_discounted_price?: number;
    max_discounted_price?: number;
  },
  t?: Transaction,
) => {
  const productWhere: any = {};

  if (query.min_rating !== undefined || query.max_rating !== undefined) {
    productWhere.rating = {};
    if (query.min_rating !== undefined) {
      productWhere.rating[Op.gte] = query.min_rating;
    }
    if (query.max_rating !== undefined) {
      productWhere.rating[Op.lte] = query.max_rating;
    }
  }

  if (
    query.min_rating_count !== undefined ||
    query.max_rating_count !== undefined
  ) {
    productWhere.rating_count = {};
    if (query.min_rating_count !== undefined) {
      productWhere.rating_count[Op.gte] = query.min_rating_count;
    }
    if (query.max_rating_count !== undefined) {
      productWhere.rating_count[Op.lte] = query.max_rating_count;
    }
  }

  if (
    query.min_actual_price !== undefined ||
    query.max_actual_price !== undefined
  ) {
    productWhere.actual_price = {};
    if (query.min_actual_price !== undefined) {
      productWhere.actual_price[Op.gte] = query.min_actual_price;
    }
    if (query.max_actual_price !== undefined) {
      productWhere.actual_price[Op.lte] = query.max_actual_price;
    }
  }

  if (
    query.min_discounted_price !== undefined ||
    query.max_discounted_price !== undefined
  ) {
    productWhere.discounted_price = {};
    if (query.min_discounted_price !== undefined) {
      productWhere.discounted_price[Op.gte] = query.min_discounted_price;
    }
    if (query.max_discounted_price !== undefined) {
      productWhere.discounted_price[Op.lte] = query.max_discounted_price;
    }
  }

  const data = await ProductCategory.findAll({
    attributes: [
      [fn("COUNT", col("product.product_id")), "count"],
      [col("categories.category_id"), "category_id"],
      [col("categories.name"), "name"],
    ],
    include: [
      {
        model: Category,
        as: "categories",
        attributes: [],
      },
      {
        model: Product,
        as: "product",
        attributes: [],
        where: Object.keys(productWhere).length ? productWhere : undefined,
        required: false,
      },
    ],
    group: ["categories.category_id", "categories.name"],
    transaction: t,
    raw: true,
  });
  return data;
};

export const getAverageRatingPerCategoryRepository = async (
  query: {
    min_rating?: number;
    max_rating?: number;
    min_rating_count?: number;
    max_rating_count?: number;
    min_actual_price?: number;
    max_actual_price?: number;
    min_discounted_price?: number;
    max_discounted_price?: number;
  },
  t?: Transaction,
) => {
  const productWhere: any = {};

  if (query.min_rating !== undefined || query.max_rating !== undefined) {
    productWhere.rating = {};
    if (query.min_rating !== undefined) {
      productWhere.rating[Op.gte] = query.min_rating;
    }
    if (query.max_rating !== undefined) {
      productWhere.rating[Op.lte] = query.max_rating;
    }
  }

  if (
    query.min_rating_count !== undefined ||
    query.max_rating_count !== undefined
  ) {
    productWhere.rating_count = {};
    if (query.min_rating_count !== undefined) {
      productWhere.rating_count[Op.gte] = query.min_rating_count;
    }
    if (query.max_rating_count !== undefined) {
      productWhere.rating_count[Op.lte] = query.max_rating_count;
    }
  }

  if (
    query.min_actual_price !== undefined ||
    query.max_actual_price !== undefined
  ) {
    productWhere.actual_price = {};
    if (query.min_actual_price !== undefined) {
      productWhere.actual_price[Op.gte] = query.min_actual_price;
    }
    if (query.max_actual_price !== undefined) {
      productWhere.actual_price[Op.lte] = query.max_actual_price;
    }
  }

  if (
    query.min_discounted_price !== undefined ||
    query.max_discounted_price !== undefined
  ) {
    productWhere.discounted_price = {};
    if (query.min_discounted_price !== undefined) {
      productWhere.discounted_price[Op.gte] = query.min_discounted_price;
    }
    if (query.max_discounted_price !== undefined) {
      productWhere.discounted_price[Op.lte] = query.max_discounted_price;
    }
  }

  const data = await Category.findAll({
    attributes: [
      "category_id",
      "name",
      [
        cast(fn("COALESCE", fn("AVG", col("products.rating")), 0), "float"),
        "average_rating",
      ],
    ],
    include: [
      {
        model: Product,
        as: "products",
        attributes: [],
        through: { attributes: [] },
        where: Object.keys(productWhere).length ? productWhere : undefined,
        required: false,
      },
    ],
    group: ["Category.category_id", "Category.name"],
    transaction: t,
    raw: true,
  });
  return data;
};

export const getDiscountPercentageDistributionRepository = async (
  query: {
    min_rating?: number;
    max_rating?: number;
    min_rating_count?: number;
    max_rating_count?: number;
    min_actual_price?: number;
    max_actual_price?: number;
    min_discounted_price?: number;
    max_discounted_price?: number;
    category_ids?: string[];
  },
  t?: Transaction,
) => {
  // Build product filters dynamically for a derived filtered product set
  const productConditions: string[] = [];
  const params: any = {};

  if (query.min_rating !== undefined) {
    productConditions.push("p.rating >= :min_rating");
    params.min_rating = query.min_rating;
  }
  if (query.max_rating !== undefined) {
    productConditions.push("p.rating <= :max_rating");
    params.max_rating = query.max_rating;
  }
  if (query.min_rating_count !== undefined) {
    productConditions.push("p.rating_count >= :min_rating_count");
    params.min_rating_count = query.min_rating_count;
  }
  if (query.max_rating_count !== undefined) {
    productConditions.push("p.rating_count <= :max_rating_count");
    params.max_rating_count = query.max_rating_count;
  }
  if (query.min_actual_price !== undefined) {
    productConditions.push("p.actual_price >= :min_actual_price");
    params.min_actual_price = query.min_actual_price;
  }
  if (query.max_actual_price !== undefined) {
    productConditions.push("p.actual_price <= :max_actual_price");
    params.max_actual_price = query.max_actual_price;
  }
  if (query.min_discounted_price !== undefined) {
    productConditions.push("p.discounted_price >= :min_discounted_price");
    params.min_discounted_price = query.min_discounted_price;
  }
  if (query.max_discounted_price !== undefined) {
    productConditions.push("p.discounted_price <= :max_discounted_price");
    params.max_discounted_price = query.max_discounted_price;
  }

  let categoryJoinClause = "";
  if (query.category_ids?.length) {
    categoryJoinClause = `INNER JOIN product_categories pc ON p.product_id = pc.product_id
                          INNER JOIN categories c ON pc.category_id = c.category_id`;
    productConditions.push("c.category_id IN (:category_ids)");
    params.category_ids = query.category_ids;
  }

  const productWhereClause = productConditions.length
    ? `WHERE ${productConditions.join(" AND ")}`
    : "";

  const data = await sequelize.query(
    `
    WITH distribution AS (
        SELECT
            ROW_NUMBER() OVER (ORDER BY discount_range) AS index,
            discount_range - 10 AS low,
            discount_range AS high
        FROM generate_series(10, 100, 10) AS discount_range
    )
    SELECT
        CAST(distribution.index AS INTEGER) AS index,
        distribution.low,
        distribution.high,
        CAST(COALESCE(COUNT(filtered_products.product_id), 0) AS INTEGER) AS count
    FROM distribution
    LEFT JOIN (
        SELECT DISTINCT p.product_id, p.discount_percentage
        FROM products p
        ${categoryJoinClause}
        ${productWhereClause}
    ) AS filtered_products
      ON filtered_products.discount_percentage * 100 >= distribution.low
     AND filtered_products.discount_percentage * 100 < distribution.high
    GROUP BY distribution.index, distribution.low, distribution.high
    ORDER BY distribution.index;
    `,
    {
      replacements: params,
      type: QueryTypes.SELECT,
      transaction: t,
    },
  );
  return data;
};

export const getTopReviewedProductsRepository = async (t?: Transaction) => {
  const data = await Product.findAll({
    attributes: ["rating_count", "product_id", "product_name"],
    order: [["rating_count", "DESC"]],
    limit: 10,
    transaction: t,
  });
  return data;
};
