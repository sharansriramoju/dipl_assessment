import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../sequelize";

interface ReviewAttributes {
  review_id: string;
  user_name: string;
  product_id: string;
  review_title: string;
  review_content: string;
  created_at?: Date;
  updated_at?: Date;
}

interface ReviewCreationAttributes extends Optional<
  ReviewAttributes,
  "review_id" | "created_at" | "updated_at"
> {}

class Review
  extends Model<ReviewAttributes, ReviewCreationAttributes>
  implements ReviewAttributes
{
  public review_id!: string;
  public user_name!: string;
  public product_id!: string;
  public review_title!: string;
  public review_content!: string;
  public created_at!: Date;
  public updated_at!: Date;
}

Review.init(
  {
    review_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: sequelize.literal("gen_random_uuid()"),
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "products",
        key: "product_id",
      },
    },
    review_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    review_content: {
      type: DataTypes.TEXT,
      allowNull: false,
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
    tableName: "reviews",
    modelName: "Review",
    timestamps: false,
  },
);

export default Review;
