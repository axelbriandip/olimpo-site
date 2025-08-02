// src/services/upload.service.js
import axiosInstance from '../utils/axiosConfig';

const uploadService = {
    /**
     * Sube un archivo de imagen a un endpoint específico.
     * @param {File} imageFile - El archivo de imagen a subir.
     * @param {string} type - El tipo de imagen para determinar la ruta del backend (ej. 'players', 'news', 'history/event', 'history/subsection', 'identity-logo', 'identity-hero', 'monthly-player-image', 'testimonial-photo', 'sponsors-main', 'sponsors-black', 'sponsors-white').
     * @returns {Promise<string>} La URL pública de la imagen subida.
     */
    uploadImage: async (imageFile, type) => {
        try {
            const formData = new FormData();
            formData.append('imageFile', imageFile); // Usamos un nombre genérico para el campo

            // Construye la URL de subida dinámica
            let uploadUrl;
            if (type === 'players') {
                // CORRECCIÓN: Se agrega '/api'
                uploadUrl = '/api/upload/players';
            } else if (type === 'news') {
                // CORRECCIÓN: Se agrega '/api'
                uploadUrl = '/api/upload/news';
            } else if (type.startsWith('history/')) {
                // CORRECCIÓN: Se agrega '/api'
                uploadUrl = `/api/upload/${type}`;
            } else if (type.startsWith('identity-')) {
                const subType = type.split('-')[1];
                // CORRECCIÓN: Se agrega '/api'
                uploadUrl = `/api/upload/identity/${subType}`;
            } else if (type === 'monthly-player-image') {
                // CORRECCIÓN: Se agrega '/api'
                uploadUrl = '/api/upload/monthly-player-image';
            } else if (type === 'testimonial-photo') {
                // CORRECCIÓN: Se agrega '/api'
                uploadUrl = '/api/upload/testimonial-photo';
            } else if (type.startsWith('sponsors-')) {
                const subType = type.split('-')[1];
                // CORRECCIÓN: Se agrega '/api'
                uploadUrl = `/api/upload/sponsors/${subType}`;
            } else {
                throw new Error('Tipo de subida de imagen no reconocido.');
            }

            const response = await axiosInstance.post(uploadUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // El backend devuelve la URL de la imagen en imageUrl o fileUrl
            return response.data.imageUrl || response.data.fileUrl;
        } catch (error) {
            console.error(`Error al subir imagen de tipo ${type}:`, error.response?.data || error.message);
            throw error;
        }
    },
};

export default uploadService;
