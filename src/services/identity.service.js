// src/services/identity.service.js
import axiosInstance from '../utils/axiosConfig';

const identityService = {
    getIdentity: async () => {
        try {
            const response = await axiosInstance.get('/identity');
            return response.data;
        } catch (error) {
            console.error('Error fetching identity:', error);
            throw error;
        }
    },

    updateIdentity: async (identityData) => { // identityData DEBE tener todos los campos obligatorios
        try {
            const response = await axiosInstance.put('/identity', identityData);
            return response.data;
        } catch (error) {
            console.error('Error updating identity:', error);
            throw error;
        }
    },
};

export default identityService;