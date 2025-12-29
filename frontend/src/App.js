import { useState } from "react";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Products from "./pages/Products";
import Register from "./pages/Register";
import MyCart from "./pages/MyCart";
import "./index.css";
import Logout from "./components/Logout";
import UserProfile from "./pages/UserProfile";

function App() {
  const [logged, setLogged] = useState(!!localStorage.getItem("token"));
  const [showRegister, setShowRegister] = useState(false);

  // NEW: عرض المستخدم (products / cart)
  const [userView, setUserView] = useState("products");

  if (!logged) {
    return (
      <div className="auth-page">
        {showRegister ? (
          <Register 
            onRegister={() => setShowRegister(false)} 
            onSwitchToLogin={() => setShowRegister(false)}
          />
        ) : (
          <Login 
            onLogin={() => setLogged(true)}
            onSwitchToRegister={() => setShowRegister(true)}
          />
        )}
      </div>
    );
  }

  const token = localStorage.getItem("token");
  const payload = JSON.parse(atob(token.split(".")[1]));

  return (
    <div>
      <Logout onLogout={() => setLogged(false)} />

      {payload.role === "admin" ? (
        <Admin />
      ) : userView === "cart" ? (
        <MyCart onBack={() => setUserView("products")} />
      ) : userView === "profile" ? (
        <UserProfile user={payload} onBack={() => setUserView("products")} />
      ) : (
        <Products
          onOpenCart={() => setUserView("cart")}
          onOpenProfile={() => setUserView("profile")}
        />
      )}
    </div>
  );
}

export default App;