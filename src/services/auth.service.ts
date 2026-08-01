import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import type {
  LoginSchemaType,
  PayloadJWT,
  RegisterSchemaType,
} from "../schema/auth.schema";
import { Op, Sequelize } from "sequelize";
import { User } from "../model";
import { transporter } from "../config/mail";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET_KEY!;

export class AuthService {
  private static async generateToken(payload: PayloadJWT) {
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
    return token;
  }

  private static async sendEmail({
    email,
    token,
  }: {
    email: string;
    token: string;
  }) {
    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verifikasi Email Anda</title>
        <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f6f9; margin: 0; padding: 0; color: #333333; }
            .container { max-width: 500px; margin: 40px auto; background: #ffffff; padding: 32px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
            .logo { font-size: 22px; font-weight: bold; color: #2563eb; text-align: center; margin-bottom: 24px; }
            .title { font-size: 20px; font-weight: 600; text-align: center; color: #1e293b; margin-bottom: 16px; }
            .message { font-size: 15px; line-height: 1.6; color: #475569; text-align: center; margin-bottom: 28px; }
            .btn-wrapper { text-align: center; margin-bottom: 28px; }
            .btn { display: inline-block; padding: 12px 32px; font-size: 15px; font-weight: 600; color: #ffffff !important; background-color: #2563eb; text-decoration: none; border-radius: 8px; transition: background-color 0.2s; }
            .footer { font-size: 12px; color: #94a3b8; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 16px; }
            .link-fallback { font-size: 12px; color: #64748b; text-align: center; word-break: break-all; margin-top: 16px; }
        </style>
        </head>
        <body>
        <div class="container">
            <div class="logo">🎥 Video Belajar</div>
            <div class="title">Verifikasi Akun Anda</div>
            <p class="message">Terima kasih telah mendaftar. Silakan klik tombol di bawah ini untuk memverifikasi alamat email Anda dan mengaktifkan akun.</p>
            <div class="btn-wrapper">
            <a href="http://localhost:3005/api/auth/verify-email/${token}" class="btn" target="_blank">Verifikasi Email Sekarang</a>
            </div>
            <div class="footer">
            &copy; ${new Date().getFullYear()} Video Belajar. Semua hak dilindungi.
            </div>
            <p class="link-fallback">Jika tombol tidak bekerja, salin tautan berikut ke browser Anda:<br>http://localhost:3005/api/auth/verify-email/${token}</p>
        </div>
        </body>
        </html>
    `;

    const mailOptions = {
      from: '"Video Belajar" <bangkitcaniago@gmail.com>',
      to: email,
      subject: "Verifikasi Email Anda",
      text: "Ini adalah pesan teks biasa.",
      html: htmlContent,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Email berhasil dikirim! ID Pesan:", info.messageId);
      return info;
    } catch (error) {
      console.error("Gagal mengirim email ke server SMTP:", error);
      throw error;
    }
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

    const token = uuid();

    const user = await User.create({
      countryCode,
      fullname,
      username,
      email,
      password: hashedPassword,
      phoneNumber,
      profileImage,
      verificationToken: token,
    });

    if (user) {
      this.sendEmail({ email, token });
    }

    const {
      password: _password,
      verificationToken: _token,
      ...userData
    } = user.get({ plain: true });
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

  public static async verifyEmail(token: string) {
    const user = await User.findOne({ where: { verificationToken: token } });

    if (!user) {
      return { status: "NOT_FOUND" };
    }

    await user.update({ isVerified: true, verificationToken: null });

    return { status: "SUCCESS" };
  }
}
