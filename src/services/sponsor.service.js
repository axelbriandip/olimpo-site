// src/services/sponsor.service.js
import axiosInstance from '../utils/axiosConfig';
import uploadService from './upload.service'; // Importa el servicio de subida genérico

const SPONSOR_API_URL = '/sponsors'; // Asume tu endpoint para sponsors

const sponsorService = {
    /**
     * Obtiene todos los sponsors activos.
     * @returns {Promise<Array>} Un array de objetos de sponsor.
     */
    getAllSponsors: async () => {
        try {
            const response = await axiosInstance.get(SPONSOR_API_URL);
            return response.data;
        } catch (error) {
            console.error('Error al obtener todos los sponsors:', error);
            throw error;
        }
    },

    /**
     * Obtiene un sponsor por su ID.
     * @param {string} id - El ID del sponsor.
     * @returns {Promise<Object>} Un objeto de sponsor.
     */
    getSponsorById: async (id) => {
        try {
            const response = await axiosInstance.get(`${SPONSOR_API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error al obtener sponsor con ID ${id}:`, error);
            throw error;
        }
    },

    /**
     * Crea un nuevo sponsor.
     * @param {Object} sponsorData - Los datos del sponsor.
     * @returns {Promise<Object>} El objeto del sponsor creado.
     */
    createSponsor: async (sponsorData) => {
        try {
            const response = await axiosInstance.post(SPONSOR_API_URL, sponsorData);
            return response.data;
        } catch (error) {
            console.error('Error al crear sponsor:', error.response?.data || error.message);
            throw error;
        }
    },

    /**
     * Actualiza un sponsor existente.
     * @param {string} id - El ID del sponsor a actualizar.
     * @param {Object} sponsorData - Los datos a actualizar del sponsor.
     * @returns {Promise<Object>} El objeto del sponsor actualizado.
     */
    updateSponsor: async (id, sponsorData) => {
        try {
            const response = await axiosInstance.put(`${SPONSOR_API_URL}/${id}`, sponsorData);
            return response.data;
        } catch (error) {
            console.error(`Error al actualizar sponsor con ID ${id}:`, error.response?.data || error.message);
            throw error;
        }
    },

    /**
     * Realiza un borrado suave de un sponsor (marca como inactivo).
     * @param {string} id - El ID del sponsor a desactivar.
     * @returns {Promise<Object>} Mensaje de confirmación.
     */
    softDeleteSponsor: async (id) => {
        try {
            const response = await axiosInstance.put(`${SPONSOR_API_URL}/delete/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error al desactivar sponsor con ID ${id}:`, error.response?.data || error.message);
            throw error;
        }
    },

    /**
     * Sube un logo para un sponsor.
     * @param {File} imageFile - El archivo de imagen a subir.
     * @param {string} logoType - El tipo de logo ('main', 'black', 'white').
     * @returns {Promise<string>} La URL pública de la imagen subida.
     */
    uploadLogo: async (imageFile, logoType) => {
        // Delega la subida al servicio de subida genérico, especificando el tipo para sponsors
        // El 'type' enviado al uploadService.uploadImage será 'sponsors-main', 'sponsors-black', 'sponsors-white'
        return await uploadService.uploadImage(imageFile, `sponsors-${logoType}`);
    },
};

export default sponsorService;
