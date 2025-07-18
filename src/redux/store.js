// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'; // Importaremos este slice más adelante

export const store = configureStore({
    reducer: {
        auth: authReducer, // Aquí montaremos nuestro reducer de autenticación
        // Otros reducers (slices) irán aquí a medida que los crees
    },
    // Opcional: middlewares personalizados o configuración adicional
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(myCustomMiddleware),
    // devTools: process.env.NODE_ENV !== 'production', // Habilitar Redux DevTools en desarrollo
});