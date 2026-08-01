import type { Request, Response } from "express";

export class UploadController {
  public static async upload(req: Request, res: Response) {
    if (!req.file) {
      res.status(400).json({ error: "Tidak ada file yang diunggah" });
      return;
    }

    const fileLink = `${req.protocol}://${req.get("host")}/files/${req.file.filename}`;

    res.status(200).json({
      message: "File berhasil diunggah",
      link: fileLink,
    });
  }
}
