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
    image: {
        type: String,
        required: [true, 'Please provide an image URL'],
    },
    description: {
        type: String,
    },
}, { timestamps: true });

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
