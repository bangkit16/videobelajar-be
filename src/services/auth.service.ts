import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import type { LoginSchemaType, PayloadJWT } from "../schema/auth.schema";
import { User } from "../model";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET_KEY!;

export class AuthService {
  public static async generateToken(payload: PayloadJWT) {
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
    return token;
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
