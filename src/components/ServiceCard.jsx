import { useState } from "react";
import ServiceUpdateForm from "./ServiceUpdateForm";
import { useServices } from "../hooks/useServices";
import { getToken } from "../utils/storage";
function ServiceCard({ service }) {

  const [isShown, setIsShown] = useState(true);
  
  const show = () => {
    if(isShown === true) {
      setIsShown(false);
    } else {
      setIsShown(true);
    }
    
  };

  const {services, error, updateServices} = useServices();
    const [type, setType] = useState("");
    const [price, setPrice] = useState("");
    const [id, setID] = useState("");
    const token = getToken();
  
  
    const handleUpdate = async (e) => {
      e.preventDefault();
  
      try {
        await updateServices (id, type, price);
        console.log("llegue aca");
      } catch (error) {
        console.error("hermoso error");
      }
  
    }
  return (
    
    <div style={{ padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
      {isShown ?
      ( 
        <>
        
        <h3>{service.type}</h3>
        <p>Precio: ${service.price}</p>
        <p>ID: {service.id}</p>
        </>
      )  
      :
      (
        <>
        <form onSubmit={handleUpdate}>
    <h3>
      <input 
        type="text" 
        placeholder={service.type}
        value={type}
        onChange={(e) => setType(e.target.value)} 
      />
    </h3>
    <p>
      <input 
        type="text" 
        placeholder={service.price}
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
  </p>
  <p>ID: {service.id}</p>
  <input 
  type="submit" 
  onClick={(e) => setID(service.id) }
  />
</form>
        </>
      )  
      } 
      <div /*style={styles.buttonSection}*/>
        <button /*onClick={() => handleDeleteService(service.id)} style={styles.deleteButton}*/>
          x
        </button>
        <button onClick={show}/*style={styles.editButton}*/>
          e
        </button>
      </div>

    </div>
  );
}
export default ServiceCard
