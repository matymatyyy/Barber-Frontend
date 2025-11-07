import { useState } from "react";
// Asegúrate de importar Link
import { useNavigate, Link } from "react-router-dom"; 
import FeedbackModal from "../components/common/FeedbackModal";

// Importa el CSS local
import './Register.css'; 

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dni, setDni] = useState("");
  const [cellphone, setCellphone] = useState("");
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

  const handleRegister = async (e) => {
    e.preventDefault();

    // Mostrar modal de carga
    setFeedbackModal({
      isOpen: true,
      status: 'loading',
      message: 'Procesando tu registro...'
    });

    try {
      const res = await fetch("http://localhost:91/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, dni, cellphone }),
      });

      if (res.ok) {
        // Mostrar éxito
        setFeedbackModal({
          isOpen: true,
          status: 'success',
          message: '¡Registro exitoso! Redirigiendo al inicio de sesión...'
        });

        // Redirigir después de un momento
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        // Intentar obtener mensaje de error del servidor
        const errorData = await res.json().catch(() => ({}));
        
        setFeedbackModal({
          isOpen: true,
          status: 'error',
          message: errorData.message || 'Error al registrarse. Por favor verifica los datos ingresados.'
        });
      }
    } catch (error) {
      console.error("Error en registro:", error);
      
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
        {/* Contenedor del formulario con la clase .register-container */}
        <div className="register-container">
          <h2>Registro</h2>
          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
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
              minLength="6"
            />
            <input
              type="text"
              placeholder="DNI"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              required
              pattern="[0-9]{7,8}"
              title="Ingresa un DNI válido (7-8 dígitos)"
            />
            <input
              type="tel"
              placeholder="Teléfono"
              value={cellphone}
              onChange={(e) => setCellphone(e.target.value)}
              required
              pattern="[0-9]{10}"
              title="Ingresa un teléfono válido (10 dígitos)"
            />
            <button type="submit" className="register-button">Registrarse</button>
          </form>
          <p className="login-link-text">
            ¿Ya tienes cuenta? <Link to="/login">Inicia Sesión</Link>
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
