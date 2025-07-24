// src/components/admin/HistoryEventForm.jsx
import React, { useState, useEffect } from 'react';
import historyService from '../../services/history.service'; // Asegúrate de que este servicio exista y sea correcto

const HistoryEventForm = ({ historyEvent, onClose, onSave }) => {
    // Estado inicial para un nuevo evento histórico
    const initialFormData = {
        title: '',
        year: '',
        month: '', // Nuevo campo
        day: '', // Nuevo campo
        description: '',
        imageUrl: '', // Nuevo campo
        slug: '', // Nuevo campo
        is_active: true,
        displayOrder: 0, // Nuevo campo, con valor por defecto
        metaTitle: '', // Nuevo campo
        metaDescription: '', // Nuevo campo
    };

    const [formData, setFormData] = useState(initialFormData);
    const [selectedFile, setSelectedFile] = useState(null); // Para la imagen del evento
    const [imagePreview, setImagePreview] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Efecto para cargar datos del evento si estamos editando
    useEffect(() => {
        if (historyEvent) {
            // Precarga los datos del formulario con los del evento existente
            setFormData({
                title: historyEvent.title || '',
                year: historyEvent.year || '',
                month: historyEvent.month || '',
                day: historyEvent.day || '',
                description: historyEvent.description || '',
                imageUrl: historyEvent.imageUrl || '',
                slug: historyEvent.slug || '',
                is_active: historyEvent.is_active,
                displayOrder: historyEvent.displayOrder !== null ? historyEvent.displayOrder : 0,
                metaTitle: historyEvent.metaTitle || '',
                metaDescription: historyEvent.metaDescription || '',
            });
            setImagePreview(historyEvent.imageUrl || ''); // Muestra la imagen existente
        } else {
            // Resetea el formulario para un nuevo evento
            setFormData(initialFormData);
            setImagePreview('');
            setSelectedFile(null);
        }
        setError(null); // Limpiar errores al cambiar de evento
    }, [historyEvent]);

    // Maneja cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));

        // Opcional: Generar slug automáticamente cuando se escribe el título (solo para nuevos eventos)
        if (name === 'title' && !historyEvent) {
            const generatedSlug = value.toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/[^a-z0-9\s-]/g, '')
                .trim()
                .replace(/\s+/g, '-');
            setFormData((prev) => ({ ...prev, slug: generatedSlug }));
        }
    };

    // Maneja la selección de archivos para la imagen
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        if (file) {
            setImagePreview(URL.createObjectURL(file)); // Crea una URL temporal para la vista previa
        } else {
            setImagePreview(formData.imageUrl || '');
        }
    };

    // Maneja el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            let finalImageUrl = formData.imageUrl; // Mantener la URL existente por defecto

            // Si se seleccionó un nuevo archivo, subirlo primero
            if (selectedFile) {
                // Asumiendo que historyService.uploadImage devuelve la URL final de la imagen
                finalImageUrl = await historyService.uploadImage(selectedFile, 'event'); // Pasa 'event' para indicar el tipo de subida
            } else if (formData.imageUrl === '' && !selectedFile && historyEvent?.imageUrl) {
                // Caso: el usuario eliminó la URL de la imagen (o deseleccionó el archivo)
                // y no se seleccionó un nuevo archivo. Establecer imageUrl a null para borrarla del backend
                finalImageUrl = null;
            }

            const dataToSave = {
                ...formData,
                imageUrl: finalImageUrl,
                // Convertir a números o null si están vacíos
                year: formData.year === '' ? null : Number(formData.year),
                month: formData.month === '' ? null : Number(formData.month),
                day: formData.day === '' ? null : Number(formData.day),
                displayOrder: formData.displayOrder === '' ? null : Number(formData.displayOrder),
            };

            // Asegurar que los campos requeridos no sean nulos si el modelo lo exige
            if (!dataToSave.title || !dataToSave.year || !dataToSave.description) {
                setError("Título, Año y Descripción son campos obligatorios.");
                setIsLoading(false);
                return;
            }

            if (historyEvent) {
                // Actualizar evento existente
                await historyService.updateHistoryEvent(historyEvent.id, dataToSave);
            } else {
                // Crear nuevo evento
                await historyService.createHistoryEvent(dataToSave);
            }
            onSave(); // Llama al callback de éxito en el componente padre
        } catch (err) {
            console.error("Error al guardar el evento histórico:", err);
            setError(err.response?.data?.message || err.message || 'Error al guardar el evento histórico.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="history-event-form-container">
            <h3>{historyEvent ? 'Editar Evento Histórico' : 'Añadir Nuevo Evento Histórico'}</h3>
            {error && <p className="history-event-form-error-text">{error}</p>}
            <form onSubmit={handleSubmit} className="history-event-form">
                <div className="form-group">
                    <label htmlFor="title">Título: <span className="required-star">*</span></label>
                    <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required maxLength="255" />
                </div>

                <div className="form-group">
                    <label htmlFor="year">Año: <span className="required-star">*</span></label>
                    <input type="number" id="year" name="year" value={formData.year} onChange={handleChange} required placeholder="Ej: 1995" />
                </div>

                <div className="form-group">
                    <label htmlFor="month">Mes:</label>
                    <input type="number" id="month" name="month" value={formData.month} onChange={handleChange} min="1" max="12" placeholder="1-12 (Opcional)" />
                </div>

                <div className="form-group">
                    <label htmlFor="day">Día:</label>
                    <input type="number" id="day" name="day" value={formData.day} onChange={handleChange} min="1" max="31" placeholder="1-31 (Opcional)" />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Descripción: <span className="required-star">*</span></label>
                    <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="5" required></textarea>
                </div>

                {/* Campo de subida de imagen */}
                <div className="form-group">
                    <label htmlFor="imageUrl">Imagen del Evento:</label>
                    <input type="file" id="imageUrl" name="imageUrl" accept="image/*" onChange={handleFileChange} />
                    {imagePreview && (
                        <div className="history-event-form-img-preview-wrapper">
                            <img src={imagePreview} alt="Preview" className="history-event-form-img-preview" />
                            <button
                                type="button"
                                className="remove-image-button"
                                onClick={() => {
                                    setSelectedFile(null);
                                    setImagePreview('');
                                    setFormData(prev => ({ ...prev, imageUrl: '' }));
                                    if (document.getElementById('imageUrl')) {
                                        document.getElementById('imageUrl').value = '';
                                    }
                                }}
                            >
                                X
                            </button>
                        </div>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="slug">Slug (URL amigable):</label>
                    <input type="text" id="slug" name="slug" value={formData.slug} onChange={handleChange} maxLength="255" placeholder="ej. fundacion-del-club" />
                    <small>Se autocompleta con el título, pero puedes editarlo.</small>
                </div>

                <div className="form-group">
                    <label htmlFor="displayOrder">Orden de Visualización:</label>
                    <input type="number" id="displayOrder" name="displayOrder" value={formData.displayOrder} onChange={handleChange} placeholder="0" />
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

                <div className="history-event-form-button-group">
                    <button type="button" onClick={onClose} className="history-event-form-cancel-button" disabled={isLoading}>Cancelar</button>
                    <button type="submit" className="history-event-form-submit-button" disabled={isLoading}>
                        {isLoading ? 'Guardando...' : 'Guardar Evento'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default HistoryEventForm;
