// hooks/useServices.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchDeleteService, fetchServices, fetchUpdateService, fetchCreateService } from "../services/serviceService";
import { getToken, removeToken } from "../utils/storage";

export function useServices() {
  const [services, setServices] = useState([]);
  const [isLoadingServices, setIsLoadingServices] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorServices, setErrorServices] = useState(null);
  const navigate = useNavigate();

const searchServices = async () => {
  const token = getToken();
  
  if (!token) {
    navigate("/");
    return;
  }

  setIsLoadingServices(true);
  setErrorServices(null);

  try {
    const data = await fetchServices(token);
    setServices(data);
  } catch (err) {
    setErrorServices(err.message);
    setServices([]);
    
    // Si el token es inválido, redirigir al login
    if (err.message.includes("inválido") || err.message.includes("expirada")) {
      removeToken();
      navigate("/");
    }
  } finally {
    setIsLoadingServices(false);
  }
}

const updateServices = async (id, type, price) => {
  const token = getToken();
  try {
    const data = await fetchUpdateService(token, id, type, price);
    setServices(data);
  } catch (err) {
    setErrorServices(err.message);
      
      // Si el token es inválido, redirigir al login
      if (err.message.includes("inválido") || err.message.includes("expirada")) {
        removeToken();
        navigate("/");
      }
    } finally {
      setIsLoadingServices(false);
    }
  }

const createService = async (type, price) => {
  console.log('hellow');
  const token = getToken();
  try {
     console.log('hola');
    const data = await fetchCreateService(token, type, price);
    setServices(prevServices => [...prevServices, data]);
  } catch (err) {
    setErrorServices(err.message);
      
      if (err.message.includes("inválido") || err.message.includes("expirada")) {
        removeToken();
        navigate("/");
      }
    } finally {
      setIsLoadingServices(false);
    }
  }

const deleteService = async (id) => {
  const token = getToken();
  try {
    setIsDeleting(id);
    await fetchDeleteService(token, id);
    setServices(prevServices => 
        prevServices.filter(service => service.id !== id)
      );

    alert("Servicio eliminado exitosamente");

  } catch (err) {
    setErrorServices(err.message);
      
      if (err.message.includes("inválido") || err.message.includes("expirada")) {
        removeToken();
        navigate("/");
      }
    } finally {
      setIsDeleting(false);
    }
}  

  const clearServices = () => {
    setServices([]);
    setErrorServices(null);
  };
  
  return {
    services,
    isLoadingServices,
    errorServices,
    searchServices,
    clearServices,
    updateServices,
    deleteService,
    createService,
  };
}

