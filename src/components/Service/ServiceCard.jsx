import { useState } from "react";
import ServiceUpdateForm from "./ServiceUpdateForm";
import { useServices } from "../../hooks/useServices";
function ServiceCard({ service }) {

  const [isUpdateFormShown, setIsUpdateFormShown] = useState(true);
  const [isCreateFormShown, setIsCreateFormShown] = useState(false);

  
  const showUpdateForm = () => {
    if(isUpdateFormShown === true) {
      setIsUpdateFormShown(false);
    } else {
      setIsUpdateFormShown(true);
    }
    
  };

  const showCreateForm = () => {
    if(isCreateFormShown === false) {
      setIsCreateFormShown(true);
    } else {
      setIsCreateFormShown(false);
    }
  }

    const {services, error, updateServices, deleteService, createService} = useServices();
    const [type, setType] = useState("Corte");
    const [price, setPrice] = useState("");
  
    const serviceId = service.id;

  
    const handleUpdate = async (e) => {
      e.preventDefault();
      

      try {
        await updateServices (serviceId, type, price);
        console.log("llegue aqqqca");
      } catch (error) {
        console.error("hermoso error");
      }
  
    }

    const handleCreate = async (e) => {
      e.preventDefault();

      try {
        await createService (type, price);
        console.log("llegue aca2");
      } catch (error) {
        console.error("hermoso error");
      }
  
    }

    const handleDeleteService = async () => {
        const confirmDelete = window.confirm(
        "¿Estás seguro de que quieres eliminar este servicio? Esta acción no se puede deshacer."
      );

      if (!confirmDelete) {
        return;
      }

      try {
        await deleteService(serviceId);
        console.log("llegue aca");
      } catch (error) {
        console.error("hermoso error");
      }
    }

  return (
    <div>
      {isCreateFormShown ?
      (
        <>
        <form onSubmit={handleCreate}>
          <select onChange={(e) => setType(e.target.value) }>
            <option value={"Corte"}>Corte</option>
            <option value={"Tinte"}>Tinte</option>
          </select>
          <input 
            type="text" 
            placeholder='precio'
            value={price}
            onChange={(e) => setPrice(e.target.value)} 
          />
          <input 
            type="submit" 
          />
        </form>


        </>
      )
      :
      (
        <>
        <button onClick={showCreateForm}>+</button>
        </>
      )
      }


    <div style={{ padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
      
      {isUpdateFormShown ?
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
      <select onChange={(e) => setType(e.target.value) }>
        <option value={"Corte"}>Corte</option>
        <option value={"Tinte"}>Tinte</option>
      </select>
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
  />
</form>
        </>
      )  
      } 
      <div /*style={styles.buttonSection}*/>
        <button onClick={handleDeleteService}>
          x
        </button>
        <button onClick={showUpdateForm}/*style={styles.editButton}*/>
          e
        </button>
      </div>

    </div>
    </div>
  );
}
export default ServiceCard
