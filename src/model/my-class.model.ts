import { DataTypes } from "sequelize";
import { sequelize } from "../lib/sequelize";

export const MyClass = sequelize.define(
  "MyClass",
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    classId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    userId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    status: {
      type: DataTypes.ENUM("active", "completed", "cancelled"),
      allowNull: false,
      defaultValue: "active",
    },
    completedModule: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  },
  { tableName: "MyClass", timestamps: true },
);
