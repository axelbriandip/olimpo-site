// src/services/identity.service.js
import axiosInstance from '../utils/axiosConfig';

const IDENTITY_API_URL = '/identity'; // Asume tu endpoint para la identidad

const identityService = {
    /**
     * Obtiene la información de identidad del club.
     * Asume que solo hay un registro de identidad o que el backend devuelve el principal.
     * @returns {Promise<Object>} El objeto de identidad del club.
     */
    getIdentity: async () => {
        try {
            const response = await axiosInstance.get(IDENTITY_API_URL);
            return response.data;
        } catch (error) {
            console.error('Error al obtener la identidad del club:', error.response?.data || error.message);
            throw error;
        }
    },

    /**
     * Actualiza la información de identidad del club.
     * @param {string} id - El ID del registro de identidad a actualizar.
     * @param {Object} identityData - Los datos a actualizar.
     * @returns {Promise<Object>} El objeto de identidad actualizado.
     */
    updateIdentity: async (id, identityData) => {
        try {
            const response = await axiosInstance.put(`${IDENTITY_API_URL}/${id}`, identityData);
            return response.data;
        } catch (error) {
            console.error(`Error al actualizar la identidad del club con ID ${id}:`, error.response?.data || error.message);
            throw error;
        }
    },

    /**
     * Crea un nuevo registro de identidad del club.
     * Esto solo se usaría si no hay un registro existente y necesitas crear el primero.
     * @param {Object} identityData - Los datos iniciales de la identidad.
     * @returns {Promise<Object>} El objeto de identidad creado.
     */
    createIdentity: async (identityData) => {
        try {
            const response = await axiosInstance.post(IDENTITY_API_URL, identityData);
            return response.data;
        } catch (error) {
            console.error('Error al crear la identidad del club:', error.response?.data || error.message);
            throw error;
        }
    },
};

export default identityService;
