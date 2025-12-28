const db = require("../config/database");

class UserRepository {
  async create(user) {
    const [result] = await db.execute(
      "INSERT INTO users (name,email,password,role) VALUES (?,?,?,?)",
      [user.name, user.email, user.password, user.role]
    );
    return result;
  }

  async findByEmail(email) {
    const [rows] = await db.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    return rows[0];
  }

  // ✅ method داخل class
  async findById(id) {
    const [rows] = await db.execute(
      "SELECT id, name, email, role FROM users WHERE id = ?",
      [id]
    );
    return rows[0];
  }
}

module.exports = new UserRepository();
