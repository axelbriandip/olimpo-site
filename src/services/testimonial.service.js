// src/services/testimonial.service.js
import axiosInstance from '../utils/axiosConfig';

const TESTIMONIAL_API_URL = '/testimonials'; // Asume tu endpoint para testimonios

const testimonialService = {
    /**
     * Obtiene todos los testimonios.
     * @returns {Promise<Array>} Un array de objetos de testimonio.
     */
    getAllTestimonials: async () => {
        try {
            const response = await axiosInstance.get(TESTIMONIAL_API_URL);
            return response.data;
        } catch (error) {
            console.error('Error al obtener testimonios:', error.response?.data || error.message);
            throw error;
        }
    },

    /**
     * Obtiene un testimonio por su ID.
     * @param {string} id - El ID del testimonio.
     * @returns {Promise<Object>} Un objeto de testimonio.
     */
    getTestimonialById: async (id) => {
        try {
            const response = await axiosInstance.get(`${TESTIMONIAL_API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error al obtener testimonio con ID ${id}:`, error.response?.data || error.message);
            throw error;
        }
    },

    /**
     * Crea un nuevo testimonio.
     * @param {Object} testimonialData - Los datos del testimonio.
     * @returns {Promise<Object>} El objeto de testimonio creado.
     */
    createTestimonial: async (testimonialData) => {
        try {
            const response = await axiosInstance.post(TESTIMONIAL_API_URL, testimonialData);
            return response.data;
        } catch (error) {
            console.error('Error al crear testimonio:', error.response?.data || error.message);
            throw error;
        }
    },

    /**
     * Actualiza un testimonio existente.
     * @param {string} id - El ID del testimonio a actualizar.
     * @param {Object} testimonialData - Los datos a actualizar.
     * @returns {Promise<Object>} El objeto de testimonio actualizado.
     */
    updateTestimonial: async (id, testimonialData) => {
        try {
            const response = await axiosInstance.put(`${TESTIMONIAL_API_URL}/${id}`, testimonialData);
            return response.data;
        } catch (error) {
            console.error(`Error al actualizar testimonio con ID ${id}:`, error.response?.data || error.message);
            throw error;
        }
    },

    /**
     * Realiza un borrado suave de un testimonio.
     * @param {string} id - El ID del testimonio a desactivar.
     * @returns {Promise<Object>} Mensaje de confirmación.
     */
    softDeleteTestimonial: async (id) => {
        try {
            const response = await axiosInstance.put(`${TESTIMONIAL_API_URL}/delete/${id}`); // Asume esta ruta en tu backend
            return response.data;
        } catch (error) {
            console.error(`Error al desactivar testimonio con ID ${id}:`, error.response?.data || error.message);
            throw error;
        }
    },
};

export default testimonialService;
