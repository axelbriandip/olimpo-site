// src/redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import testimonialReducer from './slices/testimonialSlice';
import playerReducer from './slices/playerSlice';
import historyReducer from './slices/historySlice';
import matchReducer from './slices/matchSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        testimonials: testimonialReducer,
        players: playerReducer,
        history: historyReducer,
        matches: matchReducer,
    },
});