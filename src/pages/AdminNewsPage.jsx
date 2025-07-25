// src/pages/AdminNewsPage.jsx
import React, { useState, useEffect } from 'react';
import NewsForm from '../components/admin/NewsForm';
import CategoryForm from '../components/admin/CategoryForm'; // <--- NUEVA IMPORTACIÓN
import newsService from '../services/news.service';
import categoryService from '../services/category.service'; // <--- NUEVA IMPORTACIÓN

const AdminNewsPage = () => {
    // --- Estados para la gestión de NOTICIAS ---
    const [showNewsForm, setShowNewsForm] = useState(false);
    const [selectedNews, setSelectedNews] = useState(null);
    const [newsList, setNewsList] = useState([]);
    const [loadingNews, setLoadingNews] = useState(false);
    const [newsError, setNewsError] = useState(null);

    // --- Estados para la gestión de CATEGORÍAS ---
    const [showCategoryForm, setShowCategoryForm] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categoryList, setCategoryList] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(false);
    const [categoryError, setCategoryError] = useState(null);

    // --- Mensajes generales ---
    const [message, setMessage] = useState(null);

    // --- Funciones para la gestión de NOTICIAS ---
    const fetchNews = async () => {
        setLoadingNews(true);
        setNewsError(null);
        setMessage(null);
        try {
            const data = await newsService.getAllNews();
            setNewsList(data);
        } catch (err) {
            console.error("Error al cargar la lista de noticias:", err);
            setNewsError(err.response?.data?.message || "No se pudieron cargar las noticias.");
        } finally {
            setLoadingNews(false);
        }
    };

    const handleNewsSaveSuccess = () => {
        setShowNewsForm(false);
        setSelectedNews(null);
        fetchNews();
        setMessage("¡Noticia guardada exitosamente!");
    };

    const handleCloseNewsForm = () => {
        setShowNewsForm(false);
        setSelectedNews(null);
        setMessage(null);
    };

    const handleCreateNews = () => {
        setSelectedNews(null);
        setShowNewsForm(true);
    };

    const handleEditNews = (newsItem) => {
        setSelectedNews(newsItem);
        setShowNewsForm(true);
    };

    const handleSoftDeleteNews = async (id) => {
        if (window.confirm("¿Estás seguro de que quieres desactivar esta noticia?")) {
            try {
                await newsService.softDeleteNews(id);
                setMessage("Noticia desactivada exitosamente.");
                fetchNews();
            } catch (err) {
                console.error("Error al desactivar noticia:", err);
                setNewsError(err.response?.data?.message || "Error al desactivar la noticia.");
            }
        }
    };

    // --- Funciones para la gestión de CATEGORÍAS ---
    const fetchCategories = async () => {
        setLoadingCategories(true);
        setCategoryError(null);
        setMessage(null);
        try {
            const data = await categoryService.getAllCategories();
            setCategoryList(data);
        } catch (err) {
            console.error("Error al cargar la lista de categorías:", err);
            setCategoryError(err.response?.data?.message || "No se pudieron cargar las categorías.");
        } finally {
            setLoadingCategories(false);
        }
    };

    const handleCategorySaveSuccess = () => {
        setShowCategoryForm(false);
        setSelectedCategory(null);
        fetchCategories(); // Recarga la lista de categorías
        setMessage("¡Categoría guardada exitosamente!");
    };

    const handleCloseCategoryForm = () => {
        setShowCategoryForm(false);
        setSelectedCategory(null);
        setMessage(null);
    };

    const handleCreateCategory = () => {
        setSelectedCategory(null);
        setShowCategoryForm(true);
    };

    const handleEditCategory = (categoryItem) => {
        setSelectedCategory(categoryItem);
        setShowCategoryForm(true);
    };

    const handleSoftDeleteCategory = async (id) => {
        if (window.confirm("¿Estás seguro de que quieres desactivar esta categoría?")) {
            try {
                await categoryService.softDeleteCategory(id); // Asume que tienes este método en categoryService
                setMessage("Categoría desactivada exitosamente.");
                fetchCategories(); // Recargar la lista
            } catch (err) {
                console.error("Error al desactivar categoría:", err);
                setCategoryError(err.response?.data?.message || "Error al desactivar la categoría.");
            }
        }
    };

    // Carga noticias y categorías al montar el componente
    useEffect(() => {
        fetchNews();
        fetchCategories();
    }, []);

    return (
        <div className="admin-page-container">
            <h1>Administración de Contenido</h1>

            {message && <p className="success-message">{message}</p>}
            {newsError && <p className="error-message">{newsError}</p>}
            {categoryError && <p className="error-message">{categoryError}</p>}

            {/* --- SECCIÓN DE GESTIÓN DE NOTICIAS --- */}
            <div className="admin-section">
                <h2>Gestión de Noticias</h2>
                <button onClick={handleCreateNews} className="admin-button add-button">
                    Añadir Nueva Noticia
                </button>

                {showNewsForm && (
                    <div className="admin-form-overlay">
                        <div className="admin-form-content">
                            <NewsForm
                                news={selectedNews}
                                onClose={handleCloseNewsForm}
                                onSave={handleNewsSaveSuccess}
                            />
                        </div>
                    </div>
                )}

                {!showNewsForm && (
                    <div className="admin-list-section">
                        <h3>Listado de Noticias</h3>
                        {loadingNews ? (
                            <p>Cargando noticias...</p>
                        ) : newsList.length === 0 ? (
                            <p>No hay noticias cargadas en el sistema.</p>
                        ) : (
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Título</th>
                                        <th>Autor</th>
                                        <th>Publicada</th>
                                        <th>Activa</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {newsList.map((newsItem) => (
                                        <tr key={newsItem.id}>
                                            <td>{newsItem.id}</td>
                                            <td>{newsItem.title}</td>
                                            <td>{newsItem.author || 'N/A'}</td>
                                            <td>{newsItem.is_published ? 'Sí' : 'No'}</td>
                                            <td>{newsItem.is_active ? 'Sí' : 'No'}</td>
                                            <td className="admin-actions">
                                                <button onClick={() => handleEditNews(newsItem)} className="admin-button edit-button">Editar</button>
                                                {newsItem.is_active && (
                                                    <button onClick={() => handleSoftDeleteNews(newsItem.id)} className="admin-button delete-button">Desactivar</button>
                                                )}
                                                {!newsItem.is_active && (
                                                    <button className="admin-button activate-button" disabled>Ya Inactiva</button>
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

            {/* --- SECCIÓN DE GESTIÓN DE CATEGORÍAS --- */}
            <div className="admin-section">
                <h2>Gestión de Categorías</h2>
                <button onClick={handleCreateCategory} className="admin-button add-button">
                    Añadir Nueva Categoría
                </button>

                {showCategoryForm && (
                    <div className="admin-form-overlay">
                        <div className="admin-form-content">
                            <CategoryForm
                                category={selectedCategory}
                                onClose={handleCloseCategoryForm}
                                onSave={handleCategorySaveSuccess}
                            />
                        </div>
                    </div>
                )}

                {!showCategoryForm && (
                    <div className="admin-list-section">
                        <h3>Listado de Categorías</h3>
                        {loadingCategories ? (
                            <p>Cargando categorías...</p>
                        ) : categoryList.length === 0 ? (
                            <p>No hay categorías cargadas en el sistema.</p>
                        ) : (
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Slug</th>
                                        <th>Activa</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categoryList.map((categoryItem) => (
                                        <tr key={categoryItem.id}>
                                            <td>{categoryItem.id}</td>
                                            <td>{categoryItem.name}</td>
                                            <td>{categoryItem.slug || 'N/A'}</td>
                                            <td>{categoryItem.is_active ? 'Sí' : 'No'}</td>
                                            <td className="admin-actions">
                                                <button onClick={() => handleEditCategory(categoryItem)} className="admin-button edit-button">Editar</button>
                                                {categoryItem.is_active && (
                                                    <button onClick={() => handleSoftDeleteCategory(categoryItem.id)} className="admin-button delete-button">Desactivar</button>
                                                )}
                                                {!categoryItem.is_active && (
                                                    <button className="admin-button activate-button" disabled>Ya Inactiva</button>
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

export default AdminNewsPage;
