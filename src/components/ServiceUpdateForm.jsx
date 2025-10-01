import { useState } from "react";
import { useServices } from "../hooks/useServices";
import { getToken } from "../utils/storage";

function ServiceUpdateForm({ service }) {

  const {services, error, updateServices} = useServices();
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [id, setID] = useState("");
  
  
  const handleUpdate = async (e) => {
    e.preventDefault();
    const serviceId = service.id;
  
    try {
      await updateServices (serviceId, type, price);
      console.log("llegue aca");
    } catch (error) {
      console.error("hermoso error");
    }
  
  }

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
  />
</form>

}
export default ServiceUpdateForm