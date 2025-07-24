// src/pages/AdminDashboard.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice'; // Importa la acción logout
import { useNavigate, Link } from 'react-router-dom'; // Usamos Link en lugar de <a> para navegación interna

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
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
                    <li>
                        <Link to="/admin/news-manager" style={{ textDecoration: 'none', color: '#007bff', padding: '10px 15px', border: '1px solid #007bff', borderRadius: '5px', transition: 'background-color 0.2s, color 0.2s' }}>
                            Gestionar Noticias
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/players" style={{ textDecoration: 'none', color: '#007bff', padding: '10px 15px', border: '1px solid #007bff', borderRadius: '5px', transition: 'background-color 0.2s, color 0.2s' }}>
                            Gestionar Jugadores
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/matches" style={{ textDecoration: 'none', color: '#007bff', padding: '10px 15px', border: '1px solid #007bff', borderRadius: '5px', transition: 'background-color 0.2s, color 0.2s' }}>
                            Gestionar Partidos
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/history" style={{ textDecoration: 'none', color: '#007bff', padding: '10px 15px', border: '1px solid #007bff', borderRadius: '5px', transition: 'background-color 0.2s, color 0.2s' }}>
                            Gestionar Historia
                        </Link>
                    </li>
                    {/* Puedes añadir más enlaces aquí */}
                </ul>
            </nav>

            <button
                onClick={handleLogout}
                style={{ padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '20px' }}
            >
                Cerrar Sesión
            </button>
        </div>
    );
};

export default AdminDashboard;
