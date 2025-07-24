// src/components/admin/MatchForm.jsx
import React, { useState, useEffect } from 'react';
import matchService from '../../services/match.service'; // Asegúrate de que este servicio exista y sea correcto
import teamService from '../../services/team.service'; // Necesitarás este servicio para obtener los equipos

// Opciones predefinidas para campos de selección
const CATEGORIES = ['Primera', 'Reserva', 'Sub17', 'Sub15', 'Sub13', 'Sub11', 'Sub9', 'Sub7'];
const MATCH_TYPES = ['Liga', 'Copa', 'Amistoso', 'Torneo'];
const STATUSES = ['Programado', 'En Curso', 'Finalizado', 'Postergado', 'Cancelado'];

const MatchForm = ({ match, onClose, onSave }) => {
    // Estado inicial para un nuevo partido
    const initialFormData = {
        dateTime: '', // Formato YYYY-MM-DDTHH:mm para input type="datetime-local"
        category: '',
        homeTeamId: '',
        homeTeamScore: '',
        awayTeamId: '',
        awayTeamScore: '',
        location: '',
        matchType: '',
        status: 'Programado', // Por defecto
        round: '',
        highlightsUrl: '',
        liveStreamUrl: '',
        description: '',
        is_active: true,
        metaTitle: '',
        metaDescription: '',
    };

    const [formData, setFormData] = useState(initialFormData);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [teams, setTeams] = useState([]); // Para cargar la lista de equipos

    // Efecto para cargar la lista de equipos
    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const fetchedTeams = await teamService.getAllTeams(); // Asume que teamService existe
                setTeams(fetchedTeams);
            } catch (err) {
                console.error("Error al cargar equipos:", err);
                setError("No se pudieron cargar los equipos.");
            }
        };
        fetchTeams();
    }, []);

    // Efecto para cargar datos del partido si estamos editando
    useEffect(() => {
        if (match) {
            // Pre-carga los datos del formulario con los del partido existente
            setFormData({
                dateTime: match.dateTime ? new Date(match.dateTime).toISOString().slice(0, 16) : '',
                category: match.category || '',
                homeTeamId: match.homeTeamId || '',
                awayTeamId: match.awayTeamId || '',
                homeTeamScore: match.homeTeamScore !== null ? match.homeTeamScore : '',
                awayTeamScore: match.awayTeamScore !== null ? match.awayTeamScore : '',
                location: match.location || '',
                matchType: match.matchType || '',
                status: match.status || 'Programado',
                round: match.round || '',
                highlightsUrl: match.highlightsUrl || '',
                liveStreamUrl: match.liveStreamUrl || '',
                description: match.description || '',
                is_active: match.is_active,
                metaTitle: match.metaTitle || '',
                metaDescription: match.metaDescription || '',
            });
        } else {
            // Resetea el formulario para un nuevo partido
            setFormData(initialFormData);
        }
        setError(null); // Limpiar errores al cambiar de partido
    }, [match]);

    // Maneja cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    // Maneja el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            // Datos a enviar al backend
            const dataToSave = {
                ...formData,
                // Convertir scores a null si están vacíos para que coincida con allowNull: true en el modelo
                homeTeamScore: formData.homeTeamScore === '' ? null : Number(formData.homeTeamScore),
                awayTeamScore: formData.awayTeamScore === '' ? null : Number(formData.awayTeamScore),
                // Asegurarse de que dateTime sea un objeto Date o null
                dateTime: formData.dateTime ? new Date(formData.dateTime) : null,
            };

            if (match) {
                // Actualizar partido existente
                await matchService.updateMatch(match.id, dataToSave);
            } else {
                // Crear nuevo partido
                await matchService.createMatch(dataToSave);
            }
            onSave(); // Llama al callback de éxito en el componente padre
        } catch (err) {
            console.error("Error al guardar el partido:", err);
            setError(err.response?.data?.message || err.message || 'Error al guardar el partido.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="match-form-container">
            <h3>{match ? 'Editar Partido' : 'Añadir Nuevo Partido'}</h3>
            {error && <p className="match-form-error-text">{error}</p>}
            <form onSubmit={handleSubmit} className="match-form">
                <div className="form-group">
                    <label htmlFor="dateTime">Fecha y Hora:</label>
                    <input type="datetime-local" id="dateTime" name="dateTime" value={formData.dateTime} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="category">Categoría: <span className="required-star">*</span></label>
                    <select id="category" name="category" value={formData.category} onChange={handleChange} required>
                        <option value="">Selecciona una categoría</option>
                        {CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="homeTeamId">Equipo Local: <span className="required-star">*</span></label>
                    <select id="homeTeamId" name="homeTeamId" value={formData.homeTeamId} onChange={handleChange} required>
                        <option value="">Selecciona equipo local</option>
                        {teams.map((team) => (
                            <option key={team.id} value={team.id}>{team.name}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="homeTeamScore">Goles Local:</label>
                    <input type="number" id="homeTeamScore" name="homeTeamScore" value={formData.homeTeamScore} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="awayTeamId">Equipo Visitante: <span className="required-star">*</span></label>
                    <select id="awayTeamId" name="awayTeamId" value={formData.awayTeamId} onChange={handleChange} required>
                        <option value="">Selecciona equipo visitante</option>
                        {teams.map((team) => (
                            <option key={team.id} value={team.id}>{team.name}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="awayTeamScore">Goles Visitante:</label>
                    <input type="number" id="awayTeamScore" name="awayTeamScore" value={formData.awayTeamScore} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="location">Ubicación:</label>
                    <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} maxLength="255" />
                </div>

                <div className="form-group">
                    <label htmlFor="matchType">Tipo de Partido: <span className="required-star">*</span></label>
                    <select id="matchType" name="matchType" value={formData.matchType} onChange={handleChange} required>
                        <option value="">Selecciona tipo de partido</option>
                        {MATCH_TYPES.map((type) => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="status">Estado: <span className="required-star">*</span></label>
                    <select id="status" name="status" value={formData.status} onChange={handleChange} required>
                        {STATUSES.map((stat) => (
                            <option key={stat} value={stat}>{stat}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="round">Jornada/Ronda:</label>
                    <input type="text" id="round" name="round" value={formData.round} onChange={handleChange} maxLength="50" />
                </div>

                <div className="form-group">
                    <label htmlFor="highlightsUrl">URL Highlights:</label>
                    <input type="url" id="highlightsUrl" name="highlightsUrl" value={formData.highlightsUrl} onChange={handleChange} maxLength="255" placeholder="https://youtube.com/..." />
                </div>

                <div className="form-group">
                    <label htmlFor="liveStreamUrl">URL Transmisión en Vivo:</label>
                    <input type="url" id="liveStreamUrl" name="liveStreamUrl" value={formData.liveStreamUrl} onChange={handleChange} maxLength="255" placeholder="https://twitch.tv/..." />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Descripción:</label>
                    <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="4"></textarea>
                </div>

                <div className="form-group form-group-checkbox">
                    <label>
                        <input type="checkbox" name="is_active" checked={formData.is_active} onChange={handleChange} />
                        Activo
                    </label>
                </div>

                {/* Campos para SEO */}
                <div className="form-group">
                    <label htmlFor="metaTitle">Meta Título (SEO):</label>
                    <input type="text" id="metaTitle" name="metaTitle" value={formData.metaTitle} onChange={handleChange} maxLength="160" placeholder="Título para motores de búsqueda (max 160 caracteres)" />
                </div>
                <div className="form-group">
                    <label htmlFor="metaDescription">Meta Descripción (SEO):</label>
                    <textarea id="metaDescription" name="metaDescription" value={formData.metaDescription} onChange={handleChange} rows="3" maxLength="300" placeholder="Descripción para motores de búsqueda (max 300 caracteres)"></textarea>
                </div>

                <div className="match-form-button-group">
                    <button type="button" onClick={onClose} className="match-form-cancel-button" disabled={isLoading}>Cancelar</button>
                    <button type="submit" className="match-form-submit-button" disabled={isLoading}>
                        {isLoading ? 'Guardando...' : 'Guardar Partido'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MatchForm;
