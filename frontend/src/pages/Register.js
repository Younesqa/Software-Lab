import { useState } from "react";
import { API } from "../services/api";
import "../index.css";
function Register({ onRegister }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const register = async () => {
    try {
      await API.post("/auth/register", {
        name,
        email,
        password
      });

      setMsg("Registered successfully. You can login now.");
      if (onRegister) onRegister();

    } catch (err) {
      setMsg("Registration failed");
    }
  };

  return (
    <div className="card">
      <h2>Register</h2>

      <input placeholder="Name" onChange={e => setName(e.target.value)} />
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input
        type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={register}>Register</button>

      <p>{msg}</p>
    </div>
  );
}

export default Register;
