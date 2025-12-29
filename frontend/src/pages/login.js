import { useState } from "react";
import { API } from "../services/api";
import "../index.css";

function Login({ onLogin, onSwitchToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const login = async () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const res = await API.post("/auth/login", {
        email,
        password
      });
      
      // حفظ التوكن
      localStorage.setItem("token", res.data.token);

      // إبلاغ التطبيق أن المستخدم دخل
      if (onLogin) onLogin();

    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      login();
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>Login</h2>
      </div>

      <div className="card-body">
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="form-group">
          <label>Email Address</label>
          <div className="input-wrapper">
            <span className="input-icon">📧</span>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Password</label>
          <div className="input-wrapper">
            <span className="input-icon">🔒</span>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
          </div>
        </div>

        <button 
          type="submit" 
          onClick={login}
          disabled={isLoading}
          className={isLoading ? "loading-btn" : ""}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>

        <div className="auth-footer">
          <p>Don't have an account?</p>
          <button 
            className="secondary" 
            onClick={onSwitchToRegister}
            disabled={isLoading}
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;