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
                uploadUrl = '/upload/players';
            } else if (type === 'news') {
                uploadUrl = '/upload/news';
            } else if (type.startsWith('history/')) {
                uploadUrl = `/upload/${type}`;
            } else if (type.startsWith('identity-')) { // Para 'identity-logo', 'identity-hero', 'identity-mission', 'identity-vision', 'identity-values'
                const subType = type.split('-')[1]; // Extrae 'logo', 'hero', 'mission', 'vision', 'values'
                uploadUrl = `/upload/identity/${subType}`;
            } else if (type === 'monthly-player-image') {
                uploadUrl = '/upload/monthly-player-image';
            } else if (type === 'testimonial-photo') {
                uploadUrl = '/upload/testimonial-photo';
            } else if (type.startsWith('sponsors-')) { // <--- NUEVO: Para 'sponsors-main', 'sponsors-black', 'sponsors-white'
                const subType = type.split('-')[1]; // Extrae 'main', 'black', 'white'
                uploadUrl = `/upload/sponsors/${subType}`;
            }
            else {
                throw new Error('Tipo de subida de imagen no reconocido.');
            }

            const response = await axiosInstance.post(uploadUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data.imageUrl || response.data.fileUrl;
        } catch (error) {
            console.error(`Error al subir imagen de tipo ${type}:`, error.response?.data || error.message);
            throw error;
        }
    },
};

export default uploadService;
