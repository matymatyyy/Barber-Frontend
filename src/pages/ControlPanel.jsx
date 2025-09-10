import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ServiceList from './ServiceList'; 
import Spinner from "./Spinner";

function ControlPanel () {
    const navigate = useNavigate();
    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogout = () => {
    // Elimina el token del estado también al hacer logout
    setServices([]);
    navigate("/");
  };

  const handleSearch = async () => {
    const token = localStorage.getItem("token");
    setIsLoading(true); // Activar loading

    try {
        const response = await fetch('http://localhost:91/barbers', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "x-api-key": token,
            },
        });

        if (!response.ok) {
        localStorage.removeItem("token");
        navigate("/");
        alert("Sesión expirada o token inválido. Vuelve a iniciar sesión.");
        return;
      }

      const data = await response.json();
      console.log("Resultados:", data);
      
      // Actualizar el estado con los dominios recibidos
      // Asumiendo que la estructura es { data: Array }
      setServices(data.data || data); // Usar data.data si existe, sino usar data directamente

    } catch (error) {
        console.error("Error en search:", error);
        alert("No se pudo conectar al servidor");
        setServices([]); // Limpiar dominios en caso de erro
    } finally {
      setIsLoading(false); // Desactivar loading
    }

  };

  return (
    <div style={styles.container}>
        <div style={styles.sidebar}>

            <h3 style={styles.sidebarTitle}> Menu </h3>

            <div style={styles.buttonContainer}> 
                <button onClick={handleSearch} disabled={isLoading} style={styles.button}> 
                    {isLoading ? "Buscando..." : "Search"} 
                </button>
                <button onClick={handleLogout} style={styles.button}>
                    Logout
                </button>
            </div>

        </div>

        <div style={styles.mainContent}> 
            <h1 style={styles.welcomeTitle}> Bienvenido 🎉 </h1>
            {isLoading && <Spinner  styles={styles} />} 
            <ServiceList services={services} isLoading={isLoading} />
        </div>

    </div>
  );

}

export default ControlPanel;

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5'
  },
  sidebar: {
    width: '250px',
    backgroundColor: '#2c3e50',
    padding: '20px',
    boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
    position: 'fixed',
    height: '100vh',
    left: 0,
    top: 0
  },
  sidebarTitle: {
    color: '#ffffff',
    marginBottom: '30px',
    fontSize: '18px',
    fontWeight: '600',
    textAlign: 'center',
    borderBottom: '2px solid #34495e',
    paddingBottom: '15px'
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  button: {
    padding: '12px 16px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
  },
  mainContent: {
    marginLeft: '250px',
    padding: '20px',
    flex: 1,
    backgroundColor: '#ffffff',
    minHeight: '100vh'
  },
  welcomeTitle: {
    color: '#2c3e50',
    marginBottom: '20px',
    fontSize: '28px',
    fontWeight: '300'
  },
  overlay: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px',
  },
  spinner: {
    width: '30px',
    height: '30px',
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #3498db',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
};