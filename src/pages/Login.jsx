import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import FeedbackModal from "../components/common/FeedbackModal";

// Importa el CSS local
import './Login.css'; 

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const [feedbackModal, setFeedbackModal] = useState({
    isOpen: false,
    status: 'loading', // 'loading' | 'success' | 'error'
    message: ''
  });

  const handleCloseFeedbackModal = () => {
    setFeedbackModal({
      isOpen: false,
      status: 'loading',
      message: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mostrar modal de carga
    setFeedbackModal({
      isOpen: true,
      status: 'loading',
      message: 'Iniciando sesión...'
    });

    try {
      const res = await fetch("http://localhost:91/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        
        // Mostrar éxito
        setFeedbackModal({
          isOpen: true,
          status: 'success',
          message: '¡Inicio de sesión exitoso! Redirigiendo...'
        });

        // Guardar token y redirigir después de un momento
        login(data.token);
        
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        // Mostrar error de credenciales
        setFeedbackModal({
          isOpen: true,
          status: 'error',
          message: 'Credenciales incorrectas. Por favor verifica tu email y contraseña.'
        });
      }
    } catch (error) {
      console.error("Error en login:", error);
      
      // Mostrar error de conexión
      setFeedbackModal({
        isOpen: true,
        status: 'error',
        message: 'Error al conectar con el servidor. Por favor intenta nuevamente.'
      });
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
    <>
      {/* Div que aplica el fondo de pantalla oscuro */}
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
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="login-button">Entrar</button>
          </form>
          <p className="register-text">
            ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
          </p>
        </div>
      </div>

      {/* Modal de Feedback */}
      <FeedbackModal
        isOpen={feedbackModal.isOpen}
        status={feedbackModal.status}
        message={feedbackModal.message}
        onClose={handleCloseFeedbackModal}
        autoCloseDelay={3000}
      />
    </>
  );
}
