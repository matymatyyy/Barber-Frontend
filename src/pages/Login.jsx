import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Importa el CSS local
import './Login.css'; 

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:91/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        login(data.token); // guardamos JWT
        navigate("/");
      } else {
        alert("Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error en login:", error);
      alert("Error al conectar con el servidor");
    }
  };

  //  ESTILO PARA FORZAR EL FONDO DE PANTALLA OSCURO
  const fullScreenDarkStyle = {
    backgroundColor: '#222227', // El color --dark de tu paleta
    minHeight: '100vh',         // Ocupa toda la altura de la pantalla
    display: 'flex',            // Para centrar el formulario
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',              // Ocupa todo el ancho
  };

  return (
    //  Div que aplica el fondo de pantalla oscuro
    <div style={fullScreenDarkStyle}> 
      {/* Contenedor del formulario con la clase .login-container */}
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* <br /> ELIMINADO */}
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* <br /> ELIMINADO */}
          <button type="submit" className="login-button">Entrar</button>
        </form>
        <p className="register-text">
          ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
}