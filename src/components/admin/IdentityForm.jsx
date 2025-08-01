// src/components/admin/IdentityForm.jsx
import React, { useState, useEffect } from 'react';
import identityService from '../../services/identity.service';
import uploadService from '../../services/upload.service';

const IdentityForm = ({ identity, onSave }) => {
    const initialFormData = {
        missionText: '',
        missionImageUrl: '',
        visionText: '',
        visionImageUrl: '',
        valuesText: '',
        valuesImageUrl: '',
        is_active: true,
    };

    const [formData, setFormData] = useState(initialFormData);
    const [selectedMissionFile, setSelectedMissionFile] = useState(null);
    const [missionPreview, setMissionPreview] = useState('');
    const [selectedVisionFile, setSelectedVisionFile] = useState(null);
    const [visionPreview, setVisionPreview] = useState('');
    const [selectedValuesFile, setSelectedValuesFile] = useState(null);
    const [valuesPreview, setValuesPreview] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        if (identity) {
            setFormData({
                missionText: identity.missionText || '',
                missionImageUrl: identity.missionImageUrl || '',
                visionText: identity.visionText || '',
                visionImageUrl: identity.visionImageUrl || '',
                valuesText: identity.valuesText || '',
                valuesImageUrl: identity.valuesImageUrl || '',
                is_active: identity.is_active,
            });
            setMissionPreview(identity.missionImageUrl || '');
            setVisionPreview(identity.visionImageUrl || '');
            setValuesPreview(identity.valuesImageUrl || '');
        } else {
            setFormData(initialFormData);
            setMissionPreview('');
            setVisionPreview('');
            setValuesPreview('');
            setSelectedMissionFile(null);
            setSelectedVisionFile(null);
            setSelectedValuesFile(null);
        }
        setError(null);
        setMessage(null);
    }, [identity]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    // Función modificada: Ya no resetea el valor del input aquí
    const handleFileChange = (setterFile, setterPreview, currentUrl) => (e) => {
        const file = e.target.files[0];
        setterFile(file);
        if (file) {
            setterPreview(URL.createObjectURL(file));
        } else {
            setterPreview(currentUrl || '');
        }
        // ¡IMPORTANTE! La línea que reseteaba el input ha sido eliminada de aquí.
        // El input se reseteará solo cuando se haga clic en el botón 'X'.
    };

    const handleRemoveImage = (setterFile, setterPreview, fieldName, fileInputId) => () => {
        setterFile(null);
        setterPreview('');
        setFormData(prev => ({ ...prev, [fieldName]: '' }));
        // Resetear el input file para que se muestre "Sin archivos seleccionados" y permita subir la misma imagen
        if (document.getElementById(fileInputId)) {
            document.getElementById(fileInputId).value = '';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setMessage(null);

        try {
            let finalMissionImageUrl = formData.missionImageUrl;
            if (selectedMissionFile) {
                finalMissionImageUrl = await uploadService.uploadImage(selectedMissionFile, 'identity/mission'); // Ruta corregida
            } else if (formData.missionImageUrl === '' && !selectedMissionFile && identity?.missionImageUrl) {
                finalMissionImageUrl = null;
            }

            let finalVisionImageUrl = formData.visionImageUrl;
            if (selectedVisionFile) {
                finalVisionImageUrl = await uploadService.uploadImage(selectedVisionFile, 'identity/vision'); // Ruta corregida
            } else if (formData.visionImageUrl === '' && !selectedVisionFile && identity?.visionImageUrl) {
                finalVisionImageUrl = null;
            }

            let finalValuesImageUrl = formData.valuesImageUrl;
            if (selectedValuesFile) {
                finalValuesImageUrl = await uploadService.uploadImage(selectedValuesFile, 'identity/values'); // Ruta corregida
            } else if (formData.valuesImageUrl === '' && !selectedValuesFile && identity?.valuesImageUrl) {
                finalValuesImageUrl = null;
            }

            const dataToSave = {
                ...formData,
                missionImageUrl: finalMissionImageUrl,
                visionImageUrl: finalVisionImageUrl,
                valuesImageUrl: finalValuesImageUrl,
            };

            if (identity && identity.id) {
                await identityService.updateIdentity(identity.id, dataToSave);
            } else {
                await identityService.createIdentity(dataToSave);
            }
            onSave();
            setMessage("¡Identidad del club guardada exitosamente!");
        } catch (err) {
            console.error("Error al guardar la identidad:", err);
            setError(err.response?.data?.message || err.message || 'Error al guardar la identidad.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="identity-form-container">
            <h3>Gestión de Identidad del Club</h3>
            {message && <p className="identity-form-success-text">{message}</p>}
            {error && <p className="identity-form-error-text">{error}</p>}
            <form onSubmit={handleSubmit} className="identity-form">

                {/* Sección de Misión */}
                <div className="form-section-header">
                    <h4>Misión</h4>
                </div>
                <div className="form-group">
                    <label htmlFor="missionText">Texto de la Misión: <span className="required-star">*</span></label>
                    <textarea id="missionText" name="missionText" value={formData.missionText} onChange={handleChange} rows="4" required></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="missionImage">Imagen de Misión:</label>
                    <input type="file" id="missionImage" name="missionImage" accept="image/*" onChange={handleFileChange(setSelectedMissionFile, setMissionPreview, formData.missionImageUrl)} />
                    {missionPreview && (
                        <div className="identity-form-img-preview-wrapper">
                            <img src={missionPreview} alt="Misión Preview" className="identity-form-img-preview" />
                            <button type="button" className="remove-image-button" onClick={handleRemoveImage(setSelectedMissionFile, setMissionPreview, 'missionImageUrl', 'missionImage')}>X</button>
                        </div>
                    )}
                </div>

                {/* Sección de Visión */}
                <div className="form-section-header">
                    <h4>Visión</h4>
                </div>
                <div className="form-group">
                    <label htmlFor="visionText">Texto de la Visión: <span className="required-star">*</span></label>
                    <textarea id="visionText" name="visionText" value={formData.visionText} onChange={handleChange} rows="4" required></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="visionImage">Imagen de Visión:</label>
                    <input type="file" id="visionImage" name="visionImage" accept="image/*" onChange={handleFileChange(setSelectedVisionFile, setVisionPreview, formData.visionImageUrl)} />
                    {visionPreview && (
                        <div className="identity-form-img-preview-wrapper">
                            <img src={visionPreview} alt="Visión Preview" className="identity-form-img-preview" />
                            <button type="button" className="remove-image-button" onClick={handleRemoveImage(setSelectedVisionFile, setVisionPreview, 'visionImageUrl', 'visionImage')}>X</button>
                        </div>
                    )}
                </div>

                {/* Sección de Valores */}
                <div className="form-section-header">
                    <h4>Valores</h4>
                </div>
                <div className="form-group">
                    <label htmlFor="valuesText">Texto de los Valores: <span className="required-star">*</span></label>
                    <textarea id="valuesText" name="valuesText" value={formData.valuesText} onChange={handleChange} rows="4" required></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="valuesImage">Imagen de Valores:</label>
                    <input type="file" id="valuesImage" name="valuesImage" accept="image/*" onChange={handleFileChange(setSelectedValuesFile, setValuesPreview, formData.valuesImageUrl)} />
                    {valuesPreview && (
                        <div className="identity-form-img-preview-wrapper">
                            <img src={valuesPreview} alt="Valores Preview" className="identity-form-img-preview" />
                            <button type="button" className="remove-image-button" onClick={handleRemoveImage(setSelectedValuesFile, setValuesPreview, 'valuesImageUrl', 'valuesImage')}>X</button>
                        </div>
                    )}
                </div>

                <div className="form-group form-group-checkbox">
                    <label>
                        <input type="checkbox" name="is_active" checked={formData.is_active} onChange={handleChange} />
                        Activo
                    </label>
                </div>

                <div className="identity-form-button-group">
                    <button type="submit" className="identity-form-submit-button" disabled={isLoading}>
                        {isLoading ? 'Guardando...' : 'Guardar Identidad'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default IdentityForm;
