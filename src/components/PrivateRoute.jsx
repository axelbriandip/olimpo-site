// src/components/PrivateRoute.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
    const location = useLocation(); // Para guardar la ruta a la que se intentó acceder

    // Si aún está cargando la autenticación (ej. al refrescar la página), puedes mostrar un spinner
    if (isLoading) {
        return <div>Cargando autenticación...</div>; // O tu componente de spinner
    }

    // Si no está autenticado, redirige a la página de login
    // `state: { from: location }` es para que, una vez logueado, pueda volver a la página que intentó acceder
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Si está autenticado, renderiza los componentes hijos (la ruta protegida)
    return children;
};

export default PrivateRoute;