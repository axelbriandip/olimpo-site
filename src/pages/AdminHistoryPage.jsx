// src/pages/AdminHistoryPage.jsx
import React, { useState, useEffect } from 'react';
import HistoryEventForm from '../components/admin/HistoryEventForm';
import HistorySubsectionForm from '../components/admin/HistorySubsectionForm'; // <--- ESTO DEBE ESTAR IMPORTADO Y DESCOMENTADO
import historyService from '../services/history.service';

const AdminHistoryPage = () => {
    const [showEventForm, setShowEventForm] = useState(false);
    const [showSubsectionForm, setShowSubsectionForm] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null); // Para editar un evento
    const [selectedSubsection, setSelectedSubsection] = useState(null); // Para editar una subsección
    const [historyEventsList, setHistoryEventsList] = useState([]);
    const [loadingHistory, setLoadingHistory] = useState(false);
    const [historyError, setHistoryError] = useState(null);
    const [message, setMessage] = useState(null);

    const fetchHistoryEvents = async () => {
        setLoadingHistory(true);
        setHistoryError(null);
        setMessage(null);
        try {
            // Asume que historyService.getAllHistoryEvents trae eventos con sus subsecciones
            const data = await historyService.getAllHistoryEvents();
            setHistoryEventsList(data);
        } catch (err) {
            console.error("Error al cargar la historia:", err);
            setHistoryError(err.response?.data?.message || "No se pudo cargar la historia.");
        } finally {
            setLoadingHistory(false);
        }
    };

    useEffect(() => {
        fetchHistoryEvents();
    }, []);

    const handleEventSaveSuccess = () => {
        setShowEventForm(false);
        setSelectedEvent(null);
        fetchHistoryEvents();
        setMessage("¡Evento histórico guardado exitosamente!");
    };

    const handleCloseEventForm = () => {
        setShowEventForm(false);
        setSelectedEvent(null);
        setMessage(null);
    };

    const handleCreateEvent = () => {
        setSelectedEvent(null);
        setShowEventForm(true);
    };

    const handleEditEvent = (eventItem) => {
        setSelectedEvent(eventItem);
        setShowEventForm(true);
    };

    const handleSubsectionSaveSuccess = () => {
        setShowSubsectionForm(false);
        setSelectedSubsection(null);
        fetchHistoryEvents(); // Recargar todo el historial para ver la subsección actualizada
        setMessage("¡Subsección histórica guardada exitosamente!");
    };

    const handleCloseSubsectionForm = () => {
        setShowSubsectionForm(false);
        setSelectedSubsection(null);
        setMessage(null);
    };

    const handleAddSubsection = (eventId) => {
        setSelectedEvent({ id: eventId }); // Pasa solo el ID del evento al que se asociará la subsección
        setSelectedSubsection(null); // Asegura que no haya ninguna subsección precargada
        setShowSubsectionForm(true);
    };

    const handleEditSubsection = (subsectionItem) => {
        setSelectedSubsection(subsectionItem);
        setShowSubsectionForm(true);
    };

    const handleSoftDeleteEvent = async (id) => {
        if (window.confirm("¿Estás seguro de que quieres desactivar este evento histórico?")) {
            try {
                await historyService.softDeleteHistoryEvent(id);
                setMessage("Evento histórico desactivado exitosamente.");
                fetchHistoryEvents();
            } catch (err) {
                console.error("Error al desactivar evento histórico:", err);
                setHistoryError(err.response?.data?.message || "Error al desactivar el evento.");
            }
        }
    };

    const handleSoftDeleteSubsection = async (id) => {
        if (window.confirm("¿Estás seguro de que quieres desactivar esta subsección histórica?")) {
            try {
                await historyService.softDeleteHistorySubsection(id);
                setMessage("Subsección histórica desactivada exitosamente.");
                fetchHistoryEvents();
            } catch (err) {
                console.error("Error al desactivar subsección histórica:", err);
                setHistoryError(err.response?.data?.message || "Error al desactivar la subsección.");
            }
        }
    };

    return (
        <div className="admin-page-container">
            <h1>Administración de Historia</h1>

            {message && <p className="success-message">{message}</p>}
            {historyError && <p className="error-message">{historyError}</p>}

            <button onClick={handleCreateEvent} className="admin-button add-button">
                Añadir Nuevo Evento Histórico
            </button>

            {/* Formulario para Eventos Históricos */}
            {showEventForm && (
                <div className="admin-form-overlay">
                    <div className="admin-form-content">
                        <HistoryEventForm
                            historyEvent={selectedEvent}
                            onClose={handleCloseEventForm}
                            onSave={handleEventSaveSuccess}
                        />
                    </div>
                </div>
            )}

            {/* Formulario para Subsecciones Históricas */}
            {showSubsectionForm && (
                <div className="admin-form-overlay">
                    <div className="admin-form-content">
                        <HistorySubsectionForm // <--- ESTO ES LO QUE ESTABA COMENTADO Y AHORA ESTÁ ACTIVO
                            historyEventId={selectedEvent?.id} // Pasa el ID del evento padre
                            historySubsection={selectedSubsection}
                            onClose={handleCloseSubsectionForm}
                            onSave={handleSubsectionSaveSuccess}
                        />
                    </div>
                </div>
            )}

            {/* Lista de Eventos Históricos y Subsecciones */}
            {!showEventForm && !showSubsectionForm && (
                <div className="admin-list-section">
                    <h2>Eventos Históricos</h2>
                    {loadingHistory ? (
                        <p>Cargando historia...</p>
                    ) : historyEventsList.length === 0 ? (
                        <p>No hay eventos históricos cargados en el sistema.</p>
                    ) : (
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Título</th>
                                    <th>Año</th>
                                    <th>Activo</th>
                                    <th>Acciones Evento</th>
                                    <th>Subsecciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {historyEventsList.map((eventItem) => (
                                    <React.Fragment key={eventItem.id}>
                                        <tr>
                                            <td>{eventItem.id}</td>
                                            <td>{eventItem.title}</td>
                                            <td>{eventItem.year}</td>
                                            <td>{eventItem.is_active ? 'Sí' : 'No'}</td>
                                            <td className="admin-actions">
                                                <button onClick={() => handleEditEvent(eventItem)} className="admin-button edit-button">Editar</button>
                                                {eventItem.is_active && (
                                                    <button onClick={() => handleSoftDeleteEvent(eventItem.id)} className="admin-button delete-button">Desactivar</button>
                                                )}
                                                {!eventItem.is_active && (
                                                    <button className="admin-button activate-button" disabled>Inactivo</button>
                                                )}
                                                <button onClick={() => handleAddSubsection(eventItem.id)} className="admin-button add-button small-button">Añadir Subsección</button>
                                            </td>
                                            <td>
                                                {eventItem.subsections && eventItem.subsections.length > 0 ? (
                                                    <ul>
                                                        {eventItem.subsections.map(sub => (
                                                            <li key={sub.id}>
                                                                {sub.title} ({sub.year})
                                                                <button onClick={() => handleEditSubsection(sub)} className="admin-button edit-button small-button">Edit</button>
                                                                {sub.is_active && (
                                                                    <button onClick={() => handleSoftDeleteSubsection(sub.id)} className="admin-button delete-button small-button">Desactivar</button>
                                                                )}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    'Ninguna'
                                                )}
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminHistoryPage;
