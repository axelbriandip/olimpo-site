// src/services/team.service.js
import axiosInstance from '../utils/axiosConfig';

const teamService = {
    getAllTeams: async () => {
        try {
            const response = await axiosInstance.get('/teams'); // Asume tu endpoint de equipos
            return response.data;
        } catch (error) {
            console.error('Error fetching teams:', error.response?.data || error.message);
            throw error;
        }
    },
    // Puedes añadir más funciones si las necesitas (getById, create, update, delete)
};

export default teamService;