// src/redux/slices/matchSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define la URL base de tu API de partidos
const MATCHES_API_URL = 'https://olimpo-rxz7.onrender.com/api'; // ¡Asegúrate de que esta URL sea correcta!

// Acción asíncrona para obtener todos los partidos
export const fetchMatches = createAsyncThunk(
    'matches/fetchMatches',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(MATCHES_API_URL);
            return response.data;
        } catch (error) {
            // Usa rejectWithValue para pasar el error al estado 'rejected'
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

const matchSlice = createSlice({
    name: 'matches',
    initialState: {
        matches: [],
        loading: 'idle', // 'idle' | 'pending' | 'succeeded' | 'failed'
        error: null,
    },
    reducers: {
        // Aquí puedes añadir reducers síncronos si los necesitas en el futuro
        // Por ejemplo, para filtrar partidos directamente en el frontend sin recargar
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMatches.pending, (state) => {
                state.loading = 'pending';
                state.error = null; // Limpiar cualquier error previo al iniciar una nueva carga
            })
            .addCase(fetchMatches.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.matches = action.payload; // Asigna los datos recibidos a 'matches'
            })
            .addCase(fetchMatches.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.payload; // El payload contiene el mensaje de error de rejectWithValue
            });
    },
});

// Exporta los reducers (si los hubiera)
// export const { /* tus acciones síncronas */ } = matchSlice.actions;

export default matchSlice.reducer;