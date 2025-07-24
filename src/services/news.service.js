// src/services/news.service.js
import axiosInstance from '../utils/axiosConfig';
import uploadService from './upload.service'; // <--- IMPORTA EL SERVICIO DE SUBIDA GENÉRICO

const NEWS_API_URL = '/news'; // Asume tu endpoint para noticias

const newsService = {
    /**
     * Obtiene todas las noticias activas.
     * @returns {Promise<Array>} Un array de objetos de noticia.
     */
    getAllNews: async () => {
        try {
            const response = await axiosInstance.get(NEWS_API_URL);
            return response.data;
        } catch (error) {
            console.error('Error al obtener todas las noticias:', error);
            throw error;
        }
    },

    /**
     * Obtiene una noticia por su ID.
     * @param {string} id - El ID de la noticia.
     * @returns {Promise<Object>} Un objeto de noticia.
     */
    getNewsById: async (id) => {
        try {
            const response = await axiosInstance.get(`${NEWS_API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error al obtener noticia con ID ${id}:`, error);
            throw error;
        }
    },

    /**
     * Crea una nueva noticia.
     * @param {Object} newsData - Los datos de la noticia (sin la imagen en sí, solo la URL si ya se subió).
     * @returns {Promise<Object>} El objeto de la noticia creada.
     */
    createNews: async (newsData) => {
        try {
            const response = await axiosInstance.post(NEWS_API_URL, newsData);
            return response.data;
        } catch (error) {
            console.error('Error al crear noticia:', error.response?.data || error.message);
            throw error;
        }
    },

    /**
     * Actualiza una noticia existente.
     * @param {string} id - El ID de la noticia a actualizar.
     * @param {Object} newsData - Los datos a actualizar de la noticia.
     * @returns {Promise<Object>} El objeto de la noticia actualizada.
     */
    updateNews: async (id, newsData) => {
        try {
            const response = await axiosInstance.put(`${NEWS_API_URL}/${id}`, newsData);
            return response.data;
        } catch (error) {
            console.error(`Error al actualizar noticia con ID ${id}:`, error.response?.data || error.message);
            throw error;
        }
    },

    /**
     * Realiza un borrado suave de una noticia (marca como inactiva).
     * @param {string} id - El ID de la noticia a desactivar.
     * @returns {Promise<Object>} Mensaje de confirmación.
     */
    softDeleteNews: async (id) => {
        try {
            // Asumiendo que tu backend tiene una ruta PUT para soft delete, por ejemplo /news/delete/:id
            const response = await axiosInstance.put(`${NEWS_API_URL}/delete/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error al desactivar noticia con ID ${id}:`, error.response?.data || error.message);
            throw error;
        }
    },

    /**
     * Sube una imagen destacada para una noticia usando el servicio de subida genérico.
     * @param {File} imageFile - El archivo de imagen a subir.
     * @returns {Promise<string>} La URL pública de la imagen subida.
     */
    uploadImage: async (imageFile) => {
        // Delega la subida al servicio de subida genérico, especificando el tipo 'news'
        return await uploadService.uploadImage(imageFile, 'news');
    },
};

export default newsService;
