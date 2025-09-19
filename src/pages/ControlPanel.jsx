import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ServiceCard from '../components/ServiceCard'; 

function ControlPanel () {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Elimina el token del estado también al hacer logout
    setServices([]);
    navigate("/login/admin");
  };

  const handleEntity = () => {
    
  };

  return (
    <div style={styles.container}>
        <div style={styles.sidebar}>

            <h3 style={styles.sidebarTitle}> Menu </h3>

            <div style={styles.buttonContainer}> 
                <button onClick={handleEntity} style={styles.button}> Servicios
                </button>
                <button onClick={handleLogout} style={styles.button}>
                    Logout
                </button>
            </div>

        </div>

        <div style={styles.mainContent}> 
            <h1 style={styles.welcomeTitle}> Bienvenido 🎉 </h1>
            <ServiceCard />
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
  hidden: {
    display: "none"
  }
};