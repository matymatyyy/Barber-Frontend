const fetchServiceUpdate = async (serviceId) => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`http://localhost:91/services/${serviceId}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "x-api-key": token,
      },
      body: JSON.stringify({
        type, 
        price
      })
    });

    if (!response.ok) {
      localStorage.removeItem("token");
      throw new Error("Sesión expirada o token inválido. Vuelve a iniciar sesión.");
    }

    const result = await response.json();
    
    console.log("Servicio actualizado exitosamente:", serviceId);
    return result;
    
  } catch (error) {
    console.error("Error en fetchServiceUpdate:", error);
   
    throw error;
  }
};

export default fetchServiceUpdate;