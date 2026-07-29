import { DataTypes } from "sequelize";
import { sequelize } from "../lib/sequelize";

export const PreTest = sequelize.define(
  "PreTest",
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    materialId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    sortOrder: { type: DataTypes.INTEGER, allowNull: false },
    question: { type: DataTypes.TEXT, allowNull: false },
    optionA: { type: DataTypes.STRING(255), allowNull: false },
    optionB: { type: DataTypes.STRING(255), allowNull: false },
    optionC: { type: DataTypes.STRING(255), allowNull: false },
    optionD: { type: DataTypes.STRING(255), allowNull: false },
    correctAnswer: { type: DataTypes.ENUM("A", "B", "C", "D"), allowNull: false },
  },
  { tableName: "PreTest", timestamps: true },
);
