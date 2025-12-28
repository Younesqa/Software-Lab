import { useMemo, useState } from "react";
import { useCart } from "../context/CartContext";
import { API } from "../services/api";
import "../index.css";

export default function MyCart({ onBack }) {
  const { cartItems, removeFromCart, clearCart } = useCart();

  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod"); // cod | visa

  // بيانات عامة
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [notes, setNotes] = useState("");

  // بيانات Visa (واجهة فقط)
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [exp, setExp] = useState("");
  const [cvv, setCvv] = useState("");

  const total = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + Number(item.price) * item.qty, 0);
  }, [cartItems]);

  const cartCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.qty, 0);
  }, [cartItems]);

  const submitOrder = () => {
    // تحقق بسيط
    if (cartItems.length === 0) return alert("السلة فارغة.");

    if (!fullName.trim() || !phone.trim() || !city.trim() || !street.trim()) {
      return alert("رجاءً عبّي الاسم + الهاتف + المدينة + العنوان.");
    }

    if (paymentMethod === "visa") {
      if (!cardName.trim() || cardNumber.replace(/\s/g, "").length < 12 || !exp.trim() || cvv.trim().length < 3) {
        return alert("رجاءً عبّي معلومات الفيزا بشكل صحيح (للواجهة فقط).");
      }
    }

    // هنا لاحقًا تربطه بالـ backend (POST /orders)
    // الآن: مجرد تأكيد
    const order = {
      items: cartItems,
      total,
      paymentMethod,
      shipping: { fullName, phone, city, street, notes },
      // لا ترسل بيانات بطاقة حقيقية بدون بوابة دفع
    };

    console.log("ORDER (frontend demo):", order);

    alert("تم إنشاء الطلب بنجاح ✅ (تجريبي)");
    clearCart();
    setShowCheckout(false);

    // تصفير الحقول
    setFullName(""); setPhone(""); setCity(""); setStreet(""); setNotes("");
    setCardName(""); setCardNumber(""); setExp(""); setCvv("");
    setPaymentMethod("cod");
  };

  return (
    <div>
      <nav className="navbar">
        <h1>My Cart ({cartCount})</h1>

        <div style={{ display: "flex", gap: 10 }}>
          <button className="cart-btn" onClick={onBack}>
            ⬅ Back to Products
          </button>
        </div>
      </nav>

      <div className="products-container">
        {cartItems.length === 0 ? (
          <div className="empty-state">
            <h3>Cart is empty</h3>
            <p>ارجع للمنتجات وأضف عناصر.</p>
          </div>
        ) : (
          cartItems.map((item) => {
            const imgSrc = item.image
              ? item.image.startsWith("http")
                ? item.image
                : `${API.defaults.baseURL}${item.image.startsWith("/") ? "" : "/"}${item.image}`
              : "";

            const key = item.id ?? item.product_id ?? item._id ?? item.name;

            return (
              <div key={key} className="product-card">
                <div className="product-image">
                  {item.image ? (
                    <img
                      src={imgSrc}
                      alt={item.name}
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
                      item.image ? "product-placeholder-hidden" : "product-placeholder-visible"
                    }
                  >
                    Image Placeholder
                  </span>
                </div>

                <div className="product-info">
                  <h3 className="product-name">{item.name}</h3>
                  <p className="product-price">${item.price}</p>
                  <span className="product-category">Qty: {item.qty}</span>

                  <button
                    className="add-btn"
                    onClick={() => removeFromCart(item.id ?? item.product_id ?? item._id)}
                  >
                    REMOVE
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {cartItems.length > 0 && (
        <div style={{ padding: 20, maxWidth: 900, margin: "0 auto" }}>
          <h3 style={{ marginBottom: 10 }}>Total: ${total.toFixed(2)}</h3>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button className="add-btn" onClick={() => setShowCheckout((v) => !v)}>
              {showCheckout ? "إغلاق الدفع" : "ادفع الآن"}
            </button>

            <button className="add-btn" onClick={clearCart}>
              CLEAR CART
            </button>
          </div>

          {showCheckout && (
            <div
              style={{
                marginTop: 16,
                padding: 16,
                border: "1px solid #eee",
                borderRadius: 12,
                background: "#fff",
              }}
            >
              <h2 style={{ marginBottom: 12 }}>Checkout</h2>

              {/* اختيار طريقة الدفع */}
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 14 }}>
                <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <input
                    type="radio"
                    name="pay"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                  />
                  الدفع عند الاستلام
                </label>

                <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <input
                    type="radio"
                    name="pay"
                    checked={paymentMethod === "visa"}
                    onChange={() => setPaymentMethod("visa")}
                  />
                  Visa Card
                </label>
              </div>

              {/* معلومات الشحن */}
              <h4 style={{ margin: "12px 0 8px" }}>معلومات الشحن</h4>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <input
                  placeholder="الاسم الكامل"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                <input
                  placeholder="رقم الهاتف"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <input
                  placeholder="المدينة"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <input
                  placeholder="العنوان (الشارع/المنطقة)"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
              </div>

              <textarea
                placeholder="ملاحظات إضافية (اختياري)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                style={{ width: "100%", marginTop: 10, minHeight: 80 }}
              />

              {/* حقول الفيزا */}
              {paymentMethod === "visa" && (
                <>
                  <h4 style={{ margin: "12px 0 8px" }}>Visa Details (Demo)</h4>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    <input
                      placeholder="Name on Card"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                    />
                    <input
                      placeholder="Card Number"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                    />
                    <input
                      placeholder="MM/YY"
                      value={exp}
                      onChange={(e) => setExp(e.target.value)}
                    />
                    <input
                      placeholder="CVV"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                    />
                  </div>
                  <p style={{ fontSize: 12, marginTop: 8, opacity: 0.7 }}>
                    ملاحظة: لا تستخدم بيانات حقيقية. هذا نموذج واجهة فقط.
                  </p>
                </>
              )}

              <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
                <button className="add-btn" onClick={submitOrder}>
                  تأكيد الطلب
                </button>
                <button className="cart-btn" onClick={() => setShowCheckout(false)}>
                  إلغاء
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
