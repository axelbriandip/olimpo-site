// src/components/admin/MonthlyPlayerForm.jsx
import React, { useState, useEffect } from 'react';
import monthlyPlayerService from '../../services/monthlyPlayer.service';
import playerService from '../../services/player.service'; // Para obtener la lista de jugadores
import uploadService from '../../services/upload.service'; // Para subir la imagen

const MONTHS = [
    { value: 1, label: 'Enero' }, { value: 2, label: 'Febrero' },
    { value: 3, label: 'Marzo' }, { value: 4, label: 'Abril' },
    { value: 5, label: 'Mayo' }, { value: 6, label: 'Junio' },
    { value: 7, label: 'Julio' }, { value: 8, label: 'Agosto' },
    { value: 9, label: 'Septiembre' }, { value: 10, label: 'Octubre' },
    { value: 11, label: 'Noviembre' }, { value: 12, label: 'Diciembre' },
];

const MonthlyPlayerForm = ({ monthlyPlayer, onClose, onSave }) => {
    const initialFormData = {
        playerId: '',
        year: new Date().getFullYear(), // Año actual por defecto
        month: new Date().getMonth() + 1, // Mes actual por defecto (1-12)
        reason: '',
        imageUrl: '',
        videoUrl: '',
        is_active: true,
        metaTitle: '',
        metaDescription: '',
    };

    const [formData, setFormData] = useState(initialFormData);
    const [players, setPlayers] = useState([]); // Lista de jugadores para el select
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Cargar jugadores al montar el componente
    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const fetchedPlayers = await playerService.getAllPlayers();
                setPlayers(fetchedPlayers);
            } catch (err) {
                console.error("Error al cargar jugadores:", err);
                setError("No se pudieron cargar los jugadores para la selección.");
            }
        };
        fetchPlayers();
    }, []);

    // Cargar datos del jugador del mes si estamos editando
    useEffect(() => {
        if (monthlyPlayer) {
            setFormData({
                playerId: monthlyPlayer.playerId || '',
                year: monthlyPlayer.year || '',
                month: monthlyPlayer.month || '',
                reason: monthlyPlayer.reason || '',
                imageUrl: monthlyPlayer.imageUrl || '',
                videoUrl: monthlyPlayer.videoUrl || '',
                is_active: monthlyPlayer.is_active,
                metaTitle: monthlyPlayer.metaTitle || '',
                metaDescription: monthlyPlayer.metaDescription || '',
            });
            setImagePreview(monthlyPlayer.imageUrl || '');
        } else {
            setFormData(initialFormData);
            setImagePreview('');
            setSelectedFile(null);
        }
        setError(null);
    }, [monthlyPlayer]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        } else {
            setImagePreview(formData.imageUrl || '');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            let finalImageUrl = formData.imageUrl;
            if (selectedFile) {
                finalImageUrl = await uploadService.uploadImage(selectedFile, 'monthly-player-image');
            } else if (formData.imageUrl === '' && !selectedFile && monthlyPlayer?.imageUrl) {
                finalImageUrl = null;
            }

            const dataToSave = {
                ...formData,
                imageUrl: finalImageUrl,
                year: Number(formData.year),
                month: Number(formData.month),
            };

            if (monthlyPlayer) {
                await monthlyPlayerService.updateMonthlyPlayer(monthlyPlayer.id, dataToSave);
            } else {
                await monthlyPlayerService.createMonthlyPlayer(dataToSave);
            }
            onSave();
        } catch (err) {
            console.error("Error al guardar Jugador del Mes:", err);
            setError(err.response?.data?.message || err.message || 'Error al guardar el Jugador del Mes.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="monthly-player-form-container">
            <h3>{monthlyPlayer ? 'Editar Jugador del Mes' : 'Añadir Nuevo Jugador del Mes'}</h3>
            {error && <p className="monthly-player-form-error-text">{error}</p>}
            <form onSubmit={handleSubmit} className="monthly-player-form">
                <div className="form-group">
                    <label htmlFor="playerId">Jugador: <span className="required-star">*</span></label>
                    <select id="playerId" name="playerId" value={formData.playerId} onChange={handleChange} required>
                        <option value="">Selecciona un jugador</option>
                        {players.map((player) => (
                            <option key={player.id} value={player.id}>{player.firstName} {player.lastName}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="year">Año: <span className="required-star">*</span></label>
                    <input type="number" id="year" name="year" value={formData.year} onChange={handleChange} required min="1900" max={new Date().getFullYear() + 5} />
                </div>

                <div className="form-group">
                    <label htmlFor="month">Mes: <span className="required-star">*</span></label>
                    <select id="month" name="month" value={formData.month} onChange={handleChange} required>
                        {MONTHS.map((m) => (
                            <option key={m.value} value={m.value}>{m.label}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="reason">Razón del Reconocimiento: <span className="required-star">*</span></label>
                    <textarea id="reason" name="reason" value={formData.reason} onChange={handleChange} rows="4" required></textarea>
                </div>

                {/* Campo de subida de imagen */}
                <div className="form-group">
                    <label htmlFor="imageUrl">Imagen del Reconocimiento:</label>
                    <input type="file" id="imageUrl" name="imageUrl" accept="image/*" onChange={handleFileChange} />
                    {imagePreview && (
                        <div className="monthly-player-form-img-preview-wrapper">
                            <img src={imagePreview} alt="Preview" className="monthly-player-form-img-preview" />
                            <button
                                type="button"
                                className="remove-image-button"
                                onClick={() => { setSelectedFile(null); setImagePreview(''); setFormData(prev => ({ ...prev, imageUrl: '' })); if (document.getElementById('imageUrl')) document.getElementById('imageUrl').value = ''; }}
                            >
                                X
                            </button>
                        </div>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="videoUrl">URL de Video (Highlights):</label>
                    <input type="url" id="videoUrl" name="videoUrl" value={formData.videoUrl} onChange={handleChange} maxLength="255" placeholder="https://youtube.com/..." />
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
                    <small>{formData.metaTitle.length} / 160 caracteres</small>
                </div>
                <div className="form-group">
                    <label htmlFor="metaDescription">Meta Descripción (SEO):</label>
                    <textarea id="metaDescription" name="metaDescription" value={formData.metaDescription} onChange={handleChange} rows="3" maxLength="300" placeholder="Descripción para motores de búsqueda (max 300 caracteres)"></textarea>
                    <small>{formData.metaDescription.length} / 300 caracteres</small>
                </div>

                <div className="monthly-player-form-button-group">
                    <button type="button" onClick={onClose} className="monthly-player-form-cancel-button" disabled={isLoading}>Cancelar</button>
                    <button type="submit" className="monthly-player-form-submit-button" disabled={isLoading}>
                        {isLoading ? 'Guardando...' : 'Guardar Reconocimiento'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MonthlyPlayerForm;
