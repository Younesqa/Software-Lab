const db = require("../config/database");

class CategoryRepository {
  async getAll() {
    const [rows] = await db.execute("SELECT * FROM categories");
    return rows;
  }

  async getById(id) {
    const [rows] = await db.execute(
      "SELECT * FROM categories WHERE id = ?",
      [id]
    );
    return rows[0];
  }

  async create(name) {
    const [res] = await db.execute(
      "INSERT INTO categories (name) VALUES (?)",
      [name]
    );
    return res;
  }

  async update(id, name) {
    await db.execute(
      "UPDATE categories SET name=? WHERE id=?",
      [name, id]
    );
  }

  async delete(id) {
    await db.execute(
      "DELETE FROM categories WHERE id=?",
      [id]
    );
  }
}

module.exports = new CategoryRepository();
