// src/pages/AdminPlayersPage.jsx
import React, { useState, useEffect } from 'react';
import playerService from '../services/player.service';
import PlayerForm from '../components/admin/PlayerForm';

const AdminPlayersPage = () => {
    const [players, setPlayers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [editingPlayer, setEditingPlayer] = useState(null);
    const [message, setMessage] = useState(null);

    const fetchPlayers = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await playerService.getAllPlayers();
            setPlayers(data);
        } catch (err) {
            setError(err.message || 'Error al cargar los jugadores.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPlayers();
    }, []);

    const handleEdit = (player) => {
        setEditingPlayer(player);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres desactivar este jugador?')) {
            try {
                await playerService.softDeletePlayer(id);
                setMessage({ type: 'success', text: 'Jugador desactivado exitosamente.' });
                fetchPlayers();
            } catch (err) {
                setMessage({ type: 'error', text: err.message || 'Error al desactivar el jugador.' });
            }
        }
    };

    const handleFormSubmit = () => {
        setShowForm(false);
        setEditingPlayer(null);
        setMessage({ type: 'success', text: 'Jugador guardado exitosamente.' });
        fetchPlayers();
    };

    return (
        <div className="admin-players-container">
            <div className="admin-players-header">
                <h1 className="admin-players-title">Gestión de Jugadores</h1>
                <button className="admin-players-add-button" onClick={() => { setEditingPlayer(null); setShowForm(true); }}>
                    Añadir Nuevo Jugador
                </button>
            </div>

            {message && (
                <div className={`admin-players-message ${message.type}`}>
                    {message.text}
                </div>
            )}

            {showForm && (
                <div className="admin-players-form-container">
                    <PlayerForm
                        player={editingPlayer}
                        onClose={() => setShowForm(false)}
                        onSave={handleFormSubmit}
                    />
                </div>
            )}

            {isLoading ? (
                <p>Cargando jugadores...</p>
            ) : error ? (
                <p className="admin-players-error">{error}</p>
            ) : players.length === 0 ? (
                <p>No hay jugadores registrados. ¡Añade el primero!</p>
            ) : (
                <table className="admin-players-table">
                    <thead>
                        <tr>
                            <th>Foto</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Posición</th>
                            <th>Número</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.map((player) => (
                            <tr key={player.id}>
                                <td data-label="Foto:">
                                    {player.photoUrl ? (
                                        <img src={player.photoUrl} alt={`${player.firstName} ${player.lastName}`} className="admin-players-photo" />
                                    ) : (
                                        <span>No foto</span>
                                    )}
                                </td>
                                <td data-label="Nombre:">{player.firstName}</td>
                                <td data-label="Apellido:">{player.lastName}</td>
                                <td data-label="Posición:">{player.position}</td>
                                <td data-label="Número:">{player.number || '-'}</td>
                                <td data-label="Estado:">{player.is_active ? 'Activo' : 'Inactivo'}</td>
                                <td data-label="Acciones:">
                                    <div className="admin-players-actions">
                                        <button className="admin-players-edit-button" onClick={() => handleEdit(player)}>Editar</button>
                                        <button className="admin-players-delete-button" onClick={() => handleDelete(player.id)}>Desactivar</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AdminPlayersPage;