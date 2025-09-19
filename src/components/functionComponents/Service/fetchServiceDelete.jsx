const fetchServiceDelete = async (serviceId) => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`http://localhost:91/services/${serviceId}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "x-api-key": token,
      },
    });

    if (!response.ok) {
      localStorage.removeItem("token");
      throw new Error("Sesión expirada o token inválido. Vuelve a iniciar sesión.");
    }

    const result = await response.json().catch(() => null);
    
    console.log("Servicio eliminado exitosamente:", serviceId);
    return result;
    
  } catch (error) {
    console.error("Error en fetchServiceDelete:", error);
   
    throw error;
  }
};

export default fetchServiceDelete;