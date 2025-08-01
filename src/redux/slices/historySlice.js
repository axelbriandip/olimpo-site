import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; // Asegúrate de tener axios instalado: npm install axios

// Define tu URL base de la API
const API_BASE_URL = 'https://olimpo-rxz7.onrender.com'; // Ajusta esto a la URL de tu backend

// Thunk asíncrono para cargar los eventos históricos
export const fetchHistoryEvents = createAsyncThunk(
    'history/fetchHistoryEvents',
    async (_, { rejectWithValue }) => {
        try {
            // Usamos el endpoint para eventos históricos, que ahora incluye subsecciones
            const response = await axios.get(`${API_BASE_URL}/history-events`);
            return response.data;
        } catch (error) {
            // Manejo de errores
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const historySlice = createSlice({
    name: 'history',
    initialState: {
        events: [],
        loading: 'idle', // 'idle' | 'pending' | 'succeeded' | 'failed'
        error: null,
    },
    reducers: {
        // Aquí puedes añadir reducers síncronos si los necesitas
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHistoryEvents.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(fetchHistoryEvents.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                // Los eventos ya vienen ordenados correctamente del backend
                state.events = action.payload;
            })
            .addCase(fetchHistoryEvents.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.payload;
            });
    },
});

export default historySlice.reducer;