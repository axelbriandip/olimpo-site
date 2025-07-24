// src/services/history.service.js
import axiosInstance from '../utils/axiosConfig';
import uploadService from './upload.service'; // <--- IMPORTA EL SERVICIO DE SUBIDA GENÉRICO

const historyService = {
    // --- Eventos Históricos ---
    /**
     * Obtiene todos los eventos históricos.
     * @returns {Promise<Array>} Un array de objetos de evento histórico.
     */
    getAllHistoryEvents: async () => {
        try {
            const response = await axiosInstance.get('/history-events');
            return response.data;
        } catch (error) {
            console.error('Error al obtener todos los eventos históricos:', error.response?.data || error.message);
            throw error;
        }
    },

    /**
     * Obtiene un evento histórico por su ID.
     * @param {string} id - El ID del evento histórico.
     * @returns {Promise<Object>} Un objeto de evento histórico.
     */
    getHistoryEventById: async (id) => {
        try {
            const response = await axiosInstance.get(`/history-events/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error al obtener evento histórico con ID ${id}:`, error.response?.data || error.message);
            throw error;
        }
    },

    /**
     * Crea un nuevo evento histórico.
     * @param {Object} eventData - Los datos del evento histórico.
     * @returns {Promise<Object>} El objeto del evento histórico creado.
     */
    createHistoryEvent: async (eventData) => {
        try {
            const response = await axiosInstance.post('/history-events', eventData);
            return response.data;
        } catch (error) {
            console.error('Error al crear evento histórico:', error.response?.data || error.message);
            throw error;
        }
    },

    /**
     * Actualiza un evento histórico existente.
     * @param {string} id - El ID del evento histórico a actualizar.
     * @param {Object} eventData - Los datos a actualizar del evento histórico.
     * @returns {Promise<Object>} El objeto del evento histórico actualizado.
     */
    updateHistoryEvent: async (id, eventData) => {
        try {
            const response = await axiosInstance.put(`/history-events/${id}`, eventData);
            return response.data;
        } catch (error) {
            console.error(`Error al actualizar evento histórico con ID ${id}:`, error.response?.data || error.message);
            throw error;
        }
    },

    /**
     * Realiza un borrado suave de un evento histórico.
     * @param {string} id - El ID del evento histórico a desactivar.
     * @returns {Promise<Object>} Mensaje de confirmación.
     */
    softDeleteHistoryEvent: async (id) => {
        try {
            const response = await axiosInstance.put(`/history-events/delete/${id}`); // Asume esta ruta en tu backend
            return response.data;
        } catch (error) {
            console.error(`Error al desactivar evento histórico con ID ${id}:`, error.response?.data || error.message);
            throw error;
        }
    },

    // --- Subsecciones Históricas ---
    /**
     * Obtiene todas las subsecciones históricas (o filtradas por eventId).
     * @param {string} [eventId] - Opcional: ID del evento para filtrar subsecciones.
     * @returns {Promise<Array>} Un array de objetos de subsección histórica.
     */
    getAllHistorySubsections: async (eventId = '') => {
        try {
            const url = eventId ? `/history-subsections?eventId=${eventId}` : '/history-subsections';
            const response = await axiosInstance.get(url);
            return response.data;
        } catch (error) {
            console.error('Error al obtener todas las subsecciones históricas:', error.response?.data || error.message);
            throw error;
        }
    },

    /**
     * Obtiene una subsección histórica por su ID.
     * @param {string} id - El ID de la subsección histórica.
     * @returns {Promise<Object>} Un objeto de subsección histórica.
     */
    getHistorySubsectionById: async (id) => {
        try {
            const response = await axiosInstance.get(`/history-subsections/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error al obtener subsección histórica con ID ${id}:`, error.response?.data || error.message);
            throw error;
        }
    },

    /**
     * Crea una nueva subsección histórica.
     * @param {Object} subsectionData - Los datos de la subsección histórica.
     * @returns {Promise<Object>} El objeto de la subsección histórica creada.
     */
    createHistorySubsection: async (subsectionData) => {
        try {
            const response = await axiosInstance.post('/history-subsections', subsectionData);
            return response.data;
        } catch (error) {
            console.error('Error al crear subsección histórica:', error.response?.data || error.message);
            throw error;
        }
    },

    /**
     * Actualiza una subsección histórica existente.
     * @param {string} id - El ID de la subsección histórica a actualizar.
     * @param {Object} subsectionData - Los datos a actualizar de la subsección histórica.
     * @returns {Promise<Object>} El objeto de la subsección histórica actualizada.
     */
    updateHistorySubsection: async (id, subsectionData) => {
        try {
            const response = await axiosInstance.put(`/history-subsections/${id}`, subsectionData);
            return response.data;
        } catch (error) {
            console.error(`Error al actualizar subsección histórica con ID ${id}:`, error.response?.data || error.message);
            throw error;
        }
    },

    /**
     * Realiza un borrado suave de una subsección histórica.
     * @param {string} id - El ID de la subsección histórica a desactivar.
     * @returns {Promise<Object>} Mensaje de confirmación.
     */
    softDeleteHistorySubsection: async (id) => {
        try {
            const response = await axiosInstance.put(`/history-subsections/delete/${id}`); // Asume esta ruta en tu backend
            return response.data;
        } catch (error) {
            console.error(`Error al desactivar subsección histórica con ID ${id}:`, error.response?.data || error.message);
            throw error;
        }
    },

    /**
     * Sube una imagen para un evento o subsección histórica usando el servicio de subida genérico.
     * @param {File} imageFile - El archivo de imagen a subir.
     * @param {string} type - 'event' o 'subsection' para determinar la carpeta de destino en el backend.
     * @returns {Promise<string>} La URL pública de la imagen subida.
     */
    uploadImage: async (imageFile, type) => {
        // Delega la subida al servicio de subida genérico, especificando el tipo 'history/event' o 'history/subsection'
        return await uploadService.uploadImage(imageFile, `history/${type}`);
    },
};

export default historyService;
