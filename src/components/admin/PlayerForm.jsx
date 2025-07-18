// src/components/admin/PlayerForm.jsx
import React, { useState, useEffect } from 'react';
import playerService from '../../services/player.service';

const PlayerForm = ({ player, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        position: '',
        number: '',
        dateOfBirth: '', // Formato YYYY-MM-DD para input type="date"
        nationality: '',
        photoUrl: '', // Para la URL de la foto que viene del backend
        is_active: true,
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (player) {
            // Si hay un jugador para editar, precarga los datos del formulario
            setFormData({
                firstName: player.firstName || '',
                lastName: player.lastName || '',
                position: player.position || '',
                number: player.number || '',
                dateOfBirth: player.dateOfBirth ? player.dateOfBirth.split('T')[0] : '', // Formato YYYY-MM-DD
                nationality: player.nationality || '',
                photoUrl: player.photoUrl || '',
                is_active: player.is_active,
            });
            setImagePreview(player.photoUrl || '');
        } else {
            // Limpia el formulario si no hay jugador para editar
            setFormData({
                firstName: '', lastName: '', position: '', number: '', dateOfBirth: '',
                nationality: '', photoUrl: '', is_active: true,
            });
            setImagePreview('');
            setSelectedFile(null);
        }
        setError(null);
    }, [player]);

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
            setImagePreview(URL.createObjectURL(file)); // Crea una URL temporal para la vista previa
        } else {
            // Si no se selecciona un nuevo archivo, o se deselecciona, volver a la URL existente si la hay.
            setImagePreview(formData.photoUrl || '');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            let finalPhotoUrl = formData.photoUrl;

            // Si se seleccionó un nuevo archivo, subirlo primero
            if (selectedFile) {
                finalPhotoUrl = await playerService.uploadImage(selectedFile);
            }

            // Datos a enviar al backend para crear/actualizar el jugador
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
            console.error("Error al guardar el jugador:", err); // Log más detallado
            setError(err.message || 'Error al guardar el jugador.');
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
                    <input type="text" id="position" name="position" value={formData.position} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="number">Número de Camiseta:</label>
                    <input type="number" id="number" name="number" value={formData.number} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="dateOfBirth">Fecha de Nacimiento:</label>
                    <input type="date" id="dateOfBirth" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="nationality">Nacionalidad:</label>
                    <input type="text" id="nationality" name="nationality" value={formData.nationality} onChange={handleChange} />
                </div>

                {/* Campo de subida de foto */}
                <div className="form-group">
                    <label htmlFor="photo">Foto del Jugador:</label>
                    <input type="file" id="photo" name="photo" accept="image/*" onChange={handleFileChange} />
                    {imagePreview && (
                        <img src={imagePreview} alt="Preview" className="player-form-img-preview" />
                    )}
                </div>

                <div className="form-group form-group-checkbox">
                    <label>
                        <input type="checkbox" name="is_active" checked={formData.is_active} onChange={handleChange} />
                        Activo
                    </label>
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