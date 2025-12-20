import mongoose from 'mongoose';

const TeamMemberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
    },
    role: {
        type: String,
        required: [true, 'Please provide a role'],
    },
    image: {
        type: String,
        required: [true, 'Please provide an image URL'],
    },
    description: {
        type: String,
    },
    order: {
        type: Number,
        default: 0,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
}, { timestamps: true });

export default mongoose.models.TeamMember || mongoose.model('TeamMember', TeamMemberSchema);
