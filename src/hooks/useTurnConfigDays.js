import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchDeleteTurnConfigDay, fetchTurnConfigDays, fetchUpdateTurnConfigDay, fetchCreateTurnConfigDay } from "../services/turnConfigDayService";
import { getToken, removeToken } from "../utils/storage";

export function useTurnConfigDays() {
  const [turnConfigDay, setTurnConfigDays] = useState([]);
  const [isLoadingDays, setIsLoadingDays] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorDays, setErrorDays] = useState(null);
  const navigate = useNavigate();

const searchTurnConfigDays = async () => {
  const token = getToken();
  
  if (!token) {
    navigate("/");
    return;
  }

  setIsLoadingDays(true);
  setErrorDays(null);

  try {
    const data = await fetchTurnConfigDays(token);
    setTurnConfigDays(data);
  } catch (err) {
    setErrorDays(err.message);
    setTurnConfigDays([]);
    
    if (err.message.includes("inválido") || err.message.includes("expirada")) {
      removeToken();
      navigate("/");
    }
  } finally {
    setIsLoadingDays(false);
  }
}

const updateTurnConfigDay = async (id, idTurnConfig, day, hourBegin, hourEnd, turnTime ) => {
  const token = getToken();
  try {
    const data = await fetchUpdateTurnConfigDay(token, id, idTurnConfig, day, hourBegin, hourEnd, turnTime );
    setTurnConfigDays(data);
  } catch (err) {
    setErrorDays(err.message);
      
      // Si el token es inválido, redirigir al login
      if (err.message.includes("inválido") || err.message.includes("expirada")) {
        removeToken();
        //navigate("/");
      }
    } finally {
      setIsLoadingDays(false);
    }
  }

const createTurnConfigDay = async (idTurnConfig, day, hourBegin, hourEnd, turnTime ) => {
  console.log('hellow');
  const token = getToken();
  try {
     console.log('hola');
    const data = await fetchCreateTurnConfigDay(token, idTurnConfig, day, hourBegin, hourEnd, turnTime );
    setTurnConfigDays(prevTurnConfigDays => [...prevTurnConfigDays, data]);
  } catch (err) {
    setErrorDays(err.message);
      
      if (err.message.includes("inválido") || err.message.includes("expirada")) {
        removeToken();
        navigate("/");
      }
    } finally {
      setIsLoadingDays(false);
    }
  }

const deleteTurnConfigDay = async (id) => {
  const token = getToken();
  try {
    setIsDeleting(id);
    await fetchDeleteTurnConfigDay(token, id);
    setTurnConfigDays(prevTurnConfigDays => 
        prevTurnConfigDays.filter(service => service.id !== id)
      );

    alert("Servicio eliminado exitosamente");

  } catch (err) {
    setErrorDays(err.message);
      
      if (err.message.includes("inválido") || err.message.includes("expirada")) {
        removeToken();
        navigate("/");
      }
    } finally {
      setIsDeleting(false);
    }
}  

  const clearTurnConfigDays = () => {
    setTurnConfigDays([]);
    setErrorDays(null);
  };
  
  return {
    turnConfigDay,
    isLoadingDays,
    errorDays,
    searchTurnConfigDays,
    clearTurnConfigDays,
    updateTurnConfigDay,
    deleteTurnConfigDay,
    createTurnConfigDay,
  };
}

