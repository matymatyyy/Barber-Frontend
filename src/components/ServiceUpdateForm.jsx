import { useState } from "react";
import { useServices } from "../hooks/useServices";
import { getToken } from "../utils/storage";

function ServiceUpdateForm({ service }) {

  const {services, error, updateServices} = useServices();
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [id, setID] = useState("");
  const token = getToken();


  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await updateServices (id, type, price);
      saveToken(data.token);
      return data;
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
  onClick={(e) => setID(service.id) } 
  />
</form>

}
export default ServiceUpdateForm