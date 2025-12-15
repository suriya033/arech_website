import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title'],
    },
    category: {
        type: String,
        required: [true, 'Please provide a category'],
        enum: ['Residential', 'Commercial', 'Interior', 'Landscape', 'Other'],
    },
    location: {
        type: String,
        required: [true, 'Please provide a location'],
    },
    images: {
        type: [String],
        default: [],
    },
    image: {
        type: String, // Keep for backward compatibility or as featured image
    },
    description: {
        type: String,
    },
}, { timestamps: true });

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
