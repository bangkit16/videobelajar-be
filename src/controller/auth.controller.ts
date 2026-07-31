import type { Request, Response } from "express";
import {
  LoginSchema,
  RegisterSchema,
  type LoginSchemaType,
} from "../schema/auth.schema";
import { Validator } from "../utils/validator";
import { AuthService } from "../services/auth.service";

export class AuthController {
  public static async register(req: Request, res: Response) {
    try {
      const validated = Validator(RegisterSchema)(req, res);
      if (!validated) return;

      const body = validated.body;

      const result = await AuthService.register(body);

      if (result.status === "CONFLICT") {
        return res.status(409).json({
          success: false,
          message: `${result.field} sudah digunakan`,
        });
      }

      res.status(201).json({
        success: true,
        message: "Registrasi berhasil, Email Verifikasi berhasil dikirim",
        // user: result.user,
      });
    } catch (error) {
      console.error("Error register:", error);
      res.status(500).json({
        success: false,
        message: "Gagal membuat akun",
        error: error instanceof Error ? error.message : error,
      });
    }
  }

  public static async login(req: Request, res: Response) {
    try {
      const validated = Validator(LoginSchema)(req, res);
      if (!validated) return;

      const { email, password } = validated.body;

      const { status, session, token } = await AuthService.login({
        email,
        password,
      });

      switch (status) {
        case "NOT_FOUND":
          return res.status(404).json({
            success: false,
            message: "Email tidak ditemukan",
          });
        case "UNAUTHORIZED":
          return res.status(401).json({
            success: false,
            message: "Password salah",
          });
      }

      return res.status(200).json({
        success: true,
        message: "Login berhasil",
        session,
        token,
      });
    } catch (error) {
      console.error("Error login:", error);
      res.status(500).json({
        success: false,
        message: "Gagal membuat kelas",
        error: error instanceof Error ? error.message : error,
      });
    }
  }
}
