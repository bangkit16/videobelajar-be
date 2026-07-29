import mysql, { type Connection } from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = Number(process.env.DB_PORT) || 3306;
const DB_USER = process.env.DB_USER || "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "";
const DB_NAME = process.env.DB_NAME || "db_videobelajar";

async function migration() {
  let conn: Connection | null = null;

  try {
    conn = await mysql.createConnection({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
    });

    await conn.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``);
    await conn.query(`USE \`${DB_NAME}\``);

    console.log(`Connected to MySQL, using database "${DB_NAME}"`);

    // ---- 1. User ----
    await conn.query(`
      CREATE TABLE IF NOT EXISTS User (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        countryCode VARCHAR(10) NOT NULL,
        fullname VARCHAR(150) NOT NULL,
        username VARCHAR(100) NOT NULL,
        email VARCHAR(150) NOT NULL,
        password VARCHAR(255) NOT NULL,
        phoneNumber VARCHAR(20) NOT NULL,
        profileImage VARCHAR(255) NULL,
        UNIQUE INDEX idx_user_username (username),
        UNIQUE INDEX idx_user_email (email)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('  ✅ Table "User" created');

    // ---- 2. ClassCategory ----
    await conn.query(`
      CREATE TABLE IF NOT EXISTS ClassCategory (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        categorySlug VARCHAR(100) NOT NULL,
        categoryName VARCHAR(100) NOT NULL,
        UNIQUE INDEX idx_category_slug (categorySlug)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('  ✅ Table "ClassCategory" created');

    // ---- 3. Class ----
    await conn.query(`
      CREATE TABLE IF NOT EXISTS Class (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        categoryId BIGINT UNSIGNED NOT NULL,
        title VARCHAR(200) NOT NULL,
        slug VARCHAR(200) NOT NULL,
        description TEXT NULL,
        price DECIMAL(12,2) NOT NULL,
        originalPrice DECIMAL(12,2) NOT NULL,
        discount DECIMAL(5,2) NOT NULL,
        promoEndsIn DATETIME NULL,
        bgImage VARCHAR(255) NOT NULL,
        duration INT NOT NULL,
        language VARCHAR(30) NOT NULL,
        totalVideos INT NOT NULL,
        totalDocuments INT NOT NULL,
        hasPretest BOOLEAN NOT NULL DEFAULT false,
        hasFinalExam BOOLEAN NOT NULL DEFAULT false,
        hasCertificate BOOLEAN NOT NULL DEFAULT false,
        UNIQUE INDEX idx_class_slug (slug),
        INDEX idx_class_categoryId (categoryId),
        CONSTRAINT fk_class_category FOREIGN KEY (categoryId)
          REFERENCES ClassCategory(id) ON DELETE CASCADE ON UPDATE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('  ✅ Table "Class" created');

    // ---- 4. Tutor ----
    await conn.query(`
      CREATE TABLE IF NOT EXISTS Tutor (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        userId BIGINT UNSIGNED NOT NULL,
        classId BIGINT UNSIGNED NOT NULL,
        avatar VARCHAR(255) NOT NULL,
        company VARCHAR(150) NOT NULL,
        role VARCHAR(100) NOT NULL,
        INDEX idx_tutor_userId (userId),
        INDEX idx_tutor_classId (classId),
        CONSTRAINT fk_tutor_user FOREIGN KEY (userId)
          REFERENCES User(id) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT fk_tutor_class FOREIGN KEY (classId)
          REFERENCES Class(id) ON DELETE CASCADE ON UPDATE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('  ✅ Table "Tutor" created');

    // ---- 5. ClassModules ----
    await conn.query(`
      CREATE TABLE IF NOT EXISTS ClassModules (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        classId BIGINT UNSIGNED NOT NULL,
        sortOrder INT NOT NULL,
        title VARCHAR(200) NOT NULL,
        duration INT NOT NULL,
        INDEX idx_classmodules_classId (classId),
        CONSTRAINT fk_classmodules_class FOREIGN KEY (classId)
          REFERENCES Class(id) ON DELETE CASCADE ON UPDATE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('  ✅ Table "ClassModules" created');

    // ---- 6. Material ----
    await conn.query(`
      CREATE TABLE IF NOT EXISTS Material (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        moduleId BIGINT UNSIGNED NOT NULL,
        sortOrder INT NOT NULL,
        title VARCHAR(200) NOT NULL,
        type ENUM('video','document','quiz') NOT NULL,
        duration INT NOT NULL,
        linkMaterial VARCHAR(255) NULL,
        linkFile VARCHAR(255) NULL,
        passingScore INT NULL,
        INDEX idx_material_moduleId (moduleId),
        CONSTRAINT fk_material_module FOREIGN KEY (moduleId)
          REFERENCES ClassModules(id) ON DELETE CASCADE ON UPDATE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('  ✅ Table "Material" created');

    // ---- 7. PreTest ----
    await conn.query(`
      CREATE TABLE IF NOT EXISTS PreTest (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        materialId BIGINT UNSIGNED NOT NULL,
        sortOrder INT NOT NULL,
        question TEXT NOT NULL,
        optionA VARCHAR(255) NOT NULL,
        optionB VARCHAR(255) NOT NULL,
        optionC VARCHAR(255) NOT NULL,
        optionD VARCHAR(255) NOT NULL,
        correctAnswer ENUM('A','B','C','D') NOT NULL,
        INDEX idx_pretest_materialId (materialId),
        CONSTRAINT fk_pretest_material FOREIGN KEY (materialId)
          REFERENCES Material(id) ON DELETE CASCADE ON UPDATE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('  ✅ Table "PreTest" created');

    // ---- 8. Order ----
    await conn.query(`
      CREATE TABLE IF NOT EXISTS \`Order\` (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        classId BIGINT UNSIGNED NOT NULL,
        userId BIGINT UNSIGNED NOT NULL,
        noInvoice VARCHAR(100) NOT NULL,
        adminFee DECIMAL(12,2) NOT NULL,
        totalPayment DECIMAL(12,2) NOT NULL,
        status ENUM('pending','success','failed','expired') NOT NULL DEFAULT 'pending',
        UNIQUE INDEX idx_order_noInvoice (noInvoice),
        INDEX idx_order_userId (userId),
        INDEX idx_order_classId (classId),
        CONSTRAINT fk_order_user FOREIGN KEY (userId)
          REFERENCES User(id) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT fk_order_class FOREIGN KEY (classId)
          REFERENCES Class(id) ON DELETE CASCADE ON UPDATE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('  ✅ Table "Order" created');

    // ---- 9. Payment ----
    await conn.query(`
      CREATE TABLE IF NOT EXISTS Payment (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        orderId BIGINT UNSIGNED NOT NULL,
        paymentMethod ENUM('transfer','credit_card','ewallet','cod') NOT NULL,
        totalPayment DECIMAL(12,2) NOT NULL,
        paymentDate DATETIME NOT NULL,
        INDEX idx_payment_orderId (orderId),
        CONSTRAINT fk_payment_order FOREIGN KEY (orderId)
          REFERENCES \`Order\`(id) ON DELETE CASCADE ON UPDATE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('  ✅ Table "Payment" created');

    // ---- 10. MyClass ----
    await conn.query(`
      CREATE TABLE IF NOT EXISTS MyClass (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        classId BIGINT UNSIGNED NOT NULL,
        userId BIGINT UNSIGNED NOT NULL,
        status ENUM('active','completed','cancelled') NOT NULL DEFAULT 'active',
        completedModule INT NOT NULL DEFAULT 0,
        INDEX idx_myclass_userId (userId),
        INDEX idx_myclass_classId (classId),
        INDEX idx_myclass_user_class (userId, classId),
        CONSTRAINT fk_myclass_user FOREIGN KEY (userId)
          REFERENCES User(id) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT fk_myclass_class FOREIGN KEY (classId)
          REFERENCES Class(id) ON DELETE CASCADE ON UPDATE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('  ✅ Table "MyClass" created');

    // ---- 11. Review ----
    await conn.query(`
      CREATE TABLE IF NOT EXISTS Review (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        classId BIGINT UNSIGNED NOT NULL,
        userId BIGINT UNSIGNED NOT NULL,
        rating TINYINT NOT NULL,
        text TEXT NULL,
        alumniOfBatch INT NULL,
        INDEX idx_review_userId (userId),
        INDEX idx_review_classId (classId),
        INDEX idx_review_user_class (userId, classId),
        CONSTRAINT fk_review_user FOREIGN KEY (userId)
          REFERENCES User(id) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT fk_review_class FOREIGN KEY (classId)
          REFERENCES Class(id) ON DELETE CASCADE ON UPDATE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('  ✅ Table "Review" created');

    console.log("\n✅ Migration completed successfully!");
  } catch (error) {
    console.error("\n❌ Migration failed:", error);
    process.exit(1);
  } finally {
    if (conn) await conn.end();
  }
}

migration();
