// hooks/useServices.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchServices, fetchUpdateService } from "../services/serviceService";
import { getToken, removeToken } from "../utils/storage";

export function useServices() {
  const [services, setServices] = useState([]);
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const searchServices = async () => {
    const token = getToken();
    
    if (!token) {
      navigate("/");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchServices(token);
      setServices(data);
    } catch (err) {
      setError(err.message);
      setServices([]);
      
      // Si el token es inválido, redirigir al login
      if (err.message.includes("inválido") || err.message.includes("expirada")) {
        removeToken();
        navigate("/");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const clearServices = () => {
    setServices([]);
    setError(null);
  };

  const updateServices = async () => {
    try {
      const data = await fetchUpdateService(token, id);
      //setServices(data);
    } catch (err) {
      setError(err.message);
      //setServices([]);
      
      // Si el token es inválido, redirigir al login
      if (err.message.includes("inválido") || err.message.includes("expirada")) {
        removeToken();
        navigate("/");
      }
    } finally {
      setIsLoading(false);
    }
  };
  };

  return {
    services,
    isLoading,
    error,
    searchServices,
    clearServices,
    updateServices
  };
