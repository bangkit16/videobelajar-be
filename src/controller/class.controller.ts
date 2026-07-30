import type { Request, Response } from "express";
import { ClassService } from "../services/class.services";
import { getPagination, wrapPagination } from "../utils/pagination";
import { Validator } from "../utils/validator";
import {
  createClassSchema,
  updateClassSchema,
  classParams,
} from "../schema/class.schema";

export class ClassController {
  public static async index(req: Request, res: Response) {
    try {
      const { sequelize, page, limit } = getPagination(req);

      const search = req.query.search as string;
      const kategori = req.query.kategori as string;
      const sortBy = req.query.sortBy as string;
      const sortOrder = (req.query.sortOrder as string) || "DESC";

      const filter = {
        sortBy,
        sortOrder,
        ...(kategori ? { kategori } : {}),
        ...(search ? { search } : {}),
      };

      const { rows, count } = await ClassService.getAllClass(
        sequelize.offset,
        sequelize.limit,
        filter,
      );

      if (!rows) {
        return res
          .status(404)
          .json({ success: false, message: "Kelas tidak ditemukan" });
      }

      res.json({
        success: true,
        message: "Daftar kelas berhasil didapatkan",
        data: rows,
        pagination: wrapPagination(count, page, limit),
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

  public static async detail(req: Request, res: Response) {
    try {
      const params = Validator(classParams)(req, res);
      if (!params) return;

      const data = await ClassService.findById(params.params.id);

      if (!data) {
        res.status(404).json({
          success: false,
          message: "Kelas tidak ditemukan",
        });
        return;
      }

      res.json({
        success: true,
        message: "Detail kelas berhasil didapatkan",
        data,
      });
    } catch (error) {
      console.error("Error get class detail:", error);
      res.status(500).json({
        success: false,
        message: "Gagal mendapatkan detail kelas",
        error: error instanceof Error ? error.message : error,
      });
    }
  }

  public static async create(req: Request, res: Response) {
    try {
      const validated = Validator(createClassSchema)(req, res);
      if (!validated) return;

      const body = validated.body;

      const data = await ClassService.create(body);

      res.status(201).json({
        success: true,
        message: "Kelas berhasil dibuat",
        data,
      });
    } catch (error) {
      console.error("Error create class:", error);
      res.status(500).json({
        success: false,
        message: "Gagal membuat kelas",
        error: error instanceof Error ? error.message : error,
      });
    }
  }

  public static async update(req: Request, res: Response) {
    try {
      const payload = Validator(updateClassSchema)(req, res);
      if (!payload) return;

      const data = await ClassService.update(payload.params.id, payload.body);
      if (!data) {
        res.status(404).json({
          success: false,
          message: "Kelas tidak ditemukan",
        });
        return;
      }

      res.json({
        success: true,
        message: "Kelas berhasil diupdate",
        data,
      });
    } catch (error) {
      console.error("Error update class:", error);
      res.status(500).json({
        success: false,
        message: "Gagal mengupdate kelas",
        error: error instanceof Error ? error.message : error,
      });
    }
  }

  public static async delete(req: Request, res: Response) {
    try {
      const params = Validator(classParams)(req, res);
      if (!params) return;

      const deleted = await ClassService.delete(params.params.id);
      if (!deleted) {
        res.status(404).json({
          success: false,
          message: "Kelas tidak ditemukan",
        });
        return;
      }

      res.json({
        success: true,
        message: "Kelas berhasil dihapus",
      });
    } catch (error) {
      console.error("Error delete class:", error);
      res.status(500).json({
        success: false,
        message: "Gagal menghapus kelas",
        error: error instanceof Error ? error.message : error,
      });
    }
  }
}
