// services/authService.js
import { API_BASE_URL, API_ENDPOINTS } from "../utils/constants";

export async function loginUser(email, password) {
  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.LOGIN}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error("Error en las credenciales");
  }

  const data = await response.json();
  return data;
}