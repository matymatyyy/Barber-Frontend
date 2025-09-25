// utils/constants.js
export const API_BASE_URL = "http://localhost:91";

export const API_ENDPOINTS = {
  LOGIN: "/login",
  REGISTER: '/register',
  LOGINADMIN: "/login/admin",
  SERVICES: "/services"
};

export const MESSAGES = {
  LOGIN_ERROR: "Error en las credenciales",
  CONNECTION_ERROR: "No se pudo conectar al servidor",
  SESSION_EXPIRED: "Token inválido o sesión expirada"
};