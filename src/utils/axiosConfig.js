// src/api/axiosConfig.js (o src/utils/axiosConfig.js)
import axios from 'axios';
import { store } from '../redux/store'; // Importa tu store de Redux

// Define la URL base de tu backend
const API_BASE_URL = process.env.NODE_ENV === 'production'
    ? 'https://your-production-api.com/api' // Cambia esto por tu URL de producción
    : 'http://localhost:3000/api'; // URL de desarrollo

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor de REQUEST: Añade el token de autenticación a cada petición
axiosInstance.interceptors.request.use(
    (config) => {
        // Obtén el token del estado actual de Redux
        const token = store.getState().auth.token;

        // Si el token existe, añádelo al encabezado de Autorización
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor de RESPONSE (opcional pero recomendado para manejar tokens expirados, etc.)
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Si el token expiró o es inválido (respuesta 401 Unauthorized)
        if (error.response && error.response.status === 401) {
            // Opcional: Despacha la acción de logout de Redux si el token no es válido
            // para limpiar el estado y redirigir al usuario al login.
            // ¡CUIDADO! Esto podría causar un bucle si el login en sí devuelve 401.
            // Solo haz esto si estás seguro de que el 401 es por un token inválido/expirado
            // y no por credenciales incorrectas en el login.
            // import { logout } from '../redux/slices/authSlice';
            // store.dispatch(logout());
            console.warn("Token JWT expirado o inválido. Redirigiendo a login.");
            // Puedes manejar la redirección aquí o en tu componente PrivateRoute
            // Por ahora, solo lo registraremos y dejaremos que PrivateRoute maneje la redirección.
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;