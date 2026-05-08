import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../sequelize";

interface CategoryAttributes {
  category_id: string;
  name: string;
  created_at?: Date;
  updated_at?: Date;
}

interface CategoryCreationAttributes extends Optional<
  CategoryAttributes,
  "category_id" | "created_at" | "updated_at"
> {}

class Category
  extends Model<CategoryAttributes, CategoryCreationAttributes>
  implements CategoryAttributes
{
  public category_id!: string;
  public name!: string;
  public created_at!: Date;
  public updated_at!: Date;
}

Category.init(
  {
    category_id: {
      type: DataTypes.UUID,
      defaultValue: sequelize.literal("gen_random_uuid()"),
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
    tableName: "categories",
    modelName: "Category",
    timestamps: false,
  },
);

export default Category;
