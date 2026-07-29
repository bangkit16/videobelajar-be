import { DataTypes } from "sequelize";
import { sequelize } from "../lib/sequelize";

export const Review = sequelize.define(
  "Review",
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    classId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    userId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    rating: { type: DataTypes.TINYINT, allowNull: false },
    text: { type: DataTypes.TEXT, allowNull: true },
    alumniOfBatch: { type: DataTypes.INTEGER, allowNull: true },
  },
  { tableName: "Review", timestamps: true },
);
