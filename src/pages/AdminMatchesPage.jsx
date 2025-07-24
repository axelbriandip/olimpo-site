// src/pages/AdminMatchesPage.jsx
import React, { useState, useEffect } from 'react';
import MatchForm from '../components/admin/MatchForm'; // Necesitarás crear este componente
import matchService from '../services/match.service'; // Necesitarás crear este servicio

const AdminMatchesPage = () => {
    const [showForm, setShowForm] = useState(false);
    const [selectedMatch, setSelectedMatch] = useState(null); // Para editar un partido existente
    const [matchesList, setMatchesList] = useState([]);
    const [loadingMatches, setLoadingMatches] = useState(false);
    const [matchesError, setMatchesError] = useState(null);
    const [message, setMessage] = useState(null); // Para mensajes de éxito/error al usuario

    // Función para cargar los partidos desde el backend
    const fetchMatches = async () => {
        setLoadingMatches(true);
        setMatchesError(null);
        setMessage(null);
        try {
            const data = await matchService.getAllMatches(); // Asume que este servicio existe
            setMatchesList(data);
        } catch (err) {
            console.error("Error al cargar la lista de partidos:", err);
            setMatchesError(err.response?.data?.message || "No se pudieron cargar los partidos.");
        } finally {
            setLoadingMatches(false);
        }
    };

    // Carga los partidos al montar el componente
    useEffect(() => {
        fetchMatches();
    }, []);

    // Función que se pasa a MatchForm y se llama cuando se guarda/actualiza un partido
    const handleSaveSuccess = () => {
        setShowForm(false); // Cierra el formulario
        setSelectedMatch(null); // Limpia el partido seleccionado
        fetchMatches(); // Recarga la lista de partidos para ver los cambios
        setMessage("¡Partido guardado exitosamente!"); // Muestra un mensaje de éxito
    };

    // Función para cerrar el formulario sin guardar
    const handleCloseForm = () => {
        setShowForm(false);
        setSelectedMatch(null); // Limpia el partido seleccionado al cerrar
        setMessage(null); // Limpia cualquier mensaje
    };

    // Función para abrir el formulario en modo "crear nuevo partido"
    const handleCreateMatch = () => {
        setSelectedMatch(null); // Asegura que no haya ningún partido precargado
        setShowForm(true);
    };

    // Función para abrir el formulario en modo "editar partido existente"
    const handleEditMatch = (matchItem) => {
        setSelectedMatch(matchItem); // Pasa el partido a editar
        setShowForm(true);
    };

    // Función para manejar el borrado suave de un partido
    const handleSoftDeleteMatch = async (id) => {
        if (window.confirm("¿Estás seguro de que quieres desactivar este partido?")) {
            try {
                await matchService.softDeleteMatch(id); // Asume que este servicio existe
                setMessage("Partido desactivado exitosamente.");
                fetchMatches(); // Recargar la lista
            } catch (err) {
                console.error("Error al desactivar partido:", err);
                setMatchesError(err.response?.data?.message || "Error al desactivar el partido.");
            }
        }
    };

    return (
        <div className="admin-page-container">
            <h1>Administración de Partidos</h1>

            {message && <p className="success-message">{message}</p>}
            {matchesError && <p className="error-message">{matchesError}</p>}

            <button onClick={handleCreateMatch} className="admin-button add-button">
                Añadir Nuevo Partido
            </button>

            {showForm && (
                <div className="admin-form-overlay"> {/* Esto podría ser un modal */}
                    <div className="admin-form-content">
                        <MatchForm
                            match={selectedMatch} // Pasa el partido a editar (o null para crear)
                            onClose={handleCloseForm} // Callback para cerrar el formulario
                            onSave={handleSaveSuccess} // Callback cuando se guarda exitosamente
                        />
                    </div>
                </div>
            )}

            {!showForm && ( // Muestra la lista solo si el formulario no está abierto
                <div className="admin-list-section">
                    <h2>Listado de Partidos</h2>
                    {loadingMatches ? (
                        <p>Cargando partidos...</p>
                    ) : matchesList.length === 0 ? (
                        <p>No hay partidos cargados en el sistema.</p>
                    ) : (
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Fecha/Hora</th>
                                    <th>Categoría</th>
                                    <th>Local</th>
                                    <th>Visitante</th>
                                    <th>Resultado</th>
                                    <th>Estado</th>
                                    <th>Activo</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {matchesList.map((matchItem) => (
                                    <tr key={matchItem.id}>
                                        <td>{matchItem.id}</td>
                                        <td>
                                            {matchItem.dateTime ?
                                                new Date(matchItem.dateTime).toLocaleString('es-AR', {
                                                    day: '2-digit', month: '2-digit', year: 'numeric',
                                                    hour: '2-digit', minute: '2-digit'
                                                })
                                                : 'A definir'}
                                        </td>
                                        <td>{matchItem.category}</td>
                                        <td>{matchItem.homeTeam?.name || 'N/A'}</td>
                                        <td>{matchItem.awayTeam?.name || 'N/A'}</td>
                                        <td>
                                            {matchItem.homeTeamScore !== null && matchItem.awayTeamScore !== null
                                                ? `${matchItem.homeTeamScore}-${matchItem.awayTeamScore}`
                                                : 'N/A'}
                                        </td>
                                        <td>{matchItem.status}</td>
                                        <td>{matchItem.is_active ? 'Sí' : 'No'}</td>
                                        <td className="admin-actions">
                                            <button onClick={() => handleEditMatch(matchItem)} className="admin-button edit-button">Editar</button>
                                            {matchItem.is_active && (
                                                <button onClick={() => handleSoftDeleteMatch(matchItem.id)} className="admin-button delete-button">Desactivar</button>
                                            )}
                                            {!matchItem.is_active && (
                                                <button className="admin-button activate-button" disabled>Inactivo</button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminMatchesPage;
