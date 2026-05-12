const API_URL = 'http://localhost:8080/auth';

export const authService = {
  login: async (email, contrasena) => {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, contrasena })
    });
    if (!response.ok) throw new Error('Credenciales incorrectas');
    return response.json();
  },

  registrar: async (userData) => {
    const response = await fetch(`${API_URL}/registrar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    if (!response.ok) throw new Error('Error en el registro');
    return response.text(); // El backend devuelve un String
  }
};