import { sequelize } from "../lib/sequelize";
import "../model"; // register models & associations

async function syncDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Connected to MySQL via Sequelize");

    // { alter: true } — sesuaikan kolom/index tanpa drop data
    // ganti jadi { force: true } kalo mau drop & create ulang
    await sequelize.sync({ alter: true });

    console.log("\n✅ All tables synced successfully!");
    process.exit(0);
  } catch (error) {
    console.error("\n❌ Sync failed:", error);
    process.exit(1);
  }
}

syncDatabase();
