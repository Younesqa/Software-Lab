function Logout({ onLogout }) {
  const logout = () => {
    localStorage.removeItem("token");
    onLogout();
  };

  return (
    <button className="logout-btn" onClick={logout}>
      Logout
    </button>
  );
}

export default Logout;
