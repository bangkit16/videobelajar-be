import express, { type Request, type Response } from "express";
import cors from "cors";
import mysql from "mysql2/promise"; // Menggunakan versi promise agar bisa async/await
import dotenv from "dotenv";
import { pool } from "./lib/database";

// Konfigurasi dotenv
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3005;

app.use(cors());
app.use(express.json());

// Buat pool koneksi (createConnection per-request boros & gampang habis)


// Route Contoh
app.get("/", async (_req: Request, res: Response) => {
  try {
    const [rows] = await pool.execute("SELECT NOW() as waktu_sekarang");

    res.json({
      pesan: "Koneksi sukses!",
      data: rows,
    });
  } catch (error) {
    res.status(500).json({
      pesan: "Koneksi database gagal",
      error: error instanceof Error ? error.message : error,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
