import { DataTypes } from "sequelize";
import { sequelize } from "../lib/sequelize";

export const Order = sequelize.define(
  "Order",
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    classId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    userId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    noInvoice: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    adminFee: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    totalPayment: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    status: {
      type: DataTypes.ENUM("pending", "success", "failed", "expired"),
      allowNull: false,
      defaultValue: "pending",
    },
  },
  { tableName: "Order", timestamps: true },
);
