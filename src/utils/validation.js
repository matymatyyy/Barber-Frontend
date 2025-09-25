// utils/validation.js
export const validateEmail = (email) => {
  if (!email) {
    return "El email es obligatorio";
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "El formato del email es inválido";
  }
  
  return null;
};

export const validatePassword = (password) => {
  if (!password) {
    return "La contraseña es obligatoria";
  }
  
  if (password.length < 2) { // Ajusta según tus reglas
    return "La contraseña debe tener al menos 2 caracteres";
  }
  
  return null;
};

export const validateLoginForm = (email, password) => {
  const errors = {};
  
  const emailError = validateEmail(email);
  if (emailError) errors.email = emailError;
  
  const passwordError = validatePassword(password);
  if (passwordError) errors.password = passwordError;
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};