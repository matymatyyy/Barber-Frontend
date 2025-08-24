// src/pages/Home.jsx
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Bienvenido al Home 🏠</h1>

      {token ? (
        <p>Estás logueado con tu JWT: <code>{token.substring(0, 20)}...</code></p>
      ) : (
        <p>No tenés sesión activa</p>
      )}

      <button onClick={handleLogout} style={{ marginTop: "10px" }}>
        Cerrar sesión
      </button>
    </div>
  );
}
