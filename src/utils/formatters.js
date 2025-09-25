// utils/formatters.js

// Formatear fechas
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
};

// Formatear texto
export const capitalize = (text) => {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

// Formatear números
export const formatNumber = (number) => {
  return new Intl.NumberFormat("es-ES").format(number);
};

// Truncar texto
export const truncateText = (text, maxLength) => {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};