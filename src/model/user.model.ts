import { DataTypes } from "sequelize";
import { sequelize } from "../lib/sequelize";

export const User = sequelize.define(
  "User",
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    countryCode: { type: DataTypes.STRING(10), allowNull: false },
    fullname: { type: DataTypes.STRING(150), allowNull: false },
    username: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    email: { type: DataTypes.STRING(150), allowNull: false, unique: true },
    password: { type: DataTypes.STRING(255), allowNull: false },
    phoneNumber: { type: DataTypes.STRING(20), allowNull: false },
    profileImage: { type: DataTypes.STRING(255), allowNull: true },
  },
  { tableName: "User", timestamps: true },
);
