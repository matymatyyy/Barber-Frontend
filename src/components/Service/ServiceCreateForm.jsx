import { useState } from "react";
import { useServices } from "../../hooks/useServices";
function ServiceCreateForm({ service }) {
    
    const [isCreateFormShown, setIsCreateFormShown] = useState(false);
    const {services, error, createService} = useServices();
    const [type, setType] = useState("");
    const [price, setPrice] = useState("");

    const showCreateForm = () => {
    if(isCreateFormShown === false) {
      setIsCreateFormShown(true);
    } else {
      setIsCreateFormShown(false);
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

return (
    <div>
        {isCreateFormShown ?
      (
        <>
            <form onSubmit={handleCreate}>
                <input 
                    type="text" 
                    placeholder='Corte/Tinte'
                    value={type}
                    onChange={(e) => setType(e.target.value)} 
                />
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
    </div>
  );
}
export default ServiceCreateForm