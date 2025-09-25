// services/domainService.js
import { API_BASE_URL, API_ENDPOINTS } from "../utils/constants";

export async function fetchServices(token) {
  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.SERVICES}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": token,
    },
  });

  if (!response.ok) {
    throw new Error("Token inválido o sesión expirada");
  }

  const data = await response.json();
  return data.data || data;
}