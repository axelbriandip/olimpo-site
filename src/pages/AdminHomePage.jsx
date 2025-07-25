// src/pages/AdminHomePage.jsx
import React, { useState, useEffect } from 'react';
import IdentityForm from '../components/admin/IdentityForm';
import MonthlyPlayerForm from '../components/admin/MonthlyPlayerForm';
import TestimonialForm from '../components/admin/TestimonialForm';
import SponsorForm from '../components/admin/SponsorForm'; // <--- NUEVA IMPORTACIÓN

import identityService from '../services/identity.service';
import monthlyPlayerService from '../services/monthlyPlayer.service';
import testimonialService from '../services/testimonial.service';
import sponsorService from '../services/sponsor.service'; // <--- NUEVA IMPORTACIÓN

const AdminHomePage = () => {
    // --- Estados para la gestión de IDENTIDAD ---
    const [identityData, setIdentityData] = useState(null);
    const [loadingIdentity, setLoadingIdentity] = useState(false);
    const [errorIdentity, setErrorIdentity] = useState(null);

    // --- Estados para la gestión de JUGADORES DEL MES ---
    const [monthlyPlayers, setMonthlyPlayers] = useState([]);
    const [loadingMonthlyPlayers, setLoadingMonthlyPlayers] = useState(false);
    const [errorMonthlyPlayers, setErrorMonthlyPlayers] = useState(null);
    const [showMonthlyPlayerForm, setShowMonthlyPlayerForm] = useState(false);
    const [selectedMonthlyPlayer, setSelectedMonthlyPlayer] = useState(null);

    // --- Estados para la gestión de TESTIMONIOS ---
    const [testimonials, setTestimonials] = useState([]);
    const [loadingTestimonials, setLoadingTestimonials] = useState(false);
    const [errorTestimonials, setErrorTestimonials] = useState(null);
    const [showTestimonialForm, setShowTestimonialForm] = useState(false);
    const [selectedTestimonial, setSelectedTestimonial] = useState(null);

    // --- Estados para la gestión de SPONSORS --- <--- NUEVOS ESTADOS
    const [sponsors, setSponsors] = useState([]);
    const [loadingSponsors, setLoadingSponsors] = useState(false);
    const [errorSponsors, setErrorSponsors] = useState(null);
    const [showSponsorForm, setShowSponsorForm] = useState(false);
    const [selectedSponsor, setSelectedSponsor] = useState(null);

    // --- Mensajes generales ---
    const [message, setMessage] = useState(null);

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
            setTestimonials([]);
            setErrorTestimonials(err.response?.data?.message || "No se pudieron cargar los testimonios.");
        } finally {
            setLoadingTestimonials(false);
        }
    };

    const fetchSponsors = async () => { // <--- NUEVA FUNCIÓN DE CARGA
        setLoadingSponsors(true);
        setErrorSponsors(null);
        try {
            const data = await sponsorService.getAllSponsors();
            setSponsors(data);
        } catch (err) {
            console.error("Error al cargar sponsors:", err);
            setSponsors([]);
            setErrorSponsors(err.response?.data?.message || "No se pudieron cargar los sponsors.");
        } finally {
            setLoadingSponsors(false);
        }
    };

    // Cargar todos los datos al inicio
    useEffect(() => {
        fetchIdentity();
        fetchMonthlyPlayers();
        fetchTestimonials();
        fetchSponsors(); // <--- LLAMADA A LA NUEVA FUNCIÓN DE CARGA
    }, []);

    // --- Callbacks para guardar datos ---
    const handleIdentitySaveSuccess = () => {
        setMessage("¡Identidad del club guardada exitosamente!");
        fetchIdentity();
    };

    const handleMonthlyPlayerSaveSuccess = () => {
        setMessage("¡Jugador del mes guardado exitosamente!");
        fetchMonthlyPlayers();
    };

    const handleTestimonialSaveSuccess = () => {
        setMessage("¡Testimonio guardado exitosamente!");
        fetchTestimonials();
    };

    const handleSponsorSaveSuccess = () => { // <--- NUEVO CALLBACK
        setMessage("¡Sponsor guardado exitosamente!");
        setShowSponsorForm(false);
        setSelectedSponsor(null);
        fetchSponsors();
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

    const handleSoftDeleteSponsor = async (id) => { // <--- NUEVA FUNCIÓN DE SOFT DELETE
        if (window.confirm("¿Estás seguro de que quieres desactivar este sponsor?")) {
            try {
                await sponsorService.softDeleteSponsor(id);
                setMessage("Sponsor desactivado exitosamente.");
                fetchSponsors();
            } catch (err) {
                console.error("Error al desactivar sponsor:", err);
                setErrorSponsors(err.response?.data?.message || "Error al desactivar el sponsor.");
            }
        }
    };

    // --- Funciones para mostrar/ocultar formularios (modales) ---
    const handleCloseMonthlyPlayerForm = () => {
        setShowMonthlyPlayerForm(false);
        setSelectedMonthlyPlayer(null);
        setMessage(null);
    };

    const handleCreateMonthlyPlayer = () => {
        setSelectedMonthlyPlayer(null);
        setShowMonthlyPlayerForm(true);
    };

    const handleEditMonthlyPlayer = (player) => {
        setSelectedMonthlyPlayer(player);
        setShowMonthlyPlayerForm(true);
    };

    const handleCloseTestimonialForm = () => {
        setShowTestimonialForm(false);
        setSelectedTestimonial(null);
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

    const handleCloseSponsorForm = () => { // <--- NUEVA FUNCIÓN PARA CERRAR FORMULARIO
        setShowSponsorForm(false);
        setSelectedSponsor(null);
        setMessage(null);
    };

    const handleCreateSponsor = () => { // <--- NUEVA FUNCIÓN PARA CREAR
        setSelectedSponsor(null);
        setShowSponsorForm(true);
    };

    const handleEditSponsor = (sponsorItem) => { // <--- NUEVA FUNCIÓN PARA EDITAR
        setSelectedSponsor(sponsorItem);
        setShowSponsorForm(true);
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
                                            <td>{testimonial.authorName}</td>
                                            <td>
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

            {/* Sección de Sponsors */} {/* <--- NUEVA SECCIÓN */}
            <div className="admin-section">
                <h2>Gestión de Sponsors</h2>
                {errorSponsors && <p className="error-message">{errorSponsors}</p>}
                <button onClick={handleCreateSponsor} className="admin-button add-button">
                    Añadir Nuevo Sponsor
                </button>

                {showSponsorForm && (
                    <div className="admin-form-overlay">
                        <div className="admin-form-content">
                            <SponsorForm
                                sponsor={selectedSponsor}
                                onClose={handleCloseSponsorForm}
                                onSave={handleSponsorSaveSuccess}
                            />
                        </div>
                    </div>
                )}

                {!showSponsorForm && (
                    <div className="admin-list-section">
                        <h3>Listado de Sponsors</h3>
                        {loadingSponsors ? (
                            <p>Cargando sponsors...</p>
                        ) : sponsors.length === 0 ? (
                            <p>No hay sponsors cargados en el sistema.</p>
                        ) : (
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Nivel</th>
                                        <th>Activo</th>
                                        <th>Orden</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sponsors.map((sponsorItem) => (
                                        <tr key={sponsorItem.id}>
                                            <td>{sponsorItem.id}</td>
                                            <td>{sponsorItem.name}</td>
                                            <td>{sponsorItem.level || 'N/A'}</td>
                                            <td>{sponsorItem.is_active ? 'Sí' : 'No'}</td>
                                            <td>{sponsorItem.order !== null ? sponsorItem.order : 'N/A'}</td>
                                            <td className="admin-actions">
                                                <button onClick={() => handleEditSponsor(sponsorItem)} className="admin-button edit-button">Editar</button>
                                                {sponsorItem.is_active && (
                                                    <button onClick={() => handleSoftDeleteSponsor(sponsorItem.id)} className="admin-button delete-button">Desactivar</button>
                                                )}
                                                {!sponsorItem.is_active && (
                                                    <button className="admin-button activate-button" disabled>Ya Inactivo</button>
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
