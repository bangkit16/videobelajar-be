import { DataTypes } from "sequelize";
import { sequelize } from "../lib/sequelize";

export const ClassTutor = sequelize.define(
  "ClassTutor",
  {
    classId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    tutorId: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
  },
  { tableName: "ClassTutor", timestamps: false },
);
