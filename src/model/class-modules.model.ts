import { DataTypes } from "sequelize";
import { sequelize } from "../lib/sequelize";

export const ClassModules = sequelize.define(
  "ClassModules",
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    classId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    sortOrder: { type: DataTypes.INTEGER, allowNull: false },
    title: { type: DataTypes.STRING(200), allowNull: false },
    duration: { type: DataTypes.INTEGER, allowNull: false },
  },
  { tableName: "ClassModules", timestamps: true },
);
