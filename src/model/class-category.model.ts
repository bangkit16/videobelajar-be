import { DataTypes } from "sequelize";
import { sequelize } from "../lib/sequelize";

export const ClassCategory = sequelize.define(
  "ClassCategory",
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    categorySlug: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    categoryName: { type: DataTypes.STRING(100), allowNull: false },
  },
  { tableName: "ClassCategory", timestamps: true },
);
