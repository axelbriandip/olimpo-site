// src/pages/LoginPage.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, clearError } from '../redux/slices/authSlice';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isAuthenticated, isLoading, error } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/admin'); // Redirige al panel de administración si ya está logueado
        }
        // Limpia cualquier error previo cuando el componente se monta
        dispatch(clearError());
    }, [isAuthenticated, navigate, dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            alert('Por favor, ingresa el nombre de usuario y la contraseña.');
            return;
        }
        dispatch(login({ username, password }));
    };

    return (
        <div className="login-container">
            <h2 className="login-title">Acceso al Panel de Administración</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                    <label htmlFor="username">Usuario:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="form-input"
                        disabled={isLoading}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-input"
                        disabled={isLoading}
                    />
                </div>
                {error && <p className="error-message">Error: {error}</p>}
                <button type="submit" className="login-button" disabled={isLoading}>
                    {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                </button>
            </form>
            <p className="login-note">
                Este es un acceso exclusivo para administradores del Club Olimpo.
            </p>
        </div>
    );
};

export default LoginPage;