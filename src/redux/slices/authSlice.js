// src/redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; // Necesitamos axios para las peticiones HTTP

// Define la URL base de tu backend
const API_BASE_URL = process.env.NODE_ENV === 'production'
    // La URL CORREGIDA de tu backend en Render
    ? 'https://olimpo-rxz7.onrender.com'
    : 'http://localhost:3000'; // URL de desarrollo

// 1. Define el estado inicial
const initialState = {
    token: localStorage.getItem('token'), // Intenta cargar el token del localStorage al inicio
    user: null, // Aquí guardaremos la información del usuario (id, username, etc.)
    isAuthenticated: !!localStorage.getItem('token'), // true si hay token, false si no
    isLoading: false,
    error: null,
};

// 2. Define una thunk asíncrona para el login
// createAsyncThunk maneja automáticamente los estados pending, fulfilled, rejected
export const login = createAsyncThunk(
    'auth/login', // Nombre de la acción
    async ({ username, password }, { rejectWithValue }) => {
        try {
            // El prefijo '/auth/login' se añade aquí, ya que la URL base es 'https://...'
            const response = await axios.post(`${API_BASE_URL}/auth/login`, { username, password });
            // Almacena el token en localStorage
            localStorage.setItem('token', response.data.token);
            return response.data; // Esto será el payload de la acción fulfilled
        } catch (error) {
            // Usa rejectWithValue para pasar el error al reducer
            return rejectWithValue(error.response.data.message || error.message);
        }
    }
);

// 3. Crea el slice de Redux
const authSlice = createSlice({
    name: 'auth', // Nombre del slice
    initialState,
    reducers: {
        // Acción para manejar el logout
        logout: (state) => {
            localStorage.removeItem('token'); // Elimina el token del localStorage
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
            state.isLoading = false;
            state.error = null;
        },
        // Si necesitas alguna otra acción síncrona aquí, la agregas
        clearError: (state) => {
            state.error = null;
        }
    },
    // Extra reducers para manejar las acciones asíncronas de createAsyncThunk
    extraReducers: (builder) => {
        builder
            // Estado cuando la petición de login está pendiente
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null; // Limpiar errores previos
            })
            // Estado cuando la petición de login es exitosa
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.token = action.payload.token;
                state.user = action.payload.user;
                state.isAuthenticated = true;
                state.error = null;
            })
            // Estado cuando la petición de login falla
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.token = null;
                state.user = null;
                state.isAuthenticated = false;
                state.error = action.payload || 'Login failed'; // El payload de rejectWithValue es el error
            });
    },
});

// 4. Exporta las acciones y el reducer
export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
