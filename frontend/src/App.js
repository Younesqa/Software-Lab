import { useState } from "react";
import Login from "./pages/login";
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
    return showRegister ? (
      <>
        <Register onRegister={() => setShowRegister(false)} />
        <p>
          Already have an account?
          <button onClick={() => setShowRegister(false)}>Login</button>
        </p>
      </>
    ) : (
      <>
        <Login onLogin={() => setLogged(true)} />
        <p>
          Don’t have an account?
          <button onClick={() => setShowRegister(true)}>Register</button>
        </p>
      </>
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
