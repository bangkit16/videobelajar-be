import express, { type Request, type Response } from "express";
import cors from "cors";
import { pool } from "./database/database";
import courseRoutes from "./routes/course.routes";

const app = express();
const PORT = process.env.PORT || 3005;

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
  }),
);
app.use(express.json());

// Buat pool koneksi (createConnection per-request boros & gampang habis)

// Route Contoh
app.get("/", async (_req: Request, res: Response) => {
  try {
    const [rows] = await pool.execute("SELECT NOW() as waktu_sekarang");

    res.json({
      pesan: "Selamat datang di API Video Belajar",
      status: "Koneksi database sukses!",
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
