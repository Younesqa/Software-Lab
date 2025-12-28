// import { useState } from "react";
// import { API } from "../services/api";
// import "../index.css";
// export default function Admin() {
//   const [category, setCategory] = useState("");
//   const [product, setProduct] = useState({
//     name: "",
//     price: "",
//     description: "",
//     category_id: ""
//   });
// const addCategory = async () => {
//   console.log("ADD CATEGORY CLICKED");
//   console.log("baseURL:", API.defaults.baseURL);
//   console.log("token:", localStorage.getItem("token"));

//   try {
//     const res = await API.post("/categories", {
//       name: category,   // ✅ بدل categoryName
//     });
//     console.log("SUCCESS", res.data);
//     alert("Category added");
//     setCategory("");   // اختياري
//   } catch (err) {
//     console.log("AXIOS ERROR OBJECT:", err);
//     console.log("message:", err.message);
//     console.log("code:", err.code);
//     console.log("response:", err.response?.status, err.response?.data);
//   }
// };


//  const addProduct = async () => {
//   const token = localStorage.getItem("token");
//   console.log("token exists?", !!token, token?.slice(0, 20));
//   await API.post("/products", product);
//   alert("Product added");
// };


//   return (
//     <div>
//       <h2>Admin Dashboard</h2>

//       <h3>Add Category</h3>
//       <input onChange={e => setCategory(e.target.value)} />
//       <button onClick={addCategory}>Add</button>

//       <h3>Add Product</h3>
//       <input placeholder="Name" onChange={e => setProduct({ ...product, name: e.target.value })} />
//       <input placeholder="Price" onChange={e => setProduct({ ...product, price: e.target.value })} />
//       <input placeholder="Description" onChange={e => setProduct({ ...product, description: e.target.value })} />
//       <input placeholder="Category ID" onChange={e => setProduct({ ...product, category_id: e.target.value })} />
//       <button onClick={addProduct}>Add Product</button>
//     </div>
//   );
// }



// import { useState } from "react";
// import { API } from "../services/api";
// import "../index.css";

// export default function Admin({ onLogout }) {
//   const [category, setCategory] = useState("");
//   const [product, setProduct] = useState({
//     name: "",
//     price: "",
//     description: "",
//     category_id: ""
//   });

//   const addCategory = async () => {
//     if (!category.trim()) {
//       alert("الرجاء إدخال اسم الفئة");
//       return;
//     }

//     console.log("ADD CATEGORY CLICKED");
//     console.log("baseURL:", API.defaults.baseURL);
//     console.log("token:", localStorage.getItem("token"));

//     try {
//       const res = await API.post("/categories", {
//         name: category,
//       });
//       console.log("SUCCESS", res.data);
//       alert("تمت إضافة الفئة بنجاح");
//       setCategory("");
//     } catch (err) {
//       console.log("AXIOS ERROR OBJECT:", err);
//       console.log("message:", err.message);
//       console.log("code:", err.code);
//       console.log("response:", err.response?.status, err.response?.data);
//       alert(err.response?.data?.message || "حدث خطأ أثناء إضافة الفئة");
//     }
//   };

//   const addProduct = async () => {
//     if (!product.name || !product.price || !product.category_id) {
//       alert("الرجاء ملء جميع الحقول المطلوبة");
//       return;
//     }

//     const token = localStorage.getItem("token");
//     console.log("token exists?", !!token, token?.slice(0, 20));

//     try {
//       await API.post("/products", product);
//       alert("تمت إضافة المنتج بنجاح");
//       setProduct({
//         name: "",
//         price: "",
//         description: "",
//         category_id: ""
//       });
//     } catch (err) {
//       console.log("ERROR:", err);
//       alert(err.response?.data?.message || "حدث خطأ أثناء إضافة المنتج");
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     onLogout();
//   };

//   return (
//     <div className="admin-container">
//       <div className="admin-header">
//         <h2>Admin Dashboard</h2>
        
//       </div>

//       <div className="admin-section">
//         <h3>Add Category</h3>
//         <input
//           type="text"
//           className="admin-input"
//           value={category}
//           onChange={e => setCategory(e.target.value)}
//           onKeyPress={e => e.key === 'Enter' && addCategory()}
//         />
//         <button className="gradient-btn" onClick={addCategory}>
//           ADD
//         </button>
//       </div>

//       <div className="admin-section">
//         <h3>Add Product</h3>
//         <input
//           type="text"
//           placeholder="Name"
//           className="admin-input"
//           value={product.name}
//           onChange={e => setProduct({ ...product, name: e.target.value })}
//         />
//         <input
//           type="number"
//           placeholder="Price"
//           className="admin-input"
//           value={product.price}
//           onChange={e => setProduct({ ...product, price: e.target.value })}
//         />
//         <input
//           type="text"
//           placeholder="Description"
//           className="admin-input"
//           value={product.description}
//           onChange={e => setProduct({ ...product, description: e.target.value })}
//         />
//         <input
//           type="text"
//           placeholder="Category ID"
//           className="admin-input"
//           value={product.category_id}
//           onChange={e => setProduct({ ...product, category_id: e.target.value })}
//         />
//         <button className="gradient-btn" onClick={addProduct}>
//           ADD PRODUCT
//         </button>
//       </div>
//     </div>
//   );
// }


// import { useState } from "react";
// import { API } from "../services/api";
// import "../index.css";

// export default function Admin({ onLogout }) {
//   const [category, setCategory] = useState("");
//   const [product, setProduct] = useState({
//     name: "",
//     price: "",
//     description: "",
//     category_id: "",
//     image: ""
//   });
//   const [imagePreview, setImagePreview] = useState(null);

//   const addCategory = async () => {
//     if (!category.trim()) {
//       alert("الرجاء إدخال اسم الفئة");
//       return;
//     }

//     console.log("ADD CATEGORY CLICKED");
//     console.log("baseURL:", API.defaults.baseURL);
//     console.log("token:", localStorage.getItem("token"));

//     try {
//       const res = await API.post("/categories", {
//         name: category,
//       });
//       console.log("SUCCESS", res.data);
//       alert("تمت إضافة الفئة بنجاح");
//       setCategory("");
//     } catch (err) {
//       console.log("AXIOS ERROR OBJECT:", err);
//       console.log("message:", err.message);
//       console.log("code:", err.code);
//       console.log("response:", err.response?.status, err.response?.data);
//       alert(err.response?.data?.message || "حدث خطأ أثناء إضافة الفئة");
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       // Validate file type
//       if (!file.type.startsWith('image/')) {
//         alert("الرجاء اختيار صورة صالحة");
//         return;
//       }

//       // Validate file size (max 5MB)
//       if (file.size > 5 * 1024 * 1024) {
//         alert("حجم الصورة يجب أن يكون أقل من 5 ميجابايت");
//         return;
//       }

//       // Create preview
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//         setProduct({ ...product, image: reader.result });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const removeImage = () => {
//     setImagePreview(null);
//     setProduct({ ...product, image: "" });
//   };

//   const addProduct = async () => {
//     if (!product.name || !product.price || !product.category_id) {
//       alert("الرجاء ملء جميع الحقول المطلوبة");
//       return;
//     }

//     const token = localStorage.getItem("token");
//     console.log("token exists?", !!token, token?.slice(0, 20));

//     try {
//       await API.post("/products", product);
//       alert("تمت إضافة المنتج بنجاح");
//       setProduct({
//         name: "",
//         price: "",
//         description: "",
//         category_id: "",
//         image: ""
//       });
//       setImagePreview(null);
//     } catch (err) {
//       console.log("ERROR:", err);
//       alert(err.response?.data?.message || "حدث خطأ أثناء إضافة المنتج");
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     onLogout();
//   };

//   return (
//     <div className="admin-container">
//       <div className="admin-header">
//         <h2>Admin Dashboard</h2>
        
//       </div>

//       <div className="admin-section">
//         <h3>Add Category</h3>
//         <input
//           type="text"
//           className="admin-input"
//           placeholder="اسم الفئة"
//           value={category}
//           onChange={e => setCategory(e.target.value)}
//           onKeyPress={e => e.key === 'Enter' && addCategory()}
//         />
//         <button className="gradient-btn" onClick={addCategory}>
//           ADD CATEGORY
//         </button>
//       </div>

//       <div className="admin-section">
//         <h3>Add Product</h3>
//         <input
//           type="text"
//           placeholder="Product Name"
//           className="admin-input"
//           value={product.name}
//           onChange={e => setProduct({ ...product, name: e.target.value })}
//         />
//         <input
//           type="number"
//           placeholder="Price"
//           className="admin-input"
//           value={product.price}
//           onChange={e => setProduct({ ...product, price: e.target.value })}
//         />
//         <input
//           type="text"
//           placeholder="Description"
//           className="admin-input"
//           value={product.description}
//           onChange={e => setProduct({ ...product, description: e.target.value })}
//         />
//         <input
//           type="text"
//           placeholder="Category ID"
//           className="admin-input"
//           value={product.category_id}
//           onChange={e => setProduct({ ...product, category_id: e.target.value })}
//         />
        
//         {/* Image Upload Section */}
//         <div className="image-upload-section">
//           <label className="image-upload-label">Product Image</label>
          
//           {!imagePreview ? (
//             <div className="image-upload-area">
//               <input
//                 type="file"
//                 id="product-image"
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 className="image-input"
//               />
//               <label htmlFor="product-image" className="image-upload-btn">
//                 <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                   <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
//                   <circle cx="8.5" cy="8.5" r="1.5"/>
//                   <polyline points="21 15 16 10 5 21"/>
//                 </svg>
//                 <span>Click to upload image</span>
//                 <span className="image-upload-hint">PNG, JPG, GIF up to 5MB</span>
//               </label>
//             </div>
//           ) : (
//             <div className="image-preview-container">
//               <img src={imagePreview} alt="Preview" className="image-preview" />
//               <button type="button" onClick={removeImage} className="remove-image-btn">
//                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                   <line x1="18" y1="6" x2="6" y2="18"/>
//                   <line x1="6" y1="6" x2="18" y2="18"/>
//                 </svg>
//                 Remove Image
//               </button>
//             </div>
//           )}
//         </div>

//         <button className="gradient-btn" onClick={addProduct}>
//           ADD PRODUCT
//         </button>
//       </div>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { API } from "../services/api";
import "../index.css";

export default function Admin({ onLogout }) {
  const [category, setCategory] = useState("");
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    category_id: "",
    image: ""
  });

  const [imagePreview, setImagePreview] = useState(null);

  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // ===== Image URL normalizer (FIX) =====
  const normalizeImageUrl = (img) => {
    if (!img) return null;
    // لو كانت base64
    if (img.startsWith("data:image")) return img;

    // لو كانت /uploads/....
    if (img.startsWith("/uploads")) return `${API.defaults.baseURL}${img}`;

    // لو كانت http(s) كاملة
    if (img.startsWith("http://") || img.startsWith("https://")) return img;

    // أي قيمة ثانية (احتياط)
    return img;
  };

  // ========= Helpers =========
  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data || []);
    } catch (err) {
      console.log("FETCH PRODUCTS ERROR:", err);
      alert("فشل تحميل المنتجات");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const resetForm = () => {
    setProduct({
      name: "",
      price: "",
      description: "",
      category_id: "",
      image: ""
    });
    setImagePreview(null);
    setEditingId(null);
  };

  // ========= Category =========
  const addCategory = async () => {
    if (!category.trim()) {
      alert("الرجاء إدخال اسم الفئة");
      return;
    }

    try {
      await API.post("/categories", { name: category });
      alert("تمت إضافة الفئة بنجاح");
      setCategory("");
    } catch (err) {
      console.log("ADD CATEGORY ERROR:", err);
      alert(err.response?.data?.message || "حدث خطأ أثناء إضافة الفئة");
    }
  };

  // ========= Image =========
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("الرجاء اختيار صورة صالحة");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("حجم الصورة يجب أن يكون أقل من 5 ميجابايت");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setProduct((prev) => ({ ...prev, image: reader.result })); // base64
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    setProduct((prev) => ({ ...prev, image: "" }));
  };

  // ========= Products (Add / Update) =========
  const addProduct = async () => {
    if (!product.name || !product.price || !product.category_id) {
      alert("الرجاء ملء جميع الحقول المطلوبة");
      return;
    }

    try {
      await API.post("/products", product);
      alert("تمت إضافة المنتج بنجاح");
      resetForm();
      fetchProducts();
    } catch (err) {
      console.log("ADD PRODUCT ERROR:", err);
      alert(err.response?.data?.message || "حدث خطأ أثناء إضافة المنتج");
    }
  };

  const startEdit = (p) => {
    setEditingId(p.id);

    setProduct({
      name: p.name || "",
      price: p.price ?? "",
      description: p.description || "",
      category_id: p.category_id ?? "",
      image: p.image || ""
    });

    // FIX: preview لازم يكون URL كامل لو كانت /uploads
    setImagePreview(normalizeImageUrl(p.image));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const updateProduct = async () => {
    if (!editingId) return;

    if (!product.name || !product.price || !product.category_id) {
      alert("الرجاء ملء جميع الحقول المطلوبة");
      return;
    }

    try {
      await API.put(`/products/${editingId}`, product);
      alert("تم تعديل المنتج بنجاح");
      resetForm();
      fetchProducts();
    } catch (err) {
      console.log("UPDATE PRODUCT ERROR:", err);
      alert(err.response?.data?.message || "حدث خطأ أثناء تعديل المنتج");
    }
  };

  // ========= Logout =========
  const logout = () => {
    localStorage.removeItem("token");
    onLogout?.();
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>Admin Dashboard</h2>
      </div>

      <div className="admin-section">
        <h3>Add Category</h3>
        <input
          type="text"
          className="admin-input"
          placeholder="اسم الفئة"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addCategory()}
        />
        <button className="gradient-btn" onClick={addCategory}>
          ADD CATEGORY
        </button>
      </div>

      <div className="admin-section">
        <h3>{editingId ? "Edit Product" : "Add Product"}</h3>

        <input
          type="text"
          placeholder="Product Name"
          className="admin-input"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
        />

        <input
          type="number"
          placeholder="Price"
          className="admin-input"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
        />

        <input
          type="text"
          placeholder="Description"
          className="admin-input"
          value={product.description}
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Category ID"
          className="admin-input"
          value={product.category_id}
          onChange={(e) =>
            setProduct({ ...product, category_id: e.target.value })
          }
        />

        {/* Image Upload Section */}
        <div className="image-upload-section">
          <label className="image-upload-label">Product Image</label>

          {!imagePreview ? (
            <div className="image-upload-area">
              <input
                type="file"
                id="product-image"
                accept="image/*"
                onChange={handleImageChange}
                className="image-input"
              />
              <label htmlFor="product-image" className="image-upload-btn">
                <span>Click to upload image</span>
                <span className="image-upload-hint">PNG, JPG, GIF up to 5MB</span>
              </label>
            </div>
          ) : (
            <div className="image-preview-container">
              <img src={imagePreview} alt="Preview" className="image-preview" />
              <button
                type="button"
                onClick={removeImage}
                className="remove-image-btn"
              >
                Remove Image
              </button>
            </div>
          )}
        </div>

        {!editingId ? (
          <button className="gradient-btn" onClick={addProduct}>
            ADD PRODUCT
          </button>
        ) : (
          <div style={{ display: "flex", gap: 10 }}>
            <button className="gradient-btn" onClick={updateProduct}>
              SAVE CHANGES
            </button>
            <button className="gradient-btn" onClick={resetForm}>
              CANCEL
            </button>
          </div>
        )}
      </div>

      {/* ========= Products List ========= */}
      <div className="admin-section">
        <h3>Products</h3>

        {products.length === 0 ? (
          <p style={{ opacity: 0.8 }}>لا يوجد منتجات</p>
        ) : (
          <div className="admin-products-grid">
            {products.map((p) => {
              const imgSrc = normalizeImageUrl(p.image);

              return (
                <div key={p.id} className="admin-product-card">
                  <div className="admin-product-thumb">
                    {imgSrc ? (
                      <img src={imgSrc} alt={p.name} />
                    ) : (
                      <div className="no-image">No Image</div>
                    )}
                  </div>

                  <div className="admin-product-info">
                    <div className="admin-product-title">{p.name}</div>
                    <div className="admin-product-meta">
                      <span>Price: {p.price}</span>
                      <span>Category: {p.category_id}</span>
                    </div>
                    {p.description ? (
                      <div className="admin-product-desc">{p.description}</div>
                    ) : null}
                  </div>

                  <div className="admin-product-actions">
                    <button
                      className="gradient-btn"
                      onClick={() => startEdit(p)}
                    >
                      EDIT
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

