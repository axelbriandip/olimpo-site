import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = process.env.NODE_ENV === 'production'
    ? 'https://olimpo-rxz7.onrender.com'
    : 'http://localhost:3000/api';

// 👉 Thunk para obtener jugadores
export const fetchPlayers = createAsyncThunk("players/fetchPlayers", async (_, thunkAPI) => {
    try {
        const res = await axios.get(`${API_BASE_URL}/players`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
});

const playerSlice = createSlice({
    name: "players",
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPlayers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPlayers.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchPlayers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error fetching players";
            });
    },
});

export default playerSlice.reducer;