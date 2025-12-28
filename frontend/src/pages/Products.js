import { useEffect, useState } from "react";
import { API } from "../services/api";
import { useCart } from "../context/CartContext";
import "../index.css";

export default function Products({ onOpenCart, onOpenProfile }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("name-asc");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { addToCart, cartItems } = useCart();
  const cartCount = cartItems.reduce((sum, item) => sum + (item.qty || 0), 0);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await API.get("/products");
        const data = res.data || [];
        setProducts(data);
        setFilteredProducts(data);

        const uniqueCategories = [...new Set(data.map((p) => p.category))];
        setCategories(["All", ...uniqueCategories]);
      } catch (e) {
        console.log("FETCH PRODUCTS ERROR:", e);
        alert("فشل تحميل المنتجات");
      }
    };
    fetch();
  }, []);

  useEffect(() => {
    let filtered = [...products];

    if (selectedCategory !== "All") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    filtered.sort((a, b) => {
      switch (sortOption) {
        case "price-low":
          return Number(a.price) - Number(b.price);
        case "price-high":
          return Number(b.price) - Number(a.price);
        case "name-asc":
          return (a.name || "").localeCompare(b.name || "");
        case "name-desc":
          return (b.name || "").localeCompare(a.name || "");
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  }, [products, selectedCategory, sortOption]);

  const buildImgSrc = (img) => {
    if (!img) return "";
    if (img.startsWith("http")) return img;
    return `${API.defaults.baseURL}${img.startsWith("/") ? "" : "/"}${img}`;
  };

  return (
    <div>
      <nav className="navbar">
        <h1>E-Commerce Store</h1>

        <div style={{ display: "flex", gap: 10 }}>
          <button className="cart-btn" onClick={onOpenProfile}>
            👤 Profile
          </button>
          <button className="cart-btn" onClick={onOpenCart}>
            🛒 My Cart ({cartCount})
          </button>
        </div>
      </nav>

      <div className="filters">
        <div>
          <label htmlFor="category-filter">Filter by Category: </label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="sort-option">Sort by: </label>
          <select
            id="sort-option"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="price-low">Price (Low to High)</option>
            <option value="price-high">Price (High to Low)</option>
          </select>
        </div>
      </div>

      <div className="products-container">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p) => {
            const imgSrc = buildImgSrc(p.image);
            const key = p.id ?? p.product_id ?? p._id ?? `${p.name}-${p.price}`;

            return (
              <div
                key={key}
                className="product-card"
                onClick={() => setSelectedProduct(p)}
                style={{ cursor: "pointer" }}
              >
                <div className="product-image">
                  {p.image ? (
                    <img
                      src={imgSrc}
                      alt={p.name}
                      className="product-img"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        if (e.currentTarget.nextSibling) {
                          e.currentTarget.nextSibling.style.display = "flex";
                        }
                      }}
                    />
                  ) : null}

                  <span
                    className={
                      p.image
                        ? "product-placeholder-hidden"
                        : "product-placeholder-visible"
                    }
                  >
                    Image Placeholder
                  </span>
                </div>

                <div className="product-info">
                  <h3 className="product-name">{p.name}</h3>
                  <p className="product-price">${p.price}</p>
                  <span className="product-category">{p.category}</span>

                  <button
                    className="add-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(p);
                    }}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="empty-state">
            <h3>No products found</h3>
            <p>Try adjusting your filters or sorting options.</p>
          </div>
        )}
      </div>

      {selectedProduct && (() => {
        const sp = selectedProduct;
        const bigImgSrc = buildImgSrc(sp.image);

        return (
          <div
            className="modal-overlay"
            onClick={() => setSelectedProduct(null)}
          >
            <div
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-grid">
                <div className="modal-image">
                  <button
                    className="modal-close-img"
                    onClick={() => setSelectedProduct(null)}
                    aria-label="Close"
                  >
                    ✕
                  </button>

                  {sp.image ? (
                    <img src={bigImgSrc} alt={sp.name} className="modal-img" />
                  ) : (
                    <div className="modal-placeholder">No Image</div>
                  )}
                </div>

                <div className="modal-details">
                  <h2>{sp.name}</h2>
                  <p className="modal-price">${sp.price}</p>
                  <p className="modal-category">Category: {sp.category}</p>

                  <p className="modal-desc">
                    {sp.description || "No description available."}
                  </p>

                  <div className="modal-actions">
                    <button className="add-btn" onClick={() => addToCart(sp)}>
                      ADD TO CART
                    </button>
                    <button
                      className="cart-btn"
                      onClick={() => setSelectedProduct(null)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
