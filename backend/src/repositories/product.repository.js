const db = require("../config/database");

class ProductRepository {
  async getAll() {
    const [rows] = await db.execute(
      `SELECT p.*, c.name AS category
       FROM products p
       JOIN categories c ON p.category_id = c.id`
    );
    return rows;
  }

  async create(product) {
    await db.execute(
      "INSERT INTO products (name,price,description,category_id,image) VALUES (?,?,?,?,?)",
      [product.name, product.price, product.description, product.category_id, product.image]
    );
  }

  async update(id, product) {
    await db.execute(
      "UPDATE products SET name=?,price=?,description=?,category_id=?,image=? WHERE id=?",
      [product.name, product.price, product.description, product.category_id, product.image, id]
    );
  }

  async delete(id) {
    await db.execute(
      "DELETE FROM products WHERE id=?",
      [id]
    );
  }
}

module.exports = new ProductRepository();
