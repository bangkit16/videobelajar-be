import { DataTypes } from "sequelize";
import { sequelize } from "../lib/sequelize";

export const Payment = sequelize.define(
  "Payment",
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    orderId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    paymentMethod: {
      type: DataTypes.ENUM("transfer", "credit_card", "ewallet", "cod"),
      allowNull: false,
    },
    totalPayment: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    paymentDate: { type: DataTypes.DATE, allowNull: false },
  },
  { tableName: "Payment", timestamps: true },
);
