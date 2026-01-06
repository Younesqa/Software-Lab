const productRepo = require("../repositories/product.repository");
const fs = require("fs");
const path = require("path");

// تأكد أن مجلد uploads موجود
const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// حفظ صورة base64 كملف وإرجاع المسار
function saveBase64Image(dataUrl, filename) {
  if (!dataUrl || typeof dataUrl !== "string") return null;

  const match = dataUrl.match(/^data:(image\/\w+);base64,(.+)$/);
  if (!match) {
    throw new Error("Invalid image format. Expected base64 data URL.");
  }

  const base64Data = match[2];
  const filePath = path.join(uploadsDir, filename);
  fs.writeFileSync(filePath, Buffer.from(base64Data, "base64"));

  return `/uploads/${filename}`;
}

function getImageExt(dataUrl) {
  const extMatch =
    typeof dataUrl === "string" ? dataUrl.match(/^data:image\/(\w+);base64,/) : null;
  return extMatch ? extMatch[1] : "png";
}

/**
 * GET all products
 */
exports.getAllProducts = async (req, res) => {
  try {
    const products = await productRepo.getAll();
    res.json(products);
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);
    res.status(500).json({ message: "Error fetching products" });
  }
};
// .
/**
 * CREATE product
 */
exports.createProduct = async (req, res) => {
  try {
    const { name, price, description, category_id, image } = req.body;

    if (!name || price == null || !category_id) {
      return res.status(400).json({
        message: "name, price, and category_id are required",
      });
    }

    let imagePath = null;

    if (image) {
      if (typeof image === "string" && image.startsWith("/uploads/")) {
        imagePath = image;
      } else {
        const ext = getImageExt(image);
        const filename = `product_${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${ext}`;
        imagePath = saveBase64Image(image, filename);
      }
    }

    const product = await productRepo.create({
      name,
      price,
      description,
      category_id,
      image: imagePath,
    });

    return res.status(201).json(product);
  } catch (err) {
    console.error("CREATE PRODUCT ERROR:", err);
    return res.status(500).json({
      message: "Internal Server Error (create product)",
      error: err.message,
      code: err.code,
    });
  }
};

/**
 * UPDATE product
 */
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, description, category_id, image } = req.body;

  try {
    let imagePath = null;

    if (image) {
      if (typeof image === "string" && image.startsWith("/uploads/")) {
        imagePath = image;
      } else {
        const ext = getImageExt(image);
        const filename = `product_${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${ext}`;
        imagePath = saveBase64Image(image, filename);
      }
    }

    await productRepo.update(id, {
      name,
      price,
      description,
      category_id,
      image: imagePath,
    });

    res.json({ message: "Product updated" });
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);
    res.status(500).json({ message: "Error updating product" });
  }
};

/**
 * DELETE product
 */
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await productRepo.delete(id);
    res.json({ message: "Product deleted" });
  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);
    res.status(500).json({ message: "Error deleting product" });
  }
};
