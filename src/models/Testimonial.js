import mongoose from 'mongoose';

const TestimonialSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String },
}, { timestamps: true });

export default mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);
