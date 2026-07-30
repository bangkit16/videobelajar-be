import { z } from "zod";

const messages = {
  required: (field: string) => `${field} harus diisi`,
  min: (field: string, n: number) => `${field} minimal ${n} karakter`,
  max: (field: string, n: number) => `${field} maksimal ${n} karakter`,
  positive: (field: string) => `${field} harus lebih dari 0`,
  int: (field: string) => `${field} harus berupa angka bulat`,
  number: (field: string) => `${field} harus berupa angka`,
  boolean: (field: string) => `${field} harus berupa boolean`,
  datetime: (field: string) => `Format ${field} tidak valid (ISO 8601)`,
};

// --- Shared ---
export const classParams = z.object({
  params: z.object({
    id: z.coerce.number().int("ID harus berupa angka bulat").positive("ID harus lebih dari 0"),
  }),
});

// --- Create ---
export const createClassSchema = z.object({
  body: z.object({
    categoryId: z.number().int(messages.int("Kategori")).positive(messages.positive("Kategori")),
    title: z.string().min(1, messages.required("Judul")).max(200, messages.max("Judul", 200)),
    slug: z.string().min(1).max(200).optional(),
    description: z.string().optional(),
    price: z.number().positive(messages.positive("Harga")),
    originalPrice: z.number().positive(messages.positive("Harga asli")),
    discount: z.number().min(0, "Diskon minimal 0%").max(100, "Diskon maksimal 100%"),
    promoEndsIn: z.string().datetime(messages.datetime("Promo berakhir")).optional(),
    bgImage: z.string().min(1, messages.required("Gambar latar")).max(255, messages.max("Gambar latar", 255)),
    duration: z.number().int(messages.int("Durasi")).positive(messages.positive("Durasi")),
    language: z.string().min(1, messages.required("Bahasa")).max(30, messages.max("Bahasa", 30)),
    totalVideos: z.number().int(messages.int("Jumlah video")).min(0, "Jumlah video minimal 0"),
    totalDocuments: z.number().int(messages.int("Jumlah dokumen")).min(0, "Jumlah dokumen minimal 0"),
    hasPretest: z.boolean().optional(),
    hasFinalExam: z.boolean().optional(),
    hasCertificate: z.boolean().optional(),
    tutors: z.array(
      z.string().min(1, messages.required("ID Tutor")),
    ),
    modules: z.array(
      z.object({
        title: z.string().min(1, messages.required("Judul modul")).max(200, messages.max("Judul modul", 200)),
        sortOrder: z.number().int(messages.int("Urutan")).min(0, "Urutan minimal 0"),
        duration: z.number().int(messages.int("Durasi")).min(0, "Durasi minimal 0"),
        materials: z.array(
          z.object({
            title: z.string().min(1, messages.required("Judul modul")).max(200, messages.max("Judul modul", 200)),
            sortOrder: z.number().int(messages.int("Urutan")).min(0, "Urutan minimal 0"),
            type : z.enum(["video", "document", "quiz"]),
            duration: z.number().int(messages.int("Durasi")).min(0, "Durasi minimal 0"),
            linkMaterial: z.string().min(1, messages.required("Link modul")).max(255, messages.max("Link modul", 255)).optional(),
            linkFile: z.string().min(1, messages.required("Link file")).max(255, messages.max("Link file", 255)).optional(),
            passingScore: z.number().min(0, "Nilai minimal 0").max(100, "Nilai maksimal 100").optional(),
          })
        )
      }),
    )
  }),
});

// --- Update ---
export const updateClassSchema = z.object({
  body: z.object({
    categoryId: z.number().int(messages.int("Kategori")).positive(messages.positive("Kategori")).optional(),
    title: z.string().min(1, messages.required("Judul")).max(200, messages.max("Judul", 200)).optional(),
    slug: z.string().min(1).max(200).optional(),
    description: z.string().optional(),
    price: z.number().positive(messages.positive("Harga")).optional(),
    originalPrice: z.number().positive(messages.positive("Harga asli")).optional(),
    discount: z.number().min(0, "Diskon minimal 0%").max(100, "Diskon maksimal 100%").optional(),
    promoEndsIn: z.string().datetime(messages.datetime("Promo berakhir")).optional(),
    bgImage: z.string().min(1, messages.required("Gambar latar")).max(255, messages.max("Gambar latar", 255)).optional(),
    duration: z.number().int(messages.int("Durasi")).positive(messages.positive("Durasi")).optional(),
    language: z.string().min(1, messages.required("Bahasa")).max(30, messages.max("Bahasa", 30)).optional(),
    totalVideos: z.number().int(messages.int("Jumlah video")).min(0, "Jumlah video minimal 0").optional(),
    totalDocuments: z.number().int(messages.int("Jumlah dokumen")).min(0, "Jumlah dokumen minimal 0").optional(),
    hasPretest: z.boolean().optional(),
    hasFinalExam: z.boolean().optional(),
    hasCertificate: z.boolean().optional(),
  }),
  params: z.object({
    id: z.coerce.number().int("ID harus berupa angka bulat").positive("ID harus lebih dari 0"),
  }),
});
