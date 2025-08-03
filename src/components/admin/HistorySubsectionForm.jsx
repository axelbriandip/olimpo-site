// src/components/admin/HistorySubsectionForm.jsx
import React, { useState, useEffect } from 'react';
import historyService from '../../services/history.service'; // Asegúrate de que este servicio exista y sea correcto

const HistorySubsectionForm = ({ historyEventId, historySubsection, onClose, onSave }) => {
    // Estado inicial para una nueva subsección histórica
    const initialFormData = {
        title: '',
        content: '', // Nuevo campo
        imageUrl: '', // Nuevo campo
        displayOrder: 0, // Nuevo campo, con valor por defecto
        is_active: true,
        slug: '', // Nuevo campo
        metaTitle: '', // Nuevo campo
        metaDescription: '', // Nuevo campo
        // historyEventId se maneja por separado al inicializar
    };

    const [formData, setFormData] = useState(initialFormData);
    const [selectedFile, setSelectedFile] = useState(null); // Para la imagen de la subsección
    const [imagePreview, setImagePreview] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Efecto para cargar datos de la subsección si estamos editando
    useEffect(() => {
        if (historySubsection) {
            // Precarga los datos del formulario con los de la subsección existente
            setFormData({
                title: historySubsection.title || '',
                content: historySubsection.content || '',
                imageUrl: historySubsection.imageUrl || '',
                displayOrder: historySubsection.displayOrder !== null ? historySubsection.displayOrder : 0,
                historyEventId: historySubsection.historyEventId || '', // Asegura que el ID del evento padre se mantenga
                is_active: historySubsection.is_active,
                slug: historySubsection.slug || '',
                metaTitle: historySubsection.metaTitle || '',
                metaDescription: historySubsection.metaDescription || '',
            });
            setImagePreview(historySubsection.imageUrl || ''); // Muestra la imagen existente
        } else {
            // Resetea el formulario para una nueva subsección, manteniendo el historyEventId
            setFormData({
                ...initialFormData,
                historyEventId: historyEventId || '', // Asegura que el ID del evento padre se establezca para nuevas subsecciones
            });
            setImagePreview('');
            setSelectedFile(null);
        }
        setError(null); // Limpiar errores al cambiar de subsección
    }, [historySubsection, historyEventId]); // Dependencia: re-ejecutar cuando 'historySubsection' o 'historyEventId' cambien

    // Maneja cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));

        // Opcional: Generar slug automáticamente cuando se escribe el título (solo para nuevas subsecciones)
        if (name === 'title' && !historySubsection) {
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
                finalImageUrl = await historyService.uploadImage(selectedFile, 'subsection'); // Pasa 'subsection' para indicar el tipo de subida
            } else if (formData.imageUrl === '' && !selectedFile && historySubsection?.imageUrl) {
                // Caso: el usuario eliminó la URL de la imagen (o deseleccionó el archivo)
                finalImageUrl = null;
            }

            const dataToSave = {
                ...formData,
                imageUrl: finalImageUrl,
                // Asegúrate de que displayOrder sea un número
                displayOrder: Number(formData.displayOrder),
            };

            // Asegúrate de que historyEventId se envíe correctamente
            if (!dataToSave.historyEventId) {
                setError("La subsección debe estar asociada a un evento histórico.");
                setIsLoading(false);
                return;
            }

            if (historySubsection) {
                // Actualizar subsección existente
                await historyService.updateHistorySubsection(historySubsection.id, dataToSave);
            } else {
                // Crear nueva subsección
                await historyService.createHistorySubsection(dataToSave);
            }
            onSave(); // Llama al callback de éxito en el componente padre
        } catch (err) {
            console.error("Error al guardar la subsección histórica:", err);
            setError(err.response?.data?.message || err.message || 'Error al guardar la subsección histórica.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="history-subsection-form-container">
            <h3>{historySubsection ? 'Editar Subsección Histórica' : 'Añadir Nueva Subsección Histórica'}</h3>
            {error && <p className="history-subsection-form-error-text">{error}</p>}
            <form onSubmit={handleSubmit} className="history-subsection-form">
                <div className="form-group">
                    <label htmlFor="title">Título: <span className="required-star">*</span></label>
                    <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required maxLength="255" />
                </div>

                <div className="form-group">
                    <label htmlFor="content">Contenido: <span className="required-star">*</span></label>
                    <textarea id="content" name="content" value={formData.content} onChange={handleChange} rows="8" required></textarea>
                </div>

                {/* Campo de subida de imagen */}
                <div className="form-group">
                    <label htmlFor="file">Imagen de Subsección:</label>
                    <input type="file" id="file" name="file" accept="image/*" onChange={handleFileChange} />
                    {imagePreview && (
                        <div className="history-subsection-form-img-preview-wrapper">
                            <img src={imagePreview} alt="Preview" className="history-subsection-form-img-preview" />
                            <button
                                type="button"
                                className="remove-image-button"
                                onClick={() => {
                                    setSelectedFile(null);
                                    setImagePreview('');
                                    setFormData(prev => ({ ...prev, imageUrl: '' }));
                                    if (document.getElementById('file')) {
                                        document.getElementById('file').value = '';
                                    }
                                }}
                            >
                                X
                            </button>
                        </div>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="displayOrder">Orden de Visualización:</label>
                    <input type="number" id="displayOrder" name="displayOrder" value={formData.displayOrder} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="slug">Slug (URL amigable):</label>
                    <input type="text" id="slug" name="slug" value={formData.slug} onChange={handleChange} maxLength="255" placeholder="ej. partidos-clave" />
                    <small>Se autocompleta con el título, pero puedes editarlo.</small>
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

                <div className="history-subsection-form-button-group">
                    <button type="button" onClick={onClose} className="history-subsection-form-cancel-button" disabled={isLoading}>Cancelar</button>
                    <button type="submit" className="history-subsection-form-submit-button" disabled={isLoading}>
                        {isLoading ? 'Guardando...' : 'Guardar Subsección'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default HistorySubsectionForm;
