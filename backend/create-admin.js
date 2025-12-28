const bcrypt = require("bcryptjs");
const db = require("./src/config/database");

async function createAdmin() {
  try {
    const hashedPassword = await bcrypt.hash("admin123", 10);
    await db.execute(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      ["Admin User", "admin@example.com", hashedPassword, "admin"]
    );
    console.log("Admin user created successfully!");
    console.log("Email: admin@example.com");
    console.log("Password: admin123");
  } catch (err) {
    console.error("Error creating admin:", err);
  } finally {
    process.exit();
  }
}

createAdmin();
