import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET_KEY!;

export class AuthMiddleware {
  public static async verifyToken(req: any, res: any, next: any) {
    const authHeader = req.headers["authorization"];

    // Mengambil token dari header "Bearer <TOKEN>"
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Akses ditolak. Token tidak ditemukan.",
      });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      if (!decoded) {
        return res.status(403).json({
          success: false,
          message: "Token tidak valid atau kedaluwarsa.",
        });
      }
      next();
    } catch (error) {
      res.status(403).json({
        success: false,
        message: "Token tidak valid atau kedaluwarsa.",
      });
    }
  }
}
