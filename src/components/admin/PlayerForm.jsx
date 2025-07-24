// src/components/admin/PlayerForm.jsx
import React, { useState, useEffect } from 'react';
import playerService from '../../services/player.service'; // Asegúrate de que playerService tenga métodos para subir imagen, crear y actualizar.

// Opciones predefinidas para campos de selección
const POSITIONS = ['Arquero', 'Defensor', 'Mediocampista', 'Delantero'];

const FEET = ['Derecho', 'Izquierdo', 'Ambos'];

const PLAYER_STATUSES = ['Activo', 'Lesionado', 'Suspendido', 'Cedido', 'Retirado'];

const PlayerForm = ({ player, onClose, onSave }) => {
    // Estado inicial para un nuevo jugador
    const initialFormData = {
        firstName: '',
        lastName: '',
        position: '', // Usaremos un select
        number: '',
        dateOfBirth: '', // Formato YYYY-MM-DD para input type="date"
        cityOfBirth: '', // Nuevo
        stateOfBirth: '', // Nuevo
        nationality: '',
        preferredFoot: '', // Nuevo, usaremos un select
        photoUrl: '',
        biography: '', // Nuevo
        instagramUrl: '', // Nuevo
        status: 'Activo', // Nuevo, usaremos un select, con 'Activo' por defecto
        is_active: true,
        metaTitle: '', // Nuevo
        metaDescription: '', // Nuevo
    };

    const [formData, setFormData] = useState(initialFormData);
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Efecto para cargar datos del jugador si estamos editando
    useEffect(() => {
        if (player) {
            // Pre-carga los datos del formulario con los del jugador existente
            setFormData({
                firstName: player.firstName || '',
                lastName: player.lastName || '',
                position: player.position || '',
                number: player.number || '',
                // Asegura formato YYYY-MM-DD para input type="date"
                dateOfBirth: player.dateOfBirth ? player.dateOfBirth.split('T')[0] : '',
                cityOfBirth: player.cityOfBirth || '',
                stateOfBirth: player.stateOfBirth || '',
                nationality: player.nationality || '',
                preferredFoot: player.preferredFoot || '',
                photoUrl: player.photoUrl || '',
                biography: player.biography || '',
                instagramUrl: player.instagramUrl || '',
                status: player.status || 'Activo', // Asegura un valor por defecto si es nulo
                is_active: player.is_active,
                metaTitle: player.metaTitle || '',
                metaDescription: player.metaDescription || '',
            });
            setImagePreview(player.photoUrl || ''); // Muestra la foto existente
        } else {
            // Resetea el formulario para un nuevo jugador
            setFormData(initialFormData);
            setImagePreview('');
            setSelectedFile(null);
        }
        setError(null); // Limpiar errores al cambiar de jugador
    }, [player]); // Dependencia: re-ejecutar cuando 'player' cambie

    // Maneja cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    // Maneja la selección de archivos para la foto
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        if (file) {
            setImagePreview(URL.createObjectURL(file)); // Crea una URL temporal para la vista previa
        } else {
            // Si no se selecciona un nuevo archivo, o se deselecciona,
            // volver a la URL de la foto existente si la hay.
            setImagePreview(formData.photoUrl || '');
        }
    };

    // Maneja el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            let finalPhotoUrl = formData.photoUrl; // Mantener la URL existente por defecto

            // Si se seleccionó un nuevo archivo, subirlo primero
            if (selectedFile) {
                // Asumiendo que playerService.uploadImage devuelve la URL final de la imagen
                finalPhotoUrl = await playerService.uploadImage(selectedFile);
            } else if (formData.photoUrl === '' && !selectedFile && player?.photoUrl) {
                // Caso: el usuario eliminó la URL de la foto (o deseleccionó el archivo)
                // y no se seleccionó un nuevo archivo. Establecer photoUrl a null para borrarla del backend
                finalPhotoUrl = null;
            }


            // Datos a enviar al backend (incluyendo la URL final de la foto)
            const dataToSave = { ...formData, photoUrl: finalPhotoUrl };

            if (player) {
                // Actualizar jugador existente
                await playerService.updatePlayer(player.id, dataToSave);
            } else {
                // Crear nuevo jugador
                await playerService.createPlayer(dataToSave);
            }
            onSave(); // Llama al callback de éxito en el componente padre
        } catch (err) {
            console.error("Error al guardar el jugador:", err);
            // Captura el mensaje de error de la API si está disponible, sino un mensaje genérico
            setError(err.response?.data?.message || err.message || 'Error al guardar el jugador.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="player-form-container">
            <h3>{player ? 'Editar Jugador' : 'Añadir Nuevo Jugador'}</h3>
            {error && <p className="player-form-error-text">{error}</p>}
            <form onSubmit={handleSubmit} className="player-form">
                <div className="form-group">
                    <label htmlFor="firstName">Nombre:</label>
                    <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Apellido:</label>
                    <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="position">Posición:</label>
                    <select id="position" name="position" value={formData.position} onChange={handleChange} required>
                        <option value="">Selecciona una posición</option>
                        {POSITIONS.map((pos) => (
                            <option key={pos} value={pos}>{pos}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="number">Número de Camiseta:</label>
                    <input type="number" id="number" name="number" value={formData.number} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="dateOfBirth">Fecha de Nacimiento:</label>
                    <input type="date" id="dateOfBirth" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
                </div>

                {/* Nuevos campos de ciudad/provincia */}
                <div className="form-group">
                    <label htmlFor="cityOfBirth">Ciudad de Nacimiento:</label>
                    <input type="text" id="cityOfBirth" name="cityOfBirth" value={formData.cityOfBirth} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="stateOfBirth">Provincia/Estado de Nacimiento:</label>
                    <input type="text" id="stateOfBirth" name="stateOfBirth" value={formData.stateOfBirth} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="nationality">Nacionalidad:</label>
                    <input type="text" id="nationality" name="nationality" value={formData.nationality} onChange={handleChange} />
                </div>

                {/* Nuevo campo de Pie Hábil */}
                <div className="form-group">
                    <label htmlFor="preferredFoot">Pie Hábil:</label>
                    <select id="preferredFoot" name="preferredFoot" value={formData.preferredFoot} onChange={handleChange}>
                        <option value="">Selecciona pie hábil</option>
                        {FEET.map((foot) => (
                            <option key={foot} value={foot}>{foot}</option>
                        ))}
                    </select>
                </div>

                {/* Campo de subida de foto */}
                <div className="form-group">
                    <label htmlFor="photo">Foto del Jugador:</label>
                    <input type="file" id="photo" name="photo" accept="image/*" onChange={handleFileChange} />
                    {imagePreview && (
                        <div className="player-form-img-preview-wrapper">
                            <img src={imagePreview} alt="Preview" className="player-form-img-preview" />
                            {/* Opcional: botón para quitar la imagen */}
                            <button
                                type="button"
                                className="remove-image-button"
                                onClick={() => {
                                    setSelectedFile(null);
                                    setImagePreview('');
                                    setFormData(prev => ({ ...prev, photoUrl: '' })); // Limpiar también la URL existente
                                    // Resetear el input file para que puedas subir la misma imagen si la habías deseleccionado
                                    if (document.getElementById('photo')) {
                                        document.getElementById('photo').value = '';
                                    }
                                }}
                            >
                                X
                            </button>
                        </div>
                    )}
                </div>

                {/* Nuevo campo de Biografía */}
                <div className="form-group">
                    <label htmlFor="biography">Biografía:</label>
                    <textarea id="biography" name="biography" value={formData.biography} onChange={handleChange} rows="4"></textarea>
                </div>

                {/* Nuevo campo de Instagram URL */}
                <div className="form-group">
                    <label htmlFor="instagramUrl">URL de Instagram:</label>
                    <input type="url" id="instagramUrl" name="instagramUrl" value={formData.instagramUrl} onChange={handleChange} placeholder="https://instagram.com/usuario" />
                </div>

                {/* Nuevo campo de Estado del Jugador */}
                <div className="form-group">
                    <label htmlFor="status">Estado del Jugador:</label>
                    <select id="status" name="status" value={formData.status} onChange={handleChange}>
                        {PLAYER_STATUSES.map((stat) => (
                            <option key={stat} value={stat}>{stat}</option>
                        ))}
                    </select>
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

                <div className="player-form-button-group">
                    <button type="button" onClick={onClose} className="player-form-cancel-button" disabled={isLoading}>Cancelar</button>
                    <button type="submit" className="player-form-submit-button" disabled={isLoading}>
                        {isLoading ? 'Guardando...' : 'Guardar Jugador'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PlayerForm;