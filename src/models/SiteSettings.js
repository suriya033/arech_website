import mongoose from 'mongoose';

const SiteSettingsSchema = new mongoose.Schema({
    email: { type: String, default: 'pradeep_vparchitects@yahoo.co.in' },
    phone: { type: String, default: '+91 98400 20792' },
    address: { type: String, default: '123 Architecture Ave, Design City' },
    googleMapUrl: { type: String, default: '' },
    instagram: { type: String, default: 'https://instagram.com/archstudio' },
    whatsapp: { type: String, default: 'https://wa.me/919840020792' },
    linkedin: { type: String, default: 'https://linkedin.com/company/archstudio' },
}, { timestamps: true });

export default mongoose.models.SiteSettings || mongoose.model('SiteSettings', SiteSettingsSchema);
