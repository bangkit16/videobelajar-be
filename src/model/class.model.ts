import { DataTypes } from "sequelize";
import { sequelize } from "../lib/sequelize";

export const Class = sequelize.define(
  "Class",
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    categoryId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    title: { type: DataTypes.STRING(200), allowNull: false },
    slug: { type: DataTypes.STRING(200), allowNull: false, unique: true },
    description: { type: DataTypes.TEXT, allowNull: true },
    price: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    originalPrice: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    discount: { type: DataTypes.DECIMAL(5, 2), allowNull: false },
    promoEndsIn: { type: DataTypes.DATE, allowNull: true },
    bgImage: { type: DataTypes.STRING(255), allowNull: false },
    duration: { type: DataTypes.INTEGER, allowNull: false },
    language: { type: DataTypes.STRING(30), allowNull: false },
    totalVideos: { type: DataTypes.INTEGER, allowNull: false },
    totalDocuments: { type: DataTypes.INTEGER, allowNull: false },
    hasPretest: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    hasFinalExam: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    hasCertificate: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  },
  { tableName: "Class", timestamps: true },
);
