// src/services/category.service.js
import axiosInstance from '../utils/axiosConfig';

const CATEGORY_API_URL = '/categories'; // Asume tu endpoint para categorías

const categoryService = {
    /**
     * Obtiene todas las categorías activas.
     * @returns {Promise<Array>} Un array de objetos de categoría.
     */
    getAllCategories: async () => {
        try {
            const response = await axiosInstance.get(CATEGORY_API_URL);
            // Asume que el backend devuelve solo categorías activas o que puedes filtrarlas aquí
            return response.data.filter(cat => cat.is_active);
        } catch (error) {
            console.error('Error al obtener todas las categorías:', error);
            throw error;
        }
    },

    /**
     * Obtiene una categoría por ID.
     * @param {string} id - El ID de la categoría.
     * @returns {Promise<Object>} Un objeto de categoría.
     */
    getCategoryById: async (id) => {
        try {
            const response = await axiosInstance.get(`${CATEGORY_API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error al obtener categoría con ID ${id}:`, error);
            throw error;
        }
    },

    /**
     * Crea una nueva categoría.
     * @param {Object} categoryData - Los datos de la categoría a crear.
     * @returns {Promise<Object>} El objeto de la categoría creada.
     */
    createCategory: async (categoryData) => {
        try {
            const response = await axiosInstance.post(CATEGORY_API_URL, categoryData);
            return response.data;
        } catch (error) {
            console.error('Error al crear categoría:', error.response?.data || error.message);
            throw error;
        }
    },

    /**
     * Actualiza una categoría existente.
     * @param {string} id - El ID de la categoría a actualizar.
     * @param {Object} categoryData - Los datos a actualizar de la categoría.
     * @returns {Promise<Object>} El objeto de la categoría actualizada.
     */
    updateCategory: async (id, categoryData) => {
        try {
            const response = await axiosInstance.put(`${CATEGORY_API_URL}/${id}`, categoryData);
            return response.data;
        } catch (error) {
            console.error(`Error al actualizar categoría con ID ${id}:`, error.response?.data || error.message);
            throw error;
        }
    },

    /**
     * Realiza un borrado suave de una categoría (establece is_active en false).
     * @param {string} id - El ID de la categoría a desactivar.
     * @returns {Promise<Object>} Mensaje de confirmación.
     */
    softDeleteCategory: async (id) => {
        try {
            const response = await axiosInstance.put(`${CATEGORY_API_URL}/delete/${id}`); // Asume esta ruta en tu backend
            return response.data;
        } catch (error) {
            console.error(`Error al desactivar categoría con ID ${id}:`, error.response?.data || error.message);
            throw error;
        }
    },
};

export default categoryService;
