import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    images: { type: [String], default: [] },
    image: { type: String }, // Featured image
    author: { type: String, default: 'Admin' },
    date: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
