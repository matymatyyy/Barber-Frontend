import { API_BASE_URL, API_ENDPOINTS } from "../utils/constants";

export async function fetchTurnConfigDays(token) {
  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.TURNCONFIGDAY}`, {
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

export async function fetchSingularTurnConfigDay(token, id) {
  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.TURNCONFIGDAY}${id}`, {
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

export async function fetchDeleteTurnConfigDay(token, id) {
  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.TURNCONFIGDAY}${id}`, {
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

export async function fetchUpdateTurnConfigDay(token, id, idTurnConfig, day, hourBegin, hourEnd, turnTime) {
  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.TURNCONFIGDAY}${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": token,
    },
    body: JSON.stringify({ idTurnConfig, day, hourBegin, hourEnd, turnTime }),
  });

  if (!response.ok) {
    throw new Error("Token inválido o sesión expirada");
  }

  const data = await response.json();
  return data.data || data;
}

export async function fetchCreateTurnConfigDay(token, idTurnConfig, day, hourBegin, hourEnd, turnTime) {
  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.TURNCONFIGDAY}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": token,
    },
    body: JSON.stringify({ idTurnConfig, day, hourBegin, hourEnd, turnTime }),
  });

  if (!response.ok) {
    throw new Error("Token inválido o sesión expirada");
  }

  const data = await response.json();
  return data.data || data;
}