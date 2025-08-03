// src/services/upload.service.js
import axiosInstance from '../utils/axiosConfig';

const uploadService = {
    /**
     * Sube un archivo de imagen a la ruta de subida genérica del backend.
     * @param {File} imageFile - El archivo de imagen a subir.
     * @returns {Promise<string>} La URL pública de la imagen subida.
     */
    uploadImage: async (imageFile) => {
        try {
            const formData = new FormData();
            // ¡IMPORTANTE! El nombre del campo debe coincidir con el del middleware de Multer.
            // En nuestro caso, el backend espera 'file'.
            formData.append('file', imageFile);

            // La URL de subida ahora es una única ruta genérica para todos los archivos.
            const uploadUrl = '/api/upload';

            const response = await axiosInstance.post(uploadUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // El backend devuelve la URL de la imagen en fileUrl
            return response.data.fileUrl;
        } catch (error) {
            console.error(`Error al subir imagen:`, error.response?.data || error.message);
            throw error;
        }
    },
};

export default uploadService;
