// src/services/player.service.js
import axiosInstance from '../utils/axiosConfig'; // Asegúrate de que la ruta sea correcta

const playerService = {
    /**
     * Obtiene todos los jugadores activos.
     * @returns {Promise<Array>} Un array de objetos de jugador.
     */
    getAllPlayers: async () => {
        try {
            const response = await axiosInstance.get('/players');
            return response.data;
        } catch (error) {
            console.error('Error fetching players:', error);
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
            const response = await axiosInstance.get(`/players/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching player with ID ${id}:`, error);
            throw error;
        }
    },

    /**
     * Sube una imagen al servidor.
     * @param {File} imageFile - El archivo de imagen a subir.
     * @returns {Promise<string>} La URL pública de la imagen subida.
     */
    uploadImage: async (imageFile) => {
        try {
            const formData = new FormData();
            formData.append('image', imageFile); // 'image' debe coincidir con el nombre del campo en Multer (upload.single('image'))

            const response = await axiosInstance.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Importante para la subida de archivos
                },
            });
            return response.data.fileUrl; // Devuelve la URL pública de la imagen
        } catch (error) {
            console.error('Error uploading image:', error.response?.data || error.message);
            throw error;
        }
    },

    /**
     * Crea un nuevo jugador.
     * @param {Object} playerData - Los datos del jugador (sin la imagen en sí, solo la URL si ya se subió).
     * @returns {Promise<Object>} El objeto del jugador creado.
     */
    createPlayer: async (playerData) => {
        try {
            const response = await axiosInstance.post('/players', playerData);
            return response.data;
        } catch (error) {
            console.error('Error creating player:', error.response?.data || error.message);
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
            const response = await axiosInstance.put(`/players/${id}`, playerData);
            return response.data;
        } catch (error) {
            console.error(`Error updating player with ID ${id}:`, error.response?.data || error.message);
            throw error;
        }
    },

    /**
     * Realiza un borrado suave de un jugador.
     * @param {string} id - El ID del jugador a desactivar.
     * @returns {Promise<Object>} Mensaje de confirmación.
     */
    softDeletePlayer: async (id) => {
        try {
            const response = await axiosInstance.put(`/players/delete/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error soft deleting player with ID ${id}:`, error.response?.data || error.message);
            throw error;
        }
    },
};

export default playerService;