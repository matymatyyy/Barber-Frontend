import { useEffect, useState } from "react";

import Spinner from "./Spinner";

function ClientList () {

  const [isLoading, setIsLoading] = useState(true);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    loadClient();
  }, []);

  const loadClient = async () => {
    const token = localStorage.getItem("token");

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:91/clients', {
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
      setClients(data.data || data);

    } catch (error) {
      console.error("Error en search:", error);
      alert("No se pudo conectar al servidor");
      setClients([]);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div style={styles.loadingContainer}>
        <Spinner />
      </div>
    );
  }

  if (!clients || clients.length === 0) {
    return (
      <div style={styles.emptyContainer}>
        <p style={styles.emptyText}>No se encontraron clientes. Haz clic en "Search" para buscar.</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Clientes encontradas ({clients.length})</h2>
      <div style={styles.grid}>
        {clients.map((client) => (

          <div key={client.id} style={styles.card}>
            <div style={styles.cardContent}>   
              <div>
                <h3 style={styles.clientTitle}>
                  {client.name}
                </h3>
                <p style={styles.clientInfo}>
                  <strong>Correo electonico </strong>{client.email}
                </p>
                <p style={styles.clientInfo}>
                  <strong>Contraseña? </strong>{client.password}
                </p>
                <p style={styles.clientInfo}>
                  <strong>DNI </strong>{client.dni}
                </p>
                <p style={styles.clientInfo}>
                  <strong>Numero de telefono </strong>{client.cellphone}
                </p>
                <p style={styles.clientInfo}>
                  <strong>ID:</strong>{client.id}
                </p>
              </div>
            </div>
          </div>

        ) )}
      </div>
    </div>
  );
}

export default ClientList;

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
  clientTitle: {
    margin: '0 0 8px 0',
    color: '#2c3e50',
    fontSize: '18px',
    fontWeight: '600'
  },
  clientInfo: {
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
  }
};