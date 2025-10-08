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

export async function fetchSingularService(token, id) {
  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.SERVICES}${id}`, {
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

export async function fetchDeleteService(token, id) {
  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.SERVICES}${id}`, {
    method: "DELETE",
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

export async function fetchUpdateService(token, id, type, price) {
  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.SERVICES}${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": token,
    },
    body: JSON.stringify({ type, price }),
  });

  if (!response.ok) {
    throw new Error("Token inválido o sesión expirada");
  }

  const data = await response.json();
  return data.data || data;
}

export async function fetchCreateService(token, type, price) {
  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.SERVICES}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": token,
    },
    body: JSON.stringify({ type, price }),
  });

  if (!response.ok) {
    throw new Error("Token inválido o sesión expirada");
  }

  const data = await response.json();
  return data.data || data;
}