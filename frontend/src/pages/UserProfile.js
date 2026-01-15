import { useEffect, useState } from "react";
import { API } from "../services/api";

export default function UserProfile({ onBack }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    API.get("/auth/me").then((res) => {
      setUser(res.data);
    });
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <nav className="navbar">
        <h1>My Profile</h1>
        <button className="back-btn" onClick={onBack}>⬅ Back</button>
      </nav>

      <div style={{ padding: 20 }}>
        <p><b>Name:</b> {user.name}</p>
        <p><b>Email:</b> {user.email}</p>
        <p><b>Role:</b> {user.role}</p>
      </div>
    </div>
  );
}
