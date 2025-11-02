// pages/HomePage.jsx

//hooks
import { useServices } from "../hooks/useServices";
import { useAuth } from "../hooks/useAuth";
//components
import ServiceList from "../components/Service/ServiceList";
import TurnConfigDayList from "../components/TurnConfigDay/TurnConfigDayList";
import TurnList from "../components/Turn/TurnList";
import Spinner from "../components/Spinner";

//utils
import { capitalize } from "../utils/formatters";
import { useTurnConfigDays } from "../hooks/useTurnConfigDays";
import { useEffect, useState } from "react";

export default function ControlPanel() {
  const [showContent, setShowContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { services, isLoadingServices, errorServices, searchServices } = useServices();
  const { turnConfigDay, isLoadingDays, errorDays, searchTurnConfigDays } = useTurnConfigDays();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    if (isLoadingDays) {
      setShowContent('days');
      setIsLoading(true);
    } else if (isLoadingServices) {
      setShowContent('services');
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [isLoadingDays, isLoadingServices])

  const itemWrapper = () => {
    if (isLoading) {
      return <Spinner styles={styles} />
    }
    
    if (showContent === 'days') {
      return <TurnConfigDayList turnConfigDays={turnConfigDay} />
    }

    if (showContent === 'services') {
      return <ServiceList services={services} />
    }
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h3 style={styles.sidebarTitle}>Menú</h3>        
        <div style={styles.buttonContainer}>
          <button 
            onClick={searchServices} 
            disabled={isLoadingServices}
            style={styles.button}
          >
            {isLoadingServices ? "Buscando..." : "Servicios"}
          </button>
          <button 
            onClick={searchTurnConfigDays} 
            disabled={isLoadingDays}
            style={styles.button}
          >
            {isLoadingDays ? "Buscando..." : "Dias"}
          </button>
          <button 
            onClick={handleLogout}
            style={styles.button}
          >
            Logout
          </button>
        </div>
      </div>
      
      {/* Contenido principal */}
      <div style={styles.mainContent}>
        <h1 style={styles.welcomeTitle}>{capitalize("bienvenido")} 🎉</h1>
        
        {errorDays && (
          <div style={styles.error}>
            {errorDays}
          </div>
        )}
        {errorServices && (
          <div style={styles.error}>
            {errorServices}
          </div>
        )}
        
        <div id="itemWrapper">
          {itemWrapper()}
        </div>
        <TurnList/>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh"
  },
  sidebar: {
    width: "250px",
    backgroundColor: "#f8f9fa",
    padding: "20px",
    borderRight: "1px solid #dee2e6"
  },
  sidebarTitle: {
    color: "#333",
    marginBottom: "20px"
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  button: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
  },
  mainContent: {
    flex: 1,
    padding: "20px"
  },
  welcomeTitle: {
    color: "#333",
    marginBottom: "20px"
  },
  error: {
    color: "#dc3545",
    padding: "10px",
    backgroundColor: "#f8d7da",
    border: "1px solid #f5c6cb",
    borderRadius: "4px",
    marginBottom: "20px"
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