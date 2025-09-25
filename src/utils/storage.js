// utils/storage.js
export const saveToken = (token) => {
  try {
    localStorage.setItem("token", token);
  } catch (error) {
    console.error("Error guardando token:", error);
  }
};

export const getToken = () => {
  try {
    return localStorage.getItem("token");
  } catch (error) {
    console.error("Error obteniendo token:", error);
    return null;
  }
};

export const removeToken = () => {
  try {
    localStorage.removeItem("token");
  } catch (error) {
    console.error("Error removiendo token:", error);
  }
};

// Para roles futuros
export const saveRole = (role) => {
  try {
    localStorage.setItem("role", role);
  } catch (error) {
    console.error("Error guardando role:", error);
  }
};

export const getRole = () => {
  try {
    return localStorage.getItem("role");
  } catch (error) {
    console.error("Error obteniendo role:", error);
    return null;
  }
};