// src/services/match.service.js
import axiosInstance from '../utils/axiosConfig';

const matchService = {
    getAllMatches: async () => {
        try {
            const response = await axiosInstance.get('/matches');
            return response.data;
        } catch (error) {
            console.error('Error fetching matches:', error.response?.data || error.message);
            throw error;
        }
    },
    getMatchById: async (id) => {
        try {
            const response = await axiosInstance.get(`/matches/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching match with ID ${id}:`, error.response?.data || error.message);
            throw error;
        }
    },
    createMatch: async (matchData) => {
        try {
            const response = await axiosInstance.post('/matches', matchData);
            return response.data;
        } catch (error) {
            console.error('Error creating match:', error.response?.data || error.message);
            throw error;
        }
    },
    updateMatch: async (id, matchData) => {
        try {
            const response = await axiosInstance.put(`/matches/${id}`, matchData);
            return response.data;
        } catch (error) {
            console.error(`Error updating match with ID ${id}:`, error.response?.data || error.message);
            throw error;
        }
    },
    softDeleteMatch: async (id) => {
        try {
            const response = await axiosInstance.put(`/matches/delete/${id}`); // Asume esta ruta en tu backend
            return response.data;
        } catch (error) {
            console.error(`Error soft deleting match with ID ${id}:`, error.response?.data || error.message);
            throw error;
        }
    },
};

export default matchService;