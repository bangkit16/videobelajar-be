import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import type {
  LoginSchemaType,
  PayloadJWT,
  RegisterSchemaType,
} from "../schema/auth.schema";
import { Op, Sequelize } from "sequelize";
import { User } from "../model";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET_KEY!;

export class AuthService {
  public static async generateToken(payload: PayloadJWT) {
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
    return token;
  }

  public static async register(payload: RegisterSchemaType) {
    const {
      countryCode,
      fullname,
      username,
      email,
      password,
      phoneNumber,
      profileImage,
    } = payload;

    const existing = await User.findOne({
      where: {
        [Op.or]: [{ email }, { username }],
      },
    });

    if (existing) {
      const field =
        existing.getDataValue("email") === email ? "email" : "username";
      return { status: "CONFLICT", field };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      countryCode,
      fullname,
      username,
      email,
      password: hashedPassword,
      phoneNumber,
      profileImage,
    });

    const { password: _password, ...userData } = user.get({ plain: true });
    return { status: "SUCCESS", user: userData };
  }

  public static async login({ email, password }: LoginSchemaType) {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return { status: "NOT_FOUND", session: null, token: null };
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.getDataValue("password"),
    );

    if (!isPasswordValid) {
      return { status: "UNAUTHORIZED", session: null, token: null };
    }

    if (!user.getDataValue("isVerified")) {
      return { status: "UNVERIFIED", session: null, token: null };
    }

    const session: PayloadJWT = {
      id: user.getDataValue("id"),
      countryCode: user.getDataValue("countryCode"),
      fullname: user.getDataValue("fullname"),
      username: user.getDataValue("username"),
      email: user.getDataValue("email"),
      phoneNumber: user.getDataValue("phoneNumber"),
      profileImage: user.getDataValue("profileImage"),
    };

    const token = await this.generateToken(session);
    
    return { status: "SUCCESS", session, token };
  }
}
