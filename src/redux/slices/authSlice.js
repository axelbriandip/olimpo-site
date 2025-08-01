// src/redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define la URL base de tu backend, AHORA CON EL PREFIJO '/api'
const API_BASE_URL = process.env.NODE_ENV === 'production'
    ? 'https://olimpo-rxz7.onrender.com/api' // La URL correcta
    : 'http://localhost:3000/api'; // URL de desarrollo

// 1. Define el estado inicial
const initialState = {
    token: localStorage.getItem('token'),
    user: null,
    isAuthenticated: !!localStorage.getItem('token'),
    isLoading: false,
    error: null,
};

// 2. Define una thunk asíncrona para el login
export const login = createAsyncThunk(
    'auth/login',
    async ({ username, password }, { rejectWithValue }) => {
        try {
            // La URL de la petición ahora será 'https://olimpo-rxz7.onrender.com/api/auth/login'
            const response = await axios.post(`${API_BASE_URL}/auth/login`, { username, password });
            localStorage.setItem('token', response.data.token);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message || error.message);
        }
    }
);

// 3. Crea el slice de Redux
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('token');
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
            state.isLoading = false;
            state.error = null;
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.token = action.payload.token;
                state.user = action.payload.user;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.token = null;
                state.user = null;
                state.isAuthenticated = false;
                state.error = action.payload || 'Login failed';
            });
    },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
