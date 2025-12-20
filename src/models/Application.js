import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    institute: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['Internship', 'Job'],
        required: true,
    },
    // Internship specific
    duration: {
        type: String, // e.g., "6 months"
    },
    // Job specific
    graduationYear: {
        type: String,
    },
    qualification: {
        type: String,
    },
    experience: {
        type: String, // e.g., "2 years"
    },
    // Common
    portfolioLink: {
        type: String,
    },
    portfolio: {
        type: String, // Base64 or URL (Upload)
    },
    attachments: {
        type: [String], // Array of Base64 or URLs
    },
    details: {
        type: String,
    },
    status: {
        type: String,
        enum: ['New', 'Reviewed', 'Contacted', 'Rejected'],
        default: 'New',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Application || mongoose.model("Application", ApplicationSchema);
