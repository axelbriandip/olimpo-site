// src/components/admin/CategoryForm.jsx
import React, { useState, useEffect } from 'react';
import categoryService from '../../services/category.service'; // Asegúrate de que category.service.js exista

const CategoryForm = ({ category, onClose, onSave }) => {
    const initialFormData = {
        name: '',
        description: '',
        slug: '',
        iconUrl: '',
        imageUrl: '',
        color: '', // Para códigos HEX como "#RRGGBB"
        is_active: true,
        metaTitle: '',
        metaDescription: '',
    };

    const [formData, setFormData] = useState(initialFormData);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (category) {
            // Pre-carga los datos del formulario con los de la categoría existente
            setFormData({
                name: category.name || '',
                description: category.description || '',
                slug: category.slug || '',
                iconUrl: category.iconUrl || '',
                imageUrl: category.imageUrl || '',
                color: category.color || '',
                is_active: category.is_active,
                metaTitle: category.metaTitle || '',
                metaDescription: category.metaDescription || '',
            });
        } else {
            // Resetea el formulario para una nueva categoría
            setFormData(initialFormData);
        }
        setError(null); // Limpiar errores al cambiar de categoría
    }, [category]); // Dependencia: re-ejecutar cuando 'category' cambie

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));

        // Opcional: Generar slug automáticamente cuando se escribe el nombre
        if (name === 'name' && !category) { // Solo para nuevas categorías
            const generatedSlug = value.toLowerCase()
                .normalize("NFD") // Normaliza caracteres acentuados
                .replace(/[\u0300-\u036f]/g, "") // Elimina diacríticos
                .replace(/[^a-z0-9\s-]/g, '') // Elimina caracteres no alfanuméricos (excepto espacios y guiones)
                .trim() // Elimina espacios al inicio/fin
                .replace(/\s+/g, '-'); // Reemplaza espacios con guiones
            setFormData((prev) => ({ ...prev, slug: generatedSlug }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            if (category) {
                // Actualizar categoría existente
                await categoryService.updateCategory(category.id, formData);
            } else {
                // Crear nueva categoría
                await categoryService.createCategory(formData);
            }
            onSave(); // Llama al callback de éxito en el componente padre
        } catch (err) {
            console.error("Error al guardar la categoría:", err);
            setError(err.response?.data?.message || err.message || 'Error al guardar la categoría.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="category-form-container">
            <h3>{category ? 'Editar Categoría' : 'Crear Nueva Categoría'}</h3>
            {error && <p className="category-form-error-text">{error}</p>}
            <form onSubmit={handleSubmit} className="category-form">
                <div className="form-group">
                    <label htmlFor="name">Nombre: <span className="required-star">*</span></label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} maxLength="100" required />
                    <small>{formData.name.length} / 100 caracteres</small>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Descripción:</label>
                    <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="3"></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="slug">Slug (URL amigable):</label>
                    <input type="text" id="slug" name="slug" value={formData.slug} onChange={handleChange} maxLength="120" />
                    <small>Este campo se autocompleta con el nombre, pero puedes editarlo.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="iconUrl">URL de Ícono:</label>
                    <input type="url" id="iconUrl" name="iconUrl" value={formData.iconUrl} onChange={handleChange} maxLength="255" placeholder="https://ejemplo.com/icono.png" />
                </div>
                <div className="form-group">
                    <label htmlFor="imageUrl">URL de Imagen Destacada:</label>
                    <input type="url" id="imageUrl" name="imageUrl" value={formData.imageUrl} onChange={handleChange} maxLength="255" placeholder="https://ejemplo.com/banner.jpg" />
                </div>
                <div className="form-group">
                    <label htmlFor="color">Color (HEX):</label>
                    <input type="text" id="color" name="color" value={formData.color} onChange={handleChange} maxLength="7" placeholder="#RRGGBB" />
                    <small>Ej: #FF0000 para rojo.</small>
                </div>

                <div className="form-group form-group-checkbox">
                    <label>
                        <input type="checkbox" name="is_active" checked={formData.is_active} onChange={handleChange} />
                        Activa
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

                <div className="category-form-button-group">
                    <button type="button" onClick={onClose} className="category-form-cancel-button" disabled={isLoading}>Cancelar</button>
                    <button type="submit" className="category-form-submit-button" disabled={isLoading}>
                        {isLoading ? 'Guardando...' : 'Guardar Categoría'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CategoryForm;
