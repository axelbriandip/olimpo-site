// src/services/monthlyPlayer.service.js
import axiosInstance from '../utils/axiosConfig';

const MONTHLY_PLAYER_API_URL = '/monthly-player'; // Asume tu endpoint para Jugador del Mes

const monthlyPlayerService = {
    /**
     * Obtiene todos los jugadores del mes.
     * @returns {Promise<Array>} Un array de objetos de jugador del mes.
     */
    getAllMonthlyPlayers: async () => {
        try {
            const response = await axiosInstance.get(MONTHLY_PLAYER_API_URL);
            return response.data;
        } catch (error) {
            console.error('Error al obtener jugadores del mes:', error.response?.data || error.message);
            throw error;
        }
    },

    /**
     * Obtiene un jugador del mes por su ID.
     * @param {string} id - El ID del jugador del mes.
     * @returns {Promise<Object>} Un objeto de jugador del mes.
     */
    getMonthlyPlayerById: async (id) => {
        try {
            const response = await axiosInstance.get(`${MONTHLY_PLAYER_API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error al obtener jugador del mes con ID ${id}:`, error.response?.data || error.message);
            throw error;
        }
    },

    /**
     * Crea un nuevo registro de jugador del mes.
     * @param {Object} monthlyPlayerData - Los datos del jugador del mes.
     * @returns {Promise<Object>} El objeto de jugador del mes creado.
     */
    createMonthlyPlayer: async (monthlyPlayerData) => {
        try {
            const response = await axiosInstance.post(MONTHLY_PLAYER_API_URL, monthlyPlayerData);
            return response.data;
        } catch (error) {
            console.error('Error al crear jugador del mes:', error.response?.data || error.message);
            throw error;
        }
    },

    /**
     * Actualiza un registro de jugador del mes existente.
     * @param {string} id - El ID del registro a actualizar.
     * @param {Object} monthlyPlayerData - Los datos a actualizar.
     * @returns {Promise<Object>} El objeto de jugador del mes actualizado.
     */
    updateMonthlyPlayer: async (id, monthlyPlayerData) => {
        try {
            const response = await axiosInstance.put(`${MONTHLY_PLAYER_API_URL}/${id}`, monthlyPlayerData);
            return response.data;
        } catch (error) {
            console.error(`Error al actualizar jugador del mes con ID ${id}:`, error.response?.data || error.message);
            throw error;
        }
    },

    /**
     * Realiza un borrado suave de un registro de jugador del mes.
     * @param {string} id - El ID del registro a desactivar.
     * @returns {Promise<Object>} Mensaje de confirmación.
     */
    softDeleteMonthlyPlayer: async (id) => {
        try {
            const response = await axiosInstance.put(`${MONTHLY_PLAYER_API_URL}/delete/${id}`); // Asume esta ruta en tu backend
            return response.data;
        } catch (error) {
            console.error(`Error al desactivar jugador del mes con ID ${id}:`, error.response?.data || error.message);
            throw error;
        }
    },
};

export default monthlyPlayerService;
