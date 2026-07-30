import dotenv from "dotenv";
import express, { type Request, type Response } from "express";
import cors from "cors";
import courseRoutes from "./routes/class.routes";
import { sequelize } from "./lib/sequelize";
import "./model";

dotenv.config();

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
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    res.json({
      pesan: "Selamat datang di API Video Belajar",
      status: "Koneksi database sukses!",
    });
  } catch (error) {
    console.error("Unable to connect to the database: ", error);
    res.status(500).json({
      pesan: "Koneksi database gagal",
      error: error instanceof Error ? error.message : error,
    });
  }
});

app.use("/api/course", courseRoutes);

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
