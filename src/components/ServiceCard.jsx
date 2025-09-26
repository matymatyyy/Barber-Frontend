import { useState } from "react";


function ServiceCard({ service }) {

  const [isShown, setIsShown] = useState(true);


  return (
    
    <div style={{ padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
      {isShown ?
      <> 
        <h3>{service.type}</h3>
        <p>Precio: ${service.price}</p>
        <p>ID: {service.id}</p>
      </>  
      :
      <>
        <form //</>onSubmit={handleUpdate}
        >
          <h3>
            <input 
            type="text" 
            placeholder={service.type}
            //value={type}
            //onChange={(e) => setType(e.target.value)} 
            />
          </h3>
          <p>
            <input 
            type="text" 
            placeholder={service.price}
            //value={price}
            //onChange={(e) => setPrice(e.target.value)}
            />
          </p>
          <p>ID: {service.id}</p>
        </form>
      </>  
      } 
      <div /*style={styles.buttonSection}*/>
        <button /*onClick={() => handleDeleteService(service.id)} style={styles.deleteButton}*/>
          x
        </button>
        <button onClick={setIsShown(false)}/*style={styles.editButton}*/>
          e
        </button>
      </div>

    </div>
  );
}
export default ServiceCard
