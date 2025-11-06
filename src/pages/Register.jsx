import { useState } from "react";
// Asegúrate de importar Link
import { useNavigate, Link } from "react-router-dom"; 

// Importa el CSS local
import './Register.css'; 

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dni, setDni] = useState("");
  const [cellphone, setCellphone] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:91/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, dni, cellphone }),
      });

      if (res.ok) {
        alert("Registro exitoso");
        navigate("/login");
      } else {
        alert("Error al registrarse");
      }
    } catch (error) {
      console.error("Error en registro:", error);
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
      {/* Contenedor del formulario con la clase .register-container */}
      <div className="register-container">
        <h2>Registro</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {/* <br> ELIMINADO */}
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
          <input
            type="text"
            placeholder="DNI"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
          />
          {/* <br /> ELIMINADO */}
          <input
            type="text"
            placeholder="Teléfono"
            value={cellphone}
            onChange={(e) => setCellphone(e.target.value)}
          />
          {/* <br /> ELIMINADO */}
          <button type="submit" className="register-button">Registrarse</button>
        </form>
         <p className="login-link-text">
          ¿Ya tienes cuenta? <Link to="/login">Inicia Sesión</Link>
        </p>
      </div>
    </div>
  );
}