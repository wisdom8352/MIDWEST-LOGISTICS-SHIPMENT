import { createAdmin, getAdminByEmail, getDb } from "./db";
import { hashPassword } from "./_core/adminAuth";

async function seedAdmin() {
  try {
    const db = await getDb();
    if (!db) {
      console.error("Database not available");
      process.exit(1);
    }

    const email = "admin@midwestlogistics.com";
    const password = "AdminLogistics2026!";

    // Check if admin already exists
    const existingAdmin = await getAdminByEmail(email);
    if (existingAdmin) {
      console.log("Admin already exists:", email);
      process.exit(0);
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create admin
    await createAdmin(email, passwordHash, "admin");

    console.log("✅ Default admin account created successfully!");
    console.log("📧 Email:", email);
    console.log("🔐 Password:", password);
    console.log("\n⚠️  Please change this password after first login!");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding admin:", error);
    process.exit(1);
  }
}

seedAdmin();
