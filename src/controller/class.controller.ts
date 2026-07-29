import type { Request, Response } from "express";
import { ClassService } from "../services/class.services";

export class ClassController {
  public static async index(req: Request, res: Response) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;

      const result = await ClassService.getAllClass(page, limit);

      res.json({
        success: true,
        message: "Daftar kelas berhasil didapatkan",
        ...result,
      });
    } catch (error) {
      console.error("Error get all class:", error);
      res.status(500).json({
        success: false,
        message: "Gagal mendapatkan daftar kelas",
        error: error instanceof Error ? error.message : error,
      });
    }
  }
}
