// src/pages/AdminDashboard.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice'; // Importa la acción logout
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout()); // Despacha la acción de logout
        navigate('/login'); // Redirige al login después de desloguearse
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Bienvenido al Panel de Administración, {user ? user.username : 'Admin'}!</h1>
            <p>Aquí podrás gestionar las noticias, jugadores, eventos, etc.</p>

            <nav style={{ margin: '20px 0' }}>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', gap: '15px' }}>
                    <li><a href="/admin/news-manager" style={{ textDecoration: 'none', color: '#007bff' }}>Gestionar Noticias</a></li>
                    <li><a href="/admin/players-manager" style={{ textDecoration: 'none', color: '#007bff' }}>Gestionar Jugadores</a></li>
                    {/* Añade más enlaces a otros gestores aquí */}
                </ul>
            </nav>

            <button
                onClick={handleLogout}
                style={{ padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
                Cerrar Sesión
            </button>
        </div>
    );
};

export default AdminDashboard;