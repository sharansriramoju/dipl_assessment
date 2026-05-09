import { cast, col, fn, Op, Transaction } from "sequelize";
import { Category, Product, ProductCategory } from "../models";

export const getNoOfProductsPerCategoryRepository = async (
  category_ids?: string[],
  t?: Transaction,
) => {
  const data = await ProductCategory.count({
    include: [
      {
        model: Category,
        as: "categories",
        attributes: ["category_id", "name"],
      },
    ],
    distinct: true,
    group: ["categories.category_id", "categories.name"],
    transaction: t,
    where: category_ids
      ? { category_id: { [Op.in]: category_ids } }
      : undefined,
  });
  return data;
};

export const getAverageRatingPerCategoryRepository = async (
  category_ids?: string[],
  t?: Transaction,
) => {
  const data = await Product.findAll({
    include: [
      {
        model: Category,
        as: "categories",
        attributes: ["category_id", "name"],
        where: category_ids
          ? { category_id: { [Op.in]: category_ids } }
          : undefined,
        through: { attributes: [] },
      },
    ],
    attributes: [
      [cast(fn("AVG", col("rating")), "float"), "average_rating"],
      "categories.category_id",
      "categories.name",
    ],
    group: ["categories.category_id", "categories.name"],
    transaction: t,
    raw: true,
  });
  return data;
};
