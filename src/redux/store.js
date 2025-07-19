// src/redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import testimonialReducer from './slices/testimonialSlice'; // <--- IMPORTA EL NUEVO SLICE AQUÍ

export const store = configureStore({
    reducer: {
        auth: authReducer,
        testimonials: testimonialReducer, // <--- MONTA EL NUEVO REDUCER AQUÍ
        // Si tienes otros reducers (slices), irán aquí también
    },
    // Opcional: middlewares personalizados o configuración adicional
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(myCustomMiddleware),
    // devTools: process.env.NODE_ENV !== 'production', // Habilitar Redux DevTools en desarrollo
});