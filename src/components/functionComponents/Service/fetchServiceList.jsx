const fetchServiceList = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch('http://localhost:91/services', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "x-api-key": token,
      },
    });

    if (!response.ok) {
      localStorage.removeItem("token");
      // En lugar de navigate, lanza un error para manejarlo en el componente
      throw new Error("Sesión expirada o token inválido. Vuelve a iniciar sesión.");
    }

    const data = await response.json();
    console.log("Resultados:", data);
    
    return data.data || data;

  } catch (error) {
    console.error("Error en fetchServiceList:", error);
   
    throw error;
  }
};

export default fetchServiceList;