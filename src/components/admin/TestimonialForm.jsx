// src/components/admin/TestimonialForm.jsx
import React, { useState, useEffect } from 'react';
import testimonialService from '../../services/testimonial.service';
import uploadService from '../../services/upload.service'; // Para subir la foto

const TestimonialForm = ({ testimonial, onClose, onSave }) => {
    const initialFormData = {
        authorName: '',
        authorRole: '',
        text: '',
        photo: '', // URL de la foto
        rating: '', // Puede ser null o un número
        date: '', // Formato YYYY-MM-DD
        is_active: true,
    };

    const [formData, setFormData] = useState(initialFormData);
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (testimonial) {
            setFormData({
                authorName: testimonial.authorName || '',
                authorRole: testimonial.authorRole || '',
                text: testimonial.text || '',
                photo: testimonial.photo || '',
                rating: testimonial.rating !== null ? testimonial.rating : '',
                date: testimonial.date ? testimonial.date.split('T')[0] : '', // Para input type="date"
                is_active: testimonial.is_active,
            });
            setImagePreview(testimonial.photo || '');
        } else {
            setFormData(initialFormData);
            setImagePreview('');
            setSelectedFile(null);
        }
        setError(null);
    }, [testimonial]);

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
            setImagePreview(formData.photo || '');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            let finalPhotoUrl = formData.photo;
            if (selectedFile) {
                finalPhotoUrl = await uploadService.uploadImage(selectedFile, 'testimonial-photo');
            } else if (formData.photo === '' && !selectedFile && testimonial?.photo) {
                finalPhotoUrl = null;
            }

            const dataToSave = {
                ...formData,
                photo: finalPhotoUrl,
                rating: formData.rating === '' ? null : Number(formData.rating),
                date: formData.date || null, // Asegura que sea null si está vacío
            };

            if (testimonial) {
                await testimonialService.updateTestimonial(testimonial.id, dataToSave);
            } else {
                await testimonialService.createTestimonial(dataToSave);
            }
            onSave();
        } catch (err) {
            console.error("Error al guardar Testimonio:", err);
            setError(err.response?.data?.message || err.message || 'Error al guardar el Testimonio.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="testimonial-form-container">
            <h3>{testimonial ? 'Editar Testimonio' : 'Añadir Nuevo Testimonio'}</h3>
            {error && <p className="testimonial-form-error-text">{error}</p>}
            <form onSubmit={handleSubmit} className="testimonial-form">
                <div className="form-group">
                    <label htmlFor="authorName">Nombre del Autor: <span className="required-star">*</span></label>
                    <input type="text" id="authorName" name="authorName" value={formData.authorName} onChange={handleChange} required maxLength="255" />
                </div>

                <div className="form-group">
                    <label htmlFor="authorRole">Rol del Autor:</label>
                    <input type="text" id="authorRole" name="authorRole" value={formData.authorRole} onChange={handleChange} maxLength="255" placeholder="Ej: Ex-jugador, Hincha" />
                </div>

                <div className="form-group">
                    <label htmlFor="text">Contenido del Testimonio: <span className="required-star">*</span></label>
                    <textarea id="text" name="text" value={formData.text} onChange={handleChange} rows="5" required></textarea>
                </div>

                {/* Campo de subida de foto */}
                <div className="form-group">
                    <label htmlFor="photo">Foto del Autor:</label>
                    <input type="file" id="photo" name="photo" accept="image/*" onChange={handleFileChange} />
                    {imagePreview && (
                        <div className="testimonial-form-img-preview-wrapper">
                            <img src={imagePreview} alt="Preview" className="testimonial-form-img-preview" />
                            <button
                                type="button"
                                className="remove-image-button"
                                onClick={() => { setSelectedFile(null); setImagePreview(''); setFormData(prev => ({ ...prev, photo: '' })); if (document.getElementById('photo')) document.getElementById('photo').value = ''; }}
                            >
                                X
                            </button>
                        </div>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="rating">Calificación (1-5):</label>
                    <input type="number" id="rating" name="rating" value={formData.rating} onChange={handleChange} min="1" max="5" placeholder="1 a 5" />
                </div>

                <div className="form-group">
                    <label htmlFor="date">Fecha del Testimonio:</label>
                    <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} />
                </div>

                <div className="form-group form-group-checkbox">
                    <label>
                        <input type="checkbox" name="is_active" checked={formData.is_active} onChange={handleChange} />
                        Activo
                    </label>
                </div>

                <div className="testimonial-form-button-group">
                    <button type="button" onClick={onClose} className="testimonial-form-cancel-button" disabled={isLoading}>Cancelar</button>
                    <button type="submit" className="testimonial-form-submit-button" disabled={isLoading}>
                        {isLoading ? 'Guardando...' : 'Guardar Testimonio'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TestimonialForm;
