// src/components/admin/SponsorForm.jsx
import React, { useState, useEffect } from 'react';
import sponsorService from '../../services/sponsor.service'; // Asegúrate de que sponsor.service.js exista

const SponsorForm = ({ sponsor, onClose, onSave }) => {
    const initialFormData = {
        name: '',
        logoUrl: '',
        logoUrlBlack: '', // Nuevo campo
        logoUrlWhite: '', // Nuevo campo
        websiteUrl: '',
        level: 'Partner', // Valor por defecto
        startDate: '',
        endDate: '',
        is_active: true,
        order: '', // Puede ser un número o nulo
    };

    const [formData, setFormData] = useState(initialFormData);
    const [selectedFileMain, setSelectedFileMain] = useState(null);
    const [selectedFileBlack, setSelectedFileBlack] = useState(null);
    const [selectedFileWhite, setSelectedFileWhite] = useState(null);

    const [imagePreviewMain, setImagePreviewMain] = useState('');
    const [imagePreviewBlack, setImagePreviewBlack] = useState('');
    const [imagePreviewWhite, setImagePreviewWhite] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Niveles de patrocinio para el select
    const sponsorLevels = ['Main', 'Gold', 'Silver', 'Bronze', 'Partner'];

    useEffect(() => {
        if (sponsor) {
            setFormData({
                name: sponsor.name || '',
                logoUrl: sponsor.logoUrl || '',
                logoUrlBlack: sponsor.logoUrlBlack || '',
                logoUrlWhite: sponsor.logoUrlWhite || '',
                websiteUrl: sponsor.websiteUrl || '',
                level: sponsor.level || 'Partner',
                startDate: sponsor.startDate ? new Date(sponsor.startDate).toISOString().slice(0, 10) : '',
                endDate: sponsor.endDate ? new Date(sponsor.endDate).toISOString().slice(0, 10) : '',
                is_active: sponsor.is_active,
                order: sponsor.order || '',
            });
            setImagePreviewMain(sponsor.logoUrl || '');
            setImagePreviewBlack(sponsor.logoUrlBlack || '');
            setImagePreviewWhite(sponsor.logoUrlWhite || '');
        } else {
            setFormData(initialFormData);
            setImagePreviewMain('');
            setImagePreviewBlack('');
            setImagePreviewWhite('');
            setSelectedFileMain(null);
            setSelectedFileBlack(null);
            setSelectedFileWhite(null);
        }
        setError(null);
    }, [sponsor]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleFileChange = (e, fileType) => {
        const file = e.target.files[0];
        if (fileType === 'main') {
            setSelectedFileMain(file);
            setImagePreviewMain(file ? URL.createObjectURL(file) : (formData.logoUrl || ''));
        } else if (fileType === 'black') {
            setSelectedFileBlack(file);
            setImagePreviewBlack(file ? URL.createObjectURL(file) : (formData.logoUrlBlack || ''));
        } else if (fileType === 'white') {
            setSelectedFileWhite(file);
            setImagePreviewWhite(file ? URL.createObjectURL(file) : (formData.logoUrlWhite || ''));
        }
    };

    const handleRemoveImage = (fileType) => {
        if (fileType === 'main') {
            setSelectedFileMain(null);
            setImagePreviewMain('');
            setFormData(prev => ({ ...prev, logoUrl: '' }));
            if (document.getElementById('logoUrl')) document.getElementById('logoUrl').value = '';
        } else if (fileType === 'black') {
            setSelectedFileBlack(null);
            setImagePreviewBlack('');
            setFormData(prev => ({ ...prev, logoUrlBlack: '' }));
            if (document.getElementById('logoUrlBlack')) document.getElementById('logoUrlBlack').value = '';
        } else if (fileType === 'white') {
            setSelectedFileWhite(null);
            setImagePreviewWhite('');
            setFormData(prev => ({ ...prev, logoUrlWhite: '' }));
            if (document.getElementById('logoUrlWhite')) document.getElementById('logoUrlWhite').value = '';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            let finalLogoUrl = formData.logoUrl;
            let finalLogoUrlBlack = formData.logoUrlBlack;
            let finalLogoUrlWhite = formData.logoUrlWhite;

            // Subir imagen principal
            if (selectedFileMain) {
                finalLogoUrl = await sponsorService.uploadLogo(selectedFileMain, 'main');
            } else if (formData.logoUrl === '' && !selectedFileMain && sponsor?.logoUrl) {
                finalLogoUrl = null;
            }

            // Subir imagen negra
            if (selectedFileBlack) {
                finalLogoUrlBlack = await sponsorService.uploadLogo(selectedFileBlack, 'black');
            } else if (formData.logoUrlBlack === '' && !selectedFileBlack && sponsor?.logoUrlBlack) {
                finalLogoUrlBlack = null;
            }

            // Subir imagen blanca
            if (selectedFileWhite) {
                finalLogoUrlWhite = await sponsorService.uploadLogo(selectedFileWhite, 'white');
            } else if (formData.logoUrlWhite === '' && !selectedFileWhite && sponsor?.logoUrlWhite) {
                finalLogoUrlWhite = null;
            }

            const dataToSave = {
                ...formData,
                logoUrl: finalLogoUrl,
                logoUrlBlack: finalLogoUrlBlack,
                logoUrlWhite: finalLogoUrlWhite,
                startDate: formData.startDate ? new Date(formData.startDate) : null,
                endDate: formData.endDate ? new Date(formData.endDate) : null,
                order: formData.order === '' ? null : Number(formData.order), // Convierte a número o null
            };

            if (sponsor) {
                await sponsorService.updateSponsor(sponsor.id, dataToSave);
            } else {
                await sponsorService.createSponsor(dataToSave);
            }
            onSave();
        } catch (err) {
            console.error("Error al guardar el sponsor:", err);
            setError(err.response?.data?.message || err.message || 'Error al guardar el sponsor.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="sponsor-form-container">
            <h3>{sponsor ? 'Editar Sponsor' : 'Crear Nuevo Sponsor'}</h3>
            {error && <p className="sponsor-form-error-text">{error}</p>}
            <form onSubmit={handleSubmit} className="sponsor-form">
                <div className="form-group">
                    <label htmlFor="name">Nombre del Sponsor: <span className="required-star">*</span></label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} maxLength="100" required />
                </div>

                {/* Campo de subida de imagen principal */}
                <div className="form-group">
                    <label htmlFor="logoUrl">Logo Principal:</label>
                    <input type="file" id="logoUrl" name="logoUrl" accept="image/*" onChange={(e) => handleFileChange(e, 'main')} />
                    {imagePreviewMain && (
                        <div className="sponsor-form-img-preview-wrapper">
                            <img src={imagePreviewMain} alt="Logo Principal Preview" className="sponsor-form-img-preview" />
                            <button type="button" className="remove-image-button" onClick={() => handleRemoveImage('main')}>X</button>
                        </div>
                    )}
                </div>

                {/* Campo de subida de imagen en negro */}
                <div className="form-group">
                    <label htmlFor="logoUrlBlack">Logo (Versión Negro):</label>
                    <input type="file" id="logoUrlBlack" name="logoUrlBlack" accept="image/*" onChange={(e) => handleFileChange(e, 'black')} />
                    {imagePreviewBlack && (
                        <div className="sponsor-form-img-preview-wrapper">
                            <img src={imagePreviewBlack} alt="Logo Negro Preview" className="sponsor-form-img-preview" />
                            <button type="button" className="remove-image-button" onClick={() => handleRemoveImage('black')}>X</button>
                        </div>
                    )}
                </div>

                {/* Campo de subida de imagen en blanco */}
                <div className="form-group">
                    <label htmlFor="logoUrlWhite">Logo (Versión Blanco):</label>
                    <input type="file" id="logoUrlWhite" name="logoUrlWhite" accept="image/*" onChange={(e) => handleFileChange(e, 'white')} />
                    {imagePreviewWhite && (
                        <div className="sponsor-form-img-preview-wrapper">
                            <img src={imagePreviewWhite} alt="Logo Blanco Preview" className="sponsor-form-img-preview" />
                            <button type="button" className="remove-image-button" onClick={() => handleRemoveImage('white')}>X</button>
                        </div>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="websiteUrl">URL del Sitio Web/Red Social:</label>
                    <input type="url" id="websiteUrl" name="websiteUrl" value={formData.websiteUrl} onChange={handleChange} maxLength="255" placeholder="https://www.ejemplo.com" />
                </div>

                <div className="form-group">
                    <label htmlFor="level">Nivel de Patrocinio:</label>
                    <select id="level" name="level" value={formData.level} onChange={handleChange}>
                        {sponsorLevels.map(level => (
                            <option key={level} value={level}>{level}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="startDate">Fecha de Inicio:</label>
                    <input type="date" id="startDate" name="startDate" value={formData.startDate} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="endDate">Fecha de Fin:</label>
                    <input type="date" id="endDate" name="endDate" value={formData.endDate} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="order">Orden de Visualización:</label>
                    <input type="number" id="order" name="order" value={formData.order} onChange={handleChange} placeholder="Ej: 1, 2, 3..." />
                    <small>Número para controlar el orden en el slider. Menor número = primero.</small>
                </div>

                <div className="form-group form-group-checkbox">
                    <label>
                        <input type="checkbox" name="is_active" checked={formData.is_active} onChange={handleChange} />
                        Activo
                    </label>
                </div>

                <div className="sponsor-form-button-group">
                    <button type="button" onClick={onClose} className="sponsor-form-cancel-button" disabled={isLoading}>Cancelar</button>
                    <button type="submit" className="sponsor-form-submit-button" disabled={isLoading}>
                        {isLoading ? 'Guardando...' : 'Guardar Sponsor'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SponsorForm;
