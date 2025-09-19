import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

import fetchServiceList from "../components/functionComponents/Service/fetchServiceList";
import fetchServiceDelete from "../components/functionComponents/Service/fetchServiceDelete";

function ServiceCard () {
 
  const [error, setError] = useState(null)
  const [services, setServices] = useState(null);
  const [isDeleting, setIsDeleting] = useState(null);
  const navigate = useNavigate();
  
  const loadServices = async () => {
    try {
      setError(null)
      const serviceList = await fetchServiceList();
      setServices(serviceList);
    } catch (error) {
      console.error("Error cargando servicios:", error);
      setError(error.message);

      if (error.message.includes("Sesión expirada")) {
        alert(error.message);
        navigate("/");
      }  
    }
  };

  const handleDeleteService = async (serviceId) => {

    const confirmDelete = window.confirm(
      "¿Estás seguro de que quieres eliminar este servicio? Esta acción no se puede deshacer."
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setIsDeleting(serviceId); 
      
      await fetchServiceDelete(serviceId);
      
      setServices(prevServices => 
        prevServices.filter(service => service.id !== serviceId)
      );
      
      alert("Servicio eliminado exitosamente");
      
    } catch (error) {
      console.error("Error eliminando servicio:", error);
      
      if (error.message.includes("Sesión expirada")) {
        alert(error.message);
        navigate("/");
      } else {
        alert(`Error al eliminar servicio: ${error.message}`);
      }
    } finally {
      setIsDeleting(null); 
    }
  };  


  useEffect(() => {
    loadServices();
  }, []);


  if (!services || services.length === 0) {
    return (
      <div style={styles.emptyContainer}>
        <p style={styles.emptyText}>No se encontraron servicios. Haz clic en "Search" para buscar.</p>
      </div>
    );
  }
 
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Servicios Encontrados ({services.length})</h2>
      <div style={styles.grid}>
        {services.map((service) => (
          <div key={service.id} style={styles.card}>
            <div style={styles.cardContent}>  
               
                <h3 style={styles.serviceType}>
                  {service.type}
                </h3>
                <p style={styles.serviceInfo}>
                  <strong>Precio: $</strong>{service.price}
                </p>
                <p style={styles.serviceInfo}>
                  <strong>ID:</strong>{service.id}
                </p>
                
              <div style={styles.buttonSection}>

                <button onClick={() => handleDeleteService(service.id)} style={styles.deleteButton}>
                  x
                </button>
                
                <button style={styles.editButton}>
                  e
                </button>

              </div>

            </div>
          </div>
        ) )}
      </div>
    </div>
  );
}

export default ServiceCard;

const styles = {
  container: {
    padding: '20px'
  },
  title: {
    color: '#2c3e50',
    fontSize: '24px',
    fontWeight: '500',
    marginBottom: '20px',
    borderBottom: '2px solid #3498db',
    paddingBottom: '10px'
  },
  grid: {
    display: 'grid',
    gap: '15px',
    marginTop: '20px'
  },
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '15px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    cursor: 'pointer'
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  serviceType: {
    margin: '0 0 8px 0',
    color: '#2c3e50',
    fontSize: '18px',
    fontWeight: '600'
  },
  serviceInfo: {
    margin: '5px 0 0 0',
    color: '#666',
    fontSize: '14px'
  },
  loadingContainer: {
    padding: '20px',
    textAlign: 'center'
  },
  loadingText: {
    color: '#3498db',
    fontSize: '16px',
    fontStyle: 'italic'
  },
  emptyContainer: {
    padding: '20px',
    textAlign: 'center'
  },
  emptyText: {
    color: '#7f8c8d',
    fontSize: '16px'
  },
  buttonSection: {
    display: 'flex',
    alignItems: 'center'
  },
  deleteButton: {
    backgroundColor: '#f54b45d8',
    color: '#EEEEF9',
  },
  editButton: {
    backgroundColor: '#f3bd2ad8',
    color: '#1a1a1aff',
  },
};