import { Op, Transaction } from "sequelize";
import { Category, ProductCategory } from "../models";

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
