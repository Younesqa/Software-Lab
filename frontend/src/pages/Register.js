import { useState } from "react";
import { API } from "../services/api";
import "../index.css";

function Register({ onRegister, onSwitchToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const register = async () => {
    if (!name || !email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      await API.post("/auth/register", {
        name,
        email,
        password
      });

      setSuccess("Registered successfully! Redirecting to login...");
      
      // انتقل لصفحة تسجيل الدخول بعد ثانيتين
      setTimeout(() => {
        if (onSwitchToLogin) onSwitchToLogin();
      }, 2000);

    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Email might already exist.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      register();
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>Register</h2>
      </div>

      <div className="card-body">
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {success && (
          <div className="success-message">
            {success}
          </div>
        )}

        <div className="form-group">
          <label>Full Name</label>
          <div className="input-wrapper">
            <span className="input-icon">👤</span>
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
          </div>
        </div>

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
              placeholder="Enter your password (min 6 characters)"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
          </div>
        </div>

        <button 
          type="submit" 
          onClick={register}
          disabled={isLoading}
          className={isLoading ? "loading-btn" : ""}
        >
          {isLoading ? "Creating Account..." : "Register"}
        </button>

        <div className="auth-footer">
          <p>Already have an account?</p>
          <button 
            className="secondary" 
            onClick={onSwitchToLogin}
            disabled={isLoading}
          >
            Login Here
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;