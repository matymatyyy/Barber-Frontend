// hooks/useAuth.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";

//service
import { loginUser } from "../services/authService";

//utils
import { saveToken, getToken, removeToken, saveRole } from "../utils/storage";

//constantes
import { MESSAGES } from "../utils/constants";

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await loginUser(email, password);
      
      // Guardar token
      saveToken(data.token);
      
      // Navegar al home si el loguin es correcta
      navigate("/home");
      
      //de momento no usamos esta info
      return data;
    } catch (err) {
      const errorMessage = err.message || MESSAGES.CONNECTION_ERROR;
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {

      //Es una buena práctica para "limpiar" estados que siempre deben resetearse, independientemente del resultado.
      setIsLoading(false);
    }
  };

  const logout = () => {
    removeToken();
    navigate("/");
  };

  const isAuthenticated = () => {
    return getToken() !== null;
  };

  return {
    isLoading,
    error,
    login,
    logout,
    isAuthenticated
  };
}