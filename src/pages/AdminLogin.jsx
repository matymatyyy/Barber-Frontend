import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


import './AdminLogin.css'; 

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:91/login/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        login(data.token); // guardamos JWT
        navigate("/panel");
      } else {
        alert("Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error en login:", error);
      alert("Error al conectar con el servidor");
    }
  };

  //  CAMBIO CLAVE: Color de fondo más claro (#303030 vs #222227 en Login.jsx)
  const fullScreenDarkStyle = {
    backgroundColor: '#303030', 
    minHeight: '100vh',         
    display: 'flex',            
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',              
  };

  return (
    <div style={fullScreenDarkStyle}> 
      <div className="admin-login-container">
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="admin-login-button">Entrar</button>
        </form>
      </div>
    </div>
  );
}