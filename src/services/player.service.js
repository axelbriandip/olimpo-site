// src/services/player.service.js
import axiosInstance from '../utils/axiosConfig';
import uploadService from './upload.service'; // <--- IMPORTA EL SERVICIO DE SUBIDA GENÉRICO

const PLAYER_API_URL = '/players'; // Asume tu endpoint para jugadores

const playerService = {
    /**
     * Obtiene todos los jugadores.
     * @returns {Promise<Array>} Un array de objetos de jugador.
     */
    getAllPlayers: async () => {
        try {
            const response = await axiosInstance.get(PLAYER_API_URL);
            return response.data;
        } catch (error) {
            console.error('Error al obtener jugadores:', error.response?.data || error.message);
            throw error;
        }
    },

    /**
     * Obtiene un jugador por su ID.
     * @param {string} id - El ID del jugador.
     * @returns {Promise<Object>} Un objeto de jugador.
     */
    getPlayerById: async (id) => {
        try {
            const response = await axiosInstance.get(`${PLAYER_API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error al obtener jugador con ID ${id}:`, error.response?.data || error.message);
            throw error;
        }
    },

    /**
     * Crea un nuevo jugador.
     * @param {Object} playerData - Los datos del jugador.
     * @returns {Promise<Object>} El objeto del jugador creado.
     */
    createPlayer: async (playerData) => {
        try {
            const response = await axiosInstance.post(PLAYER_API_URL, playerData);
            return response.data;
        } catch (error) {
            console.error('Error al crear jugador:', error.response?.data || error.message);
            throw error;
        }
    },

    /**
     * Actualiza un jugador existente.
     * @param {string} id - El ID del jugador a actualizar.
     * @param {Object} playerData - Los datos a actualizar del jugador.
     * @returns {Promise<Object>} El objeto del jugador actualizado.
     */
    updatePlayer: async (id, playerData) => {
        try {
            const response = await axiosInstance.put(`${PLAYER_API_URL}/${id}`, playerData);
            return response.data;
        } catch (error) {
            console.error(`Error al actualizar jugador con ID ${id}:`, error.response?.data || error.message);
            throw error;
        }
    },

    /**
     * Realiza un borrado suave de un jugador (marca como inactivo).
     * @param {string} id - El ID del jugador a desactivar.
     * @returns {Promise<Object>} Mensaje de confirmación.
     */
    softDeletePlayer: async (id) => {
        try {
            const response = await axiosInstance.put(`${PLAYER_API_URL}/delete/${id}`); // Asume esta ruta en tu backend
            return response.data;
        } catch (error) {
            console.error(`Error al desactivar jugador con ID ${id}:`, error.response?.data || error.message);
            throw error;
        }
    },

    /**
     * Sube una imagen de jugador usando el servicio de subida genérico.
     * @param {File} imageFile - El archivo de imagen a subir.
     * @returns {Promise<string>} La URL pública de la imagen subida.
     */
    uploadImage: async (imageFile) => {
        // Delega la subida al servicio de subida genérico, especificando el tipo 'players'
        return await uploadService.uploadImage(imageFile, 'players');
    },
};

export default playerService;
