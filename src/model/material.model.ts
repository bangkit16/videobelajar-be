import { DataTypes } from "sequelize";
import { sequelize } from "../lib/sequelize";

export const Material = sequelize.define(
  "Material",
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    moduleId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    sortOrder: { type: DataTypes.INTEGER, allowNull: false },
    title: { type: DataTypes.STRING(200), allowNull: false },
    type: { type: DataTypes.ENUM("video", "document", "quiz"), allowNull: false },
    duration: { type: DataTypes.INTEGER, allowNull: false },
    linkMaterial: { type: DataTypes.STRING(255), allowNull: true },
    linkFile: { type: DataTypes.STRING(255), allowNull: true },
    passingScore: { type: DataTypes.INTEGER, allowNull: true },
  },
  { tableName: "Material", timestamps: true },
);
