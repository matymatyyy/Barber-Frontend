export default function ServiceCard({ service }) {
  return (
    <div style={{ padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
        <h3>{service.type}</h3>
        <p>Precio: ${service.price}</p>
        <p>ID: {service.id}</p>
    
        <div /*style={styles.buttonSection}*/>
            <button /*onClick={() => handleDeleteService(service.id)} style={styles.deleteButton}*/>
                x
            </button>
            <button /*style={styles.editButton}*/>
                e
            </button>
        </div>
        
    </div>
  );
}
