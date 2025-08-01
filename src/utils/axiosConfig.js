// src/utils/axiosConfig.js

import axios from 'axios';
import { store } from '../redux/store'; // Importa tu store de Redux

// La URL base del backend ahora se toma de la variable de entorno de Vite
// Netlify inyecta esta variable en el entorno de producción
// y Vite la usa en el entorno de desarrollo (desde .env.development, etc.)
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor de REQUEST: Añade el token de autenticación a cada petición
axiosInstance.interceptors.request.use(
    (config) => {
        const token = store.getState().auth.token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor de RESPONSE (opcional pero recomendado)
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.warn("Token JWT expirado o inválido. Redirigiendo a login.");
            // Aquí podrías despachar una acción de logout, pero por ahora solo es un warning
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;