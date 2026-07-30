# Video Belajar API

Backend API platform belajar online. Dibangun dengan **Express.js**, **Sequelize ORM**, **MySQL**, **TypeScript**, **Zod validation**.

## Fitur

- **Manajemen Kelas** — CRUD kelas dengan filter, search, sorting, pagination
- **Kategori Kelas** — Pengelompokan kelas per kategori
- **Tutor & Relasi** — Many-to-many kelas ↔ tutor
- **Modul & Materi** — Nested CRUD modul dan materi (video/document/quiz) dalam kelas
- **Review & Rating** — Review kelas dengan rating, aggregasi count & average
- **Order & Pembayaran** — Manajemen pesanan dan pembayaran
- **My Class** — Kelas terdaftar per user
- **Pre-test** — Soal pre-test per materi

## Tech Stack

| Lapisan       | Teknologi                                  |
| ------------- | ------------------------------------------ |
| Runtime       | Node.js, TypeScript                        |
| Framework     | Express.js v5                              |
| ORM           | Sequelize v6                               |
| Database      | MySQL 8.0                                  |
| Validasi      | Zod                                        |
| Build         | esbuild                                    |
| Dev Runner    | tsx (watch mode)                           |

## Prasyarat

- Node.js >= 18
- npm
- Docker (opsional, untuk MySQL)

## Instalasi

```bash
# 1. Clone repo
git clone <repo-url>
cd videobelajar-be

# 2. Install dependencies
npm install

# 3. Copy env dan sesuaikan
cp .env.example .env
```

### 4. Setup Database

**Opsi A — via Docker Compose (langsung):**

```bash
docker compose up -d
```

Ini menjalankan MySQL 8.0 (port 3306) + phpMyAdmin (port 8080).

**Opsi B — MySQL lokal / remote:**  
Sesuaikan `.env` dengan koneksi database yang sudah ada.

### 5. Migration & Seed

```bash
# Jalankan migration
npm run migration

# (Opsional) Seed data awal
npm run seed
```

### 6. Jalankan Server

```bash
npm run dev
```

Server berjalan di `http://localhost:3005`.

## Scripts

| Script         | Perintah                          |
| -------------- | --------------------------------- |
| `npm run dev`  | Dev server dengan hot-reload      |
| `npm run build`| Build production (esbuild)         |
| `npm start`    | Jalankan production build         |
| `npm run migration` | Jalankan migrasi database    |
| `npm run seed` | Seed data awal                    |

## Struktur Proyek

```
src/
├── index.ts                # Entry point — setup Express, CORS, routes
├── lib/
│   └── sequelize.ts        # Koneksi Sequelize ke MySQL
├── model/
│   ├── index.ts            # Registrasi model & asosiasi
│   ├── user.model.ts
│   ├── class.model.ts
│   ├── class-category.model.ts
│   ├── class-modules.model.ts
│   ├── class-tutor.model.ts
│   ├── material.model.ts
│   ├── tutor.model.ts
│   ├── review.model.ts
│   ├── order.model.ts
│   ├── payment.model.ts
│   ├── my-class.model.ts
│   └── pre-test.model.ts
├── schema/
│   └── class.schema.ts     # Validasi Zod untuk class
├── services/
│   └── class.services.ts   # Business logic class
├── controller/
│   └── class.controller.ts # HTTP handler class
├── routes/
│   └── class.routes.ts     # Routing class (/api/course)
├── utils/
│   ├── pagination.ts       # Helper pagination
│   └── validator.ts        # Wrapper validasi Zod
└── database/
    ├── migrate.ts          # Migration script
    ├── seed.ts             # Seed script
    └── seed-data.ts        # Data seeding
```

## API Endpoints

Semua endpoint di-prefix dengan `/api/course`.

### Kelas

| Method   | Endpoint         | Deskripsi                                    |
| -------- | ---------------- | -------------------------------------------- |
| `GET`    | `/api/course`    | Daftar kelas (dengan filter, search, sort)   |
| `GET`    | `/api/course/:id`| Detail kelas (termasuk modul, materi, review) |
| `POST`   | `/api/course`    | Buat kelas baru (dengan tutor & modul nested)|
| `PUT`    | `/api/course/:id`| Update kelas (termasuk modul & materi nested) |
| `DELETE` | `/api/course/:id`| Hapus kelas (cascade tutor, modul, materi)   |

**Query params untuk `GET /api/course`:**

| Param      | Tipe   | Contoh            | Keterangan            |
| ---------- | ------ | ----------------- | --------------------- |
| `page`     | number | `1`               | Halaman (default: 1)  |
| `limit`    | number | `10`              | Per halaman           |
| `search`   | string | `"react"`         | Cari berdasarkan judul|
| `kategori` | string | `"frontend"`      | Filter kategori (slug)|
| `sortBy`   | string | `"price"`         | Kolom sorting         |
| `sortOrder`| string | `"ASC"` / `"DESC"`| Arah sorting          |

## ERD / Model Relasi

```
User ──hasOne──> Tutor
User ──hasMany──> Order
User ──hasMany──> MyClass
User ──hasMany──> Review

ClassCategory ──hasMany──> Class

Class ──belongsToMany──> Tutor  (via ClassTutor)
Class ──hasMany──> ClassModules
Class ──hasMany──> Order
Class ──hasMany──> MyClass
Class ──hasMany──> Review

ClassModules ──hasMany──> Material
Material ──hasMany──> PreTest

Order ──hasOne──> Payment
```

## Environment Variables

| Variabel      | Default       | Keterangan         |
| ------------- | ------------- | ------------------ |
| `DB_HOST`     | `localhost`   | Host database      |
| `DB_PORT`     | `3306`        | Port database      |
| `DB_USER`     | `admin`       | User database      |
| `DB_PASSWORD` | `admin123`    | Password database  |
| `DB_NAME`     | `db_videobelajar` | Nama database  |
| `PORT`        | `3005`        | Port server (opsional) |

## Pengembangan

Proyek ini menggunakan **TypeScript** dengan strict mode dan **verbatimModuleSyntax**.  
Gunakan `npm run dev` untuk開発 dengan auto-reload via tsx.
