// src/services/upload.service.js
import axiosInstance from '../utils/axiosConfig';

const uploadService = {
    /**
     * Sube un archivo de imagen a un endpoint específico.
     * @param {File} imageFile - El archivo de imagen a subir.
     * @param {string} type - El tipo de imagen para determinar la ruta del backend (ej. 'players', 'news', 'history/event', 'history/subsection', 'identity/logo', 'identity/hero', 'identity/mission', 'identity/vision', 'identity/values', 'monthly-player-image', 'testimonial-photo').
     * @returns {Promise<string>} La URL pública de la imagen subida.
     */
    uploadImage: async (imageFile, type) => {
        try {
            const formData = new FormData();
            // ¡ESTA ES LA LÍNEA CLAVE! Siempre enviamos el archivo con la etiqueta 'imageFile'
            formData.append('imageFile', imageFile);

            // Construye la URL de subida dinámica basada en el 'type'
            let uploadUrl;
            if (type === 'players') {
                uploadUrl = '/upload/players';
            } else if (type === 'news') {
                uploadUrl = '/upload/news';
            } else if (type.startsWith('history/')) { // Para 'history/event' o 'history/subsection'
                uploadUrl = `/upload/${type}`;
            } else if (type.startsWith('identity/')) { // Para 'identity/logo', 'identity/hero', 'identity/mission', 'identity/vision', 'identity/values'
                uploadUrl = `/upload/${type}`;
            } else if (type === 'monthly-player-image') {
                uploadUrl = '/upload/monthly-player-image';
            } else if (type === 'testimonial-photo') {
                uploadUrl = '/upload/testimonial-photo';
            } else {
                throw new Error('Tipo de subida de imagen no reconocido.');
            }

            const response = await axiosInstance.post(uploadUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // El backend debe devolver la URL de la imagen en 'imageUrl' o 'fileUrl'
            return response.data.imageUrl || response.data.fileUrl;
        } catch (error) {
            console.error(`Error al subir imagen de tipo ${type}:`, error.response?.data || error.message);
            throw error;
        }
    },
};

export default uploadService;
