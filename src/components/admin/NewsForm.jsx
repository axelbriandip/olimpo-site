// src/components/admin/NewsForm.jsx
import React, { useState, useEffect } from 'react';
import newsService from '../../services/news.service';
import categoryService from '../../services/category.service'; // <--- NUEVA IMPORTACIÓN
const NewsForm = ({ news, onClose, onSave }) => {
    // Estado inicial para una nueva noticia
    const initialFormData = {
        title: '',
        subtitle: '',
        summary: '',
        content: '',
        featuredImageUrl: '',
        featuredImageAltText: '',
        videoUrl: '',
        slug: '',
        publishedAt: '',
        is_published: true,
        is_active: true,
        author: '',
        source: '',
        viewsCount: 0,
        metaTitle: '',
        metaDescription: '',
        keywords: '',
        categoryIds: [], // <--- NUEVO CAMPO: Array para IDs de categorías seleccionadas
    };

    const [formData, setFormData] = useState(initialFormData);
    const [selectedFile, setSelectedFile] = useState(null); // Para la imagen destacada
    const [imagePreview, setImagePreview] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]); // <--- NUEVO ESTADO: Para almacenar las categorías disponibles
    const [categoriesLoading, setCategoriesLoading] = useState(true);
    const [categoriesError, setCategoriesError] = useState(null);

    // Efecto para cargar las categorías disponibles
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setCategoriesLoading(true);
                const data = await categoryService.getAllCategories();
                setCategories(data);
            } catch (err) {
                console.error("Error al cargar categorías:", err);
                setCategoriesError("No se pudieron cargar las categorías.");
            } finally {
                setCategoriesLoading(false);
            }
        };
        fetchCategories();
    }, []);

    // Efecto para cargar datos de la noticia si estamos editando
    useEffect(() => {
        if (news) {
            setFormData({
                title: news.title || '',
                subtitle: news.subtitle || '',
                summary: news.summary || '',
                content: news.content || '',
                featuredImageUrl: news.featuredImageUrl || '',
                featuredImageAltText: news.featuredImageAltText || '',
                videoUrl: news.videoUrl || '',
                slug: news.slug || '',
                publishedAt: news.publishedAt ? new Date(news.publishedAt).toISOString().slice(0, 16) : '',
                is_published: news.is_published,
                is_active: news.is_active,
                author: news.author || '',
                source: news.source || '',
                viewsCount: news.viewsCount || 0,
                metaTitle: news.metaTitle || '',
                metaDescription: news.metaDescription || '',
                keywords: news.keywords || '',
                // <--- Carga las categorías existentes de la noticia para edición
                categoryIds: news.categories ? news.categories.map(cat => cat.id) : [],
            });
            setImagePreview(news.featuredImageUrl || '');
        } else {
            setFormData({
                ...initialFormData,
                publishedAt: new Date().toISOString().slice(0, 16),
            });
            setImagePreview('');
            setSelectedFile(null);
        }
        setError(null); // Limpiar errores al cambiar de noticia
    }, [news]); // Dependencia: re-ejecutar cuando 'news' cambie

    // Maneja cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value, type, checked, options } = e.target;

        if (name === 'categoryIds') {
            // Manejar selección múltiple de categorías
            const selectedOptions = Array.from(options)
                .filter(option => option.selected)
                .map(option => Number(option.value)); // Asegúrate de que sean números
            setFormData((prev) => ({
                ...prev,
                [name]: selectedOptions,
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value,
            }));
        }

        // Opcional: Generar slug automáticamente cuando se escribe el título (solo para nuevas noticias)
        if (name === 'title' && !news) {
            const generatedSlug = value.toLowerCase()
                .normalize("NFD") // Normaliza caracteres acentuados
                .replace(/[\u0300-\u036f]/g, "") // Elimina diacríticos
                .replace(/[^a-z0-9\s-]/g, '') // Elimina caracteres no alfanuméricos (excepto espacios y guiones)
                .trim() // Elimina espacios al inicio/fin
                .replace(/\s+/g, '-'); // Reemplaza espacios con guiones
            setFormData((prev) => ({ ...prev, slug: generatedSlug }));
        }
    };

    // Maneja la selección de archivos para la imagen destacada
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        if (file) {
            setImagePreview(URL.createObjectURL(file)); // Crea una URL temporal para la vista previa
        } else {
            setImagePreview(formData.featuredImageUrl || '');
        }
    };

    // Maneja la eliminación de la imagen destacada
    const handleRemoveImage = () => {
        setSelectedFile(null);
        setImagePreview('');
        setFormData(prev => ({ ...prev, featuredImageUrl: '' }));
        // Resetear el input file para que se muestre "Sin archivos seleccionados"
        if (document.getElementById('featuredImage')) {
            document.getElementById('featuredImage').value = '';
        }
    };

    // Maneja el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            let finalImageUrl = formData.featuredImageUrl; // Mantener la URL existente por defecto

            // Si se seleccionó un nuevo archivo, subirlo primero
            if (selectedFile) {
                // Asumiendo que newsService.uploadImage devuelve la URL final de la imagen
                finalImageUrl = await newsService.uploadImage(selectedFile);
            } else if (formData.featuredImageUrl === '' && !selectedFile && news?.featuredImageUrl) {
                // Caso: el usuario eliminó la URL de la imagen (o deseleccionó el archivo)
                // y no se seleccionó un nuevo archivo. Establecer featuredImageUrl a null para borrarla del backend
                finalImageUrl = null;
            }

            // Datos a enviar al backend
            const dataToSave = {
                ...formData,
                featuredImageUrl: finalImageUrl,
                // Asegurarse de que `publishedAt` sea un objeto Date si se está enviando
                publishedAt: formData.publishedAt ? new Date(formData.publishedAt) : null,
            };

            if (news) {
                // Actualizar noticia existente
                await newsService.updateNews(news.id, dataToSave);
            } else {
                // Crear nueva noticia
                await newsService.createNews(dataToSave);
            }
            onSave(); // Llama al callback de éxito en el componente padre
        } catch (err) {
            console.error("Error al guardar la noticia:", err);
            setError(err.response?.data?.message || err.message || 'Error al guardar la noticia.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="news-form-container">
            <h3>{news ? 'Editar Noticia' : 'Crear Nueva Noticia'}</h3>
            {error && <p className="news-form-error-text">{error}</p>}
            <form onSubmit={handleSubmit} className="news-form">
                <div className="form-group">
                    <label htmlFor="title">Título: <span className="required-star">*</span></label>
                    <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} maxLength="75" required />
                    <small>{formData.title.length} / 75 caracteres</small>
                </div>
                <div className="form-group">
                    <label htmlFor="subtitle">Subtítulo:</label>
                    <input type="text" id="subtitle" name="subtitle" value={formData.subtitle} onChange={handleChange} maxLength="125" />
                    <small>{formData.subtitle.length} / 125 caracteres</small>
                </div>
                <div className="form-group">
                    <label htmlFor="summary">Resumen:</label>
                    <textarea id="summary" name="summary" value={formData.summary} onChange={handleChange} rows="3" maxLength="255"></textarea>
                    <small>{formData.summary.length} / 255 caracteres</small>
                </div>
                <div className="form-group">
                    <label htmlFor="content">Contenido: <span className="required-star">*</span></label>
                    <textarea id="content" name="content" value={formData.content} onChange={handleChange} rows="10" maxLength="1000" required></textarea>
                    <small>{formData.content.length} / 1000 caracteres</small>
                </div>

                <div className="form-group">
                    <label htmlFor="featuredImage">Imagen Destacada:</label>
                    <input type="file" id="featuredImage" name="featuredImage" accept="image/*" onChange={handleFileChange} />
                    {imagePreview && (
                        <div className="news-form-img-preview-wrapper">
                            <img src={imagePreview} alt="Preview" className="news-form-img-preview" />
                            <button
                                type="button"
                                className="remove-image-button"
                                onClick={handleRemoveImage}
                            >
                                X
                            </button>
                        </div>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="featuredImageAltText">Texto Alternativo Imagen:</label>
                    <input type="text" id="featuredImageAltText" name="featuredImageAltText" value={formData.featuredImageAltText} onChange={handleChange} maxLength="255" />
                </div>

                <div className="form-group">
                    <label htmlFor="videoUrl">URL de Video (Youtube/Vimeo):</label>
                    <input type="url" id="videoUrl" name="videoUrl" value={formData.videoUrl} onChange={handleChange} placeholder="https://youtube.com/watch?v=..." />
                </div>

                <div className="form-group">
                    <label htmlFor="slug">Slug (URL amigable): <span className="required-star">*</span></label>
                    <input type="text" id="slug" name="slug" value={formData.slug} onChange={handleChange} maxLength="255" required />
                    <small>Este campo se autocompleta con el título, pero puedes editarlo.</small>
                </div>

                <div className="form-group">
                    <label htmlFor="publishedAt">Fecha y Hora de Publicación: <span className="required-star">*</span></label>
                    <input type="datetime-local" id="publishedAt" name="publishedAt" value={formData.publishedAt} onChange={handleChange} required />
                </div>

                {/* --- CAMPO DE SELECCIÓN DE CATEGORÍAS --- */}
                <div className="form-group">
                    <label htmlFor="categoryIds">Categorías: <span className="required-star">*</span></label>
                    {categoriesLoading ? (
                        <p>Cargando categorías...</p>
                    ) : categoriesError ? (
                        <p className="error-message">{categoriesError}</p>
                    ) : categories.length > 0 ? (
                        <select
                            id="categoryIds"
                            name="categoryIds"
                            multiple // Permite selección múltiple
                            value={formData.categoryIds}
                            onChange={handleChange}
                            required // Hazlo requerido si al menos una categoría es obligatoria
                            className="multi-select-height" // Clase para controlar la altura
                        >
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <p>No hay categorías disponibles. Por favor, crea algunas en la sección de categorías.</p>
                    )}
                    <small>Mantén 'Ctrl' (Windows) o 'Cmd' (Mac) para seleccionar múltiples categorías.</small>
                </div>

                <div className="form-group form-group-checkbox">
                    <label>
                        <input type="checkbox" name="is_published" checked={formData.is_published} onChange={handleChange} />
                        Publicada
                    </label>
                </div>
                <div className="form-group form-group-checkbox">
                    <label>
                        <input type="checkbox" name="is_active" checked={formData.is_active} onChange={handleChange} />
                        Activa (Soft Delete)
                    </label>
                </div>

                <div className="form-group">
                    <label htmlFor="author">Autor:</label>
                    <input type="text" id="author" name="author" value={formData.author} onChange={handleChange} maxLength="100" />
                </div>
                <div className="form-group">
                    <label htmlFor="source">Fuente:</label>
                    <input type="text" id="source" name="source" value={formData.source} onChange={handleChange} maxLength="100" />
                </div>

                {news && (
                    <div className="form-group">
                        <label>Visitas:</label>
                        <p>{formData.viewsCount}</p>
                    </div>
                )}

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
                <div className="form-group">
                    <label htmlFor="keywords">Palabras Clave (SEO):</label>
                    <input type="text" id="keywords" name="keywords" value={formData.keywords} onChange={handleChange} maxLength="255" placeholder="ej. fútbol, river, superclásico" />
                    <small>Separadas por comas. {formData.keywords.length} / 255 caracteres</small>
                </div>


                <div className="news-form-button-group">
                    <button type="button" onClick={onClose} className="news-form-cancel-button" disabled={isLoading}>Cancelar</button>
                    <button type="submit" className="news-form-submit-button" disabled={isLoading}>
                        {isLoading ? 'Guardando...' : 'Guardar Noticia'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewsForm;
