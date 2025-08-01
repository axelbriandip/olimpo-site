// src/redux/slices/testimonialSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define la URL base de tu backend
// ¡IMPORTANTE! Cambia 'https://your-production-api.com/api' por tu URL real de producción cuando deployes.
const API_BASE_URL = process.env.NODE_ENV === 'production'
    ? 'https://olimpo-rxz7.onrender.com'
    : 'http://localhost:3000/api';

// Define el estado inicial para los testimonios
const initialState = {
    testimonials: [],
    isLoading: false,
    error: null,
};

// Define una thunk asíncrona para obtener todos los testimonios
export const fetchTestimonials = createAsyncThunk(
    'testimonials/fetchTestimonials',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/testimonials`);
            return response.data; // El payload será el array de testimonios
        } catch (error) {
            // Usa rejectWithValue para pasar el mensaje de error del backend o el mensaje de error genérico
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

// Crea el slice de Redux para testimonios
const testimonialSlice = createSlice({
    name: 'testimonials',
    initialState,
    reducers: {
        // Puedes añadir reducers síncronos si los necesitas en el futuro
        clearTestimonialsError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Estado cuando la petición de testimonios está pendiente
            .addCase(fetchTestimonials.pending, (state) => {
                state.isLoading = true;
                state.error = null; // Limpiar errores previos
            })
            // Estado cuando la petición de testimonios es exitosa
            .addCase(fetchTestimonials.fulfilled, (state, action) => {
                state.isLoading = false;
                state.testimonials = action.payload; // Asigna los testimonios obtenidos
                state.error = null;
            })
            // Estado cuando la petición de testimonios falla
            .addCase(fetchTestimonials.rejected, (state, action) => {
                state.isLoading = false;
                state.testimonials = []; // Limpia los testimonios en caso de error
                state.error = action.payload || 'Failed to fetch testimonials'; // El payload de rejectWithValue es el error
            });
    },
});

// Exporta las acciones síncronas generadas por createSlice y el reducer por defecto
export const { clearTestimonialsError } = testimonialSlice.actions;
export default testimonialSlice.reducer;