// src/pages/AdminNewsPage.jsx
import React, { useState, useEffect } from 'react';
import NewsForm from '../components/admin/NewsForm'; // Asegúrate de la ruta correcta
import newsService from '../services/news.service'; // Para interactuar con la API de noticias

const AdminNewsPage = () => {
    const [showForm, setShowForm] = useState(false);
    const [selectedNews, setSelectedNews] = useState(null); // Para editar una noticia existente
    const [newsList, setNewsList] = useState([]);
    const [loadingNews, setLoadingNews] = useState(false);
    const [newsError, setNewsError] = useState(null);
    const [message, setMessage] = useState(null); // Para mensajes de éxito/error al usuario

    // Función para cargar las noticias desde el backend
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

    // Carga las noticias al montar el componente
    useEffect(() => {
        fetchNews();
    }, []);

    // Función que se pasa a NewsForm y se llama cuando se guarda/actualiza una noticia
    const handleSaveSuccess = () => {
        setShowForm(false); // Cierra el formulario
        setSelectedNews(null); // Limpia la noticia seleccionada
        fetchNews(); // Recarga la lista de noticias para ver los cambios
        setMessage("¡Noticia guardada exitosamente!"); // Muestra un mensaje de éxito
    };

    // Función para cerrar el formulario sin guardar
    const handleCloseForm = () => {
        setShowForm(false);
        setSelectedNews(null); // Limpia la noticia seleccionada al cerrar
        setMessage(null); // Limpia cualquier mensaje
    };

    // Función para abrir el formulario en modo "crear nueva noticia"
    const handleCreateNews = () => {
        setSelectedNews(null); // Asegura que no haya ninguna noticia precargada
        setShowForm(true);
    };

    // Función para abrir el formulario en modo "editar noticia existente"
    const handleEditNews = (newsItem) => {
        setSelectedNews(newsItem); // Pasa la noticia a editar
        setShowForm(true);
    };

    // Función para manejar el borrado suave de una noticia
    const handleSoftDeleteNews = async (id) => {
        if (window.confirm("¿Estás seguro de que quieres desactivar esta noticia?")) {
            try {
                await newsService.softDeleteNews(id);
                setMessage("Noticia desactivada exitosamente.");
                fetchNews(); // Recargar la lista
            } catch (err) {
                console.error("Error al desactivar noticia:", err);
                setNewsError(err.response?.data?.message || "Error al desactivar la noticia.");
            }
        }
    };


    return (
        <div className="admin-page-container">
            <h1>Administración de Noticias</h1>

            {message && <p className="success-message">{message}</p>}
            {newsError && <p className="error-message">{newsError}</p>}

            <button onClick={handleCreateNews} className="admin-button add-button">
                Añadir Nueva Noticia
            </button>

            {showForm && (
                <div className="admin-form-overlay"> {/* Esto podría ser un modal */}
                    <div className="admin-form-content">
                        <NewsForm
                            news={selectedNews} // Pasa la noticia a editar (o null para crear)
                            onClose={handleCloseForm} // Callback para cerrar el formulario
                            onSave={handleSaveSuccess} // Callback cuando se guarda exitosamente
                        />
                    </div>
                </div>
            )}

            {!showForm && ( // Muestra la lista solo si el formulario no está abierto
                <div className="admin-list-section">
                    <h2>Listado de Noticias</h2>
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
                                                <button onClick={() => handleSoftDeleteNews(newsItem.id)} className="admin-button activate-button" disabled>Ya Inactiva</button>
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
    );
};

export default AdminNewsPage;
