import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../sequelize";

interface ProductAttributes {
  product_id: string;
  product_name: string;
  description?: string;
  discounted_price: number;
  actual_price: number;
  discount_percentage: number;
  rating: number;
  rating_count: number;
  created_at?: Date;
  updated_at?: Date;
}

interface ProductCreationAttributes extends Optional<
  ProductAttributes,
  "created_at" | "updated_at"
> {}

class Product
  extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes
{
  public product_id!: string;
  public product_name!: string;
  public description?: string;
  public discounted_price!: number;
  public actual_price!: number;
  public discount_percentage!: number;
  public rating!: number;
  public rating_count!: number;
  public created_at!: Date;
  public updated_at!: Date;
}

Product.init(
  {
    product_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    discounted_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    actual_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    discount_percentage: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    rating: {
      type: DataTypes.DECIMAL(2, 1),
      allowNull: false,
    },
    rating_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    sequelize,
    tableName: "products",
    modelName: "Product",
    timestamps: false,
  },
);

export default Product;
