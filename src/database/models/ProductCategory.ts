import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../sequelize";

interface ProductCategoryAttributes {
  product_category_id: string;
  product_id: string;
  category_id: string;
  created_at?: Date;
  updated_at?: Date;
}

interface ProductCategoryCreationAttributes extends Optional<
  ProductCategoryAttributes,
  "product_category_id" | "created_at" | "updated_at"
> {}

class ProductCategory
  extends Model<ProductCategoryAttributes, ProductCategoryCreationAttributes>
  implements ProductCategoryAttributes
{
  public product_category_id!: string;
  public product_id!: string;
  public category_id!: string;
  public created_at!: Date;
  public updated_at!: Date;
}

ProductCategory.init(
  {
    product_category_id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: sequelize.literal("gen_random_uuid()"),
      primaryKey: true,
    },
    product_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "categories",
        key: "category_id",
      },
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal(
        "(CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Kolkata'::text)",
      ),
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal(
        "(CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Kolkata'::text)",
      ),
    },
  },
  {
    sequelize,
    tableName: "product_categories",
    modelName: "ProductCategory",
    timestamps: false,
  },
);

export default ProductCategory;
