import { DataTypes } from "sequelize";
import { sequelize } from "../lib/sequelize";

export const Tutor = sequelize.define(
  "Tutor",
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    classId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    avatar: { type: DataTypes.STRING(255), allowNull: false },
    company: { type: DataTypes.STRING(150), allowNull: false },
    role: { type: DataTypes.STRING(100), allowNull: false },
  },
  { tableName: "Tutor", timestamps: true },
);
