import mongoose from 'mongoose';

const SiteSettingsSchema = new mongoose.Schema({
    email: { type: String, default: 'pradeep_vparchitects@yahoo.co.in' },
    phone: { type: String, default: '+91 98400 20792' },
    address: { type: String, default: '1/427, KCG College Road, Karapakkam, Chennai - 600097' },
    googleMapUrl: { type: String, default: 'https://maps.google.com/maps?q=1/427,+KCG+College+Road,+Karapakkam,+Chennai+-+600097&t=&z=15&ie=UTF8&iwloc=&output=embed' },
    instagram: { type: String, default: 'https://instagram.com/archstudio' },
    whatsapp: { type: String, default: 'https://wa.me/919840020792' },
    linkedin: { type: String, default: 'https://linkedin.com/company/archstudio' },
    ongoingProjects: { type: Number, default: 12 },
    completedProjects: { type: Number, default: 150 },
    publications: { type: Number, default: 25 },
}, { timestamps: true });

export default mongoose.models.SiteSettings || mongoose.model('SiteSettings', SiteSettingsSchema);
