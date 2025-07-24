// src/pages/AdminHomePage.jsx
import React, { useState, useEffect } from 'react';
import IdentityForm from '../components/admin/IdentityForm';
import MonthlyPlayerForm from '../components/admin/MonthlyPlayerForm';
import TestimonialForm from '../components/admin/TestimonialForm';

import identityService from '../services/identity.service';
import monthlyPlayerService from '../services/monthlyPlayer.service';
import testimonialService from '../services/testimonial.service';

const AdminHomePage = () => {
    const [identityData, setIdentityData] = useState(null);
    const [monthlyPlayers, setMonthlyPlayers] = useState([]);
    const [testimonials, setTestimonials] = useState([]);

    const [loadingIdentity, setLoadingIdentity] = useState(false);
    const [loadingMonthlyPlayers, setLoadingMonthlyPlayers] = useState(false);
    const [loadingTestimonials, setLoadingTestimonials] = useState(false);

    const [errorIdentity, setErrorIdentity] = useState(null);
    const [errorMonthlyPlayers, setErrorMonthlyPlayers] = useState(null);
    const [errorTestimonials, setErrorTestimonials] = useState(null);

    const [message, setMessage] = useState(null); // Mensajes generales de éxito

    // --- Funciones de Carga de Datos ---
    const fetchIdentity = async () => {
        setLoadingIdentity(true);
        setErrorIdentity(null);
        try {
            const data = await identityService.getIdentity();
            setIdentityData(data);
        } catch (err) {
            console.error("Error al cargar identidad:", err);
            setErrorIdentity(err.response?.data?.message || "No se pudo cargar la identidad.");
        } finally {
            setLoadingIdentity(false);
        }
    };

    const fetchMonthlyPlayers = async () => {
        setLoadingMonthlyPlayers(true);
        setErrorMonthlyPlayers(null);
        try {
            const data = await monthlyPlayerService.getAllMonthlyPlayers();
            setMonthlyPlayers(data);
        } catch (err) {
            console.error("Error al cargar jugadores del mes:", err);
            setErrorMonthlyPlayers(err.response?.data?.message || "No se pudieron cargar los jugadores del mes.");
        } finally {
            setLoadingMonthlyPlayers(false);
        }
    };

    const fetchTestimonials = async () => {
        setLoadingTestimonials(true);
        setErrorTestimonials(null);
        try {
            const data = await testimonialService.getAllTestimonials();
            setTestimonials(data);
        } catch (err) {
            console.error("Error al cargar testimonios:", err);
            setTestimonials([]); // Asegura que sea un array vacío si hay error
            setErrorTestimonials(err.response?.data?.message || "No se pudieron cargar los testimonios.");
        } finally {
            setLoadingTestimonials(false);
        }
    };

    // Cargar todos los datos al inicio
    useEffect(() => {
        fetchIdentity();
        fetchMonthlyPlayers();
        fetchTestimonials();
    }, []);

    // --- Callbacks para guardar datos ---
    const handleIdentitySaveSuccess = () => {
        setMessage("¡Identidad del club guardada exitosamente!");
        fetchIdentity(); // Recargar la identidad
    };

    const handleMonthlyPlayerSaveSuccess = () => {
        setMessage("¡Jugador del mes guardado exitosamente!");
        fetchMonthlyPlayers(); // Recargar la lista de jugadores del mes
    };

    const handleTestimonialSaveSuccess = () => {
        setMessage("¡Testimonio guardado exitosamente!");
        fetchTestimonials(); // Recargar la lista de testimonios
    };

    // --- Funciones para borrar (soft delete) ---
    const handleSoftDeleteMonthlyPlayer = async (id) => {
        if (window.confirm("¿Estás seguro de que quieres desactivar este Jugador del Mes?")) {
            try {
                await monthlyPlayerService.softDeleteMonthlyPlayer(id);
                setMessage("Jugador del mes desactivado exitosamente.");
                fetchMonthlyPlayers();
            } catch (err) {
                console.error("Error al desactivar jugador del mes:", err);
                setErrorMonthlyPlayers(err.response?.data?.message || "Error al desactivar el jugador del mes.");
            }
        }
    };

    const handleSoftDeleteTestimonial = async (id) => {
        if (window.confirm("¿Estás seguro de que quieres desactivar este testimonio?")) {
            try {
                await testimonialService.softDeleteTestimonial(id);
                setMessage("Testimonio desactivado exitosamente.");
                fetchTestimonials();
            } catch (err) {
                console.error("Error al desactivar testimonio:", err);
                setErrorTestimonials(err.response?.data?.message || "Error al desactivar el testimonio.");
            }
        }
    };

    // --- Estados para mostrar/ocultar formularios individuales (si usas modales) ---
    const [showMonthlyPlayerForm, setShowMonthlyPlayerForm] = useState(false);
    const [selectedMonthlyPlayer, setSelectedMonthlyPlayer] = useState(null);

    const [showTestimonialForm, setShowTestimonialForm] = useState(false);
    const [selectedTestimonial, setSelectedTestimonial] = useState(null);


    const handleCreateMonthlyPlayer = () => {
        setSelectedMonthlyPlayer(null);
        setShowMonthlyPlayerForm(true);
    };

    const handleEditMonthlyPlayer = (player) => {
        setSelectedMonthlyPlayer(player);
        setShowMonthlyPlayerForm(true);
    };

    const handleCloseMonthlyPlayerForm = () => {
        setShowMonthlyPlayerForm(false);
        setSelectedMonthlyPlayer(null);
        setMessage(null);
    };

    const handleCreateTestimonial = () => {
        setSelectedTestimonial(null);
        setShowTestimonialForm(true);
    };

    const handleEditTestimonial = (testimonial) => {
        setSelectedTestimonial(testimonial);
        setShowTestimonialForm(true);
    };

    const handleCloseTestimonialForm = () => {
        setShowTestimonialForm(false);
        setSelectedTestimonial(null);
        setMessage(null);
    };


    return (
        <div className="admin-page-container">
            <h1>Administración de la Página de Inicio</h1>

            {message && <p className="success-message">{message}</p>}

            {/* Sección de Identidad del Club */}
            <div className="admin-section">
                <h2>Identidad del Club</h2>
                {errorIdentity && <p className="error-message">{errorIdentity}</p>}
                {loadingIdentity ? (
                    <p>Cargando identidad...</p>
                ) : (
                    <IdentityForm
                        identity={identityData}
                        onSave={handleIdentitySaveSuccess}
                    // No hay onClose aquí porque es un formulario siempre visible
                    />
                )}
            </div>

            {/* Sección de Jugadores del Mes */}
            <div className="admin-section">
                <h2>Jugadores del Mes</h2>
                {errorMonthlyPlayers && <p className="error-message">{errorMonthlyPlayers}</p>}
                <button onClick={handleCreateMonthlyPlayer} className="admin-button add-button">
                    Añadir Jugador del Mes
                </button>

                {showMonthlyPlayerForm && (
                    <div className="admin-form-overlay">
                        <div className="admin-form-content">
                            <MonthlyPlayerForm
                                monthlyPlayer={selectedMonthlyPlayer}
                                onClose={handleCloseMonthlyPlayerForm}
                                onSave={handleMonthlyPlayerSaveSuccess}
                            />
                        </div>
                    </div>
                )}

                {!showMonthlyPlayerForm && (
                    <div className="admin-list-section">
                        {loadingMonthlyPlayers ? (
                            <p>Cargando jugadores del mes...</p>
                        ) : monthlyPlayers.length === 0 ? (
                            <p>No hay jugadores del mes cargados.</p>
                        ) : (
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Jugador</th>
                                        <th>Mes/Año</th>
                                        <th>Activo</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {monthlyPlayers.map((player) => (
                                        <tr key={player.id}>
                                            <td>{player.id}</td>
                                            {/* Asegúrate de que player.player exista antes de acceder a firstName/lastName */}
                                            <td>{player.player?.firstName} {player.player?.lastName || 'N/A'}</td>
                                            <td>{player.month}/{player.year}</td>
                                            <td>{player.is_active ? 'Sí' : 'No'}</td>
                                            <td className="admin-actions">
                                                <button onClick={() => handleEditMonthlyPlayer(player)} className="admin-button edit-button">Editar</button>
                                                {player.is_active && (
                                                    <button onClick={() => handleSoftDeleteMonthlyPlayer(player.id)} className="admin-button delete-button">Desactivar</button>
                                                )}
                                                {!player.is_active && (
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

            {/* Sección de Testimonios */}
            <div className="admin-section">
                <h2>Testimonios</h2>
                {errorTestimonials && <p className="error-message">{errorTestimonials}</p>}
                <button onClick={handleCreateTestimonial} className="admin-button add-button">
                    Añadir Testimonio
                </button>

                {showTestimonialForm && (
                    <div className="admin-form-overlay">
                        <div className="admin-form-content">
                            <TestimonialForm
                                testimonial={selectedTestimonial}
                                onClose={handleCloseTestimonialForm}
                                onSave={handleTestimonialSaveSuccess}
                            />
                        </div>
                    </div>
                )}

                {!showTestimonialForm && (
                    <div className="admin-list-section">
                        {loadingTestimonials ? (
                            <p>Cargando testimonios...</p>
                        ) : testimonials.length === 0 ? (
                            <p>No hay testimonios cargados.</p>
                        ) : (
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Autor</th>
                                        <th>Contenido</th>
                                        <th>Activo</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {testimonials.map((testimonial) => (
                                        <tr key={testimonial.id}>
                                            <td>{testimonial.id}</td>
                                            <td>{testimonial.authorName}</td> {/* Usar authorName del modelo */}
                                            <td>
                                                {/* CORRECCIÓN AQUÍ: Asegurarse de que content sea una cadena antes de substring */}
                                                {typeof testimonial.text === 'string' && testimonial.text.length > 0
                                                    ? `${testimonial.text.substring(0, 50)}${testimonial.text.length > 50 ? '...' : ''}`
                                                    : 'N/A'}
                                            </td>
                                            <td>{testimonial.is_active ? 'Sí' : 'No'}</td>
                                            <td className="admin-actions">
                                                <button onClick={() => handleEditTestimonial(testimonial)} className="admin-button edit-button">Editar</button>
                                                {testimonial.is_active && (
                                                    <button onClick={() => handleSoftDeleteTestimonial(testimonial.id)} className="admin-button delete-button">Desactivar</button>
                                                )}
                                                {!testimonial.is_active && (
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
        </div>
    );
};

export default AdminHomePage;
