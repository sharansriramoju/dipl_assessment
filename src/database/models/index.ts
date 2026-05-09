import User from "./User";
import Category from "./Category";
import Product from "./Product";
import Review from "./Review";
import ProductCategory from "./ProductCategory";
import sequelize from "../sequelize";
import JobQueue from "./JobQueue";

// Product-Category Many-to-Many Relationship
Product.belongsToMany(Category, {
  through: ProductCategory,
  as: "categories",
  foreignKey: "product_id",
  otherKey: "category_id",
  onDelete: "CASCADE",
});
Category.belongsToMany(Product, {
  through: ProductCategory,
  as: "products",
  foreignKey: "category_id",
  otherKey: "product_id",
  onDelete: "CASCADE",
});

// Product-Review One-to-Many Relationship
Product.hasMany(Review, {
  foreignKey: "product_id",
  as: "reviews",
  onDelete: "CASCADE",
});
Review.belongsTo(Product, {
  foreignKey: "product_id",
  as: "product",
  onDelete: "CASCADE",
});
export {
  User,
  Category,
  Product,
  Review,
  ProductCategory,
  JobQueue,
  sequelize,
};
