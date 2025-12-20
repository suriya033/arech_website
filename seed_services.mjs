import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('❌ Error: MONGODB_URI is not defined in .env.local');
    process.exit(1);
}

const ServiceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, default: '🛠️' },
}, { timestamps: true });

const Service = mongoose.models.Service || mongoose.model('Service', ServiceSchema);

async function seedServices() {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        const services = [
            {
                title: "Architectural Design",
                description: "Comprehensive design services for residential and commercial projects, focusing on functionality, sustainability, and aesthetics.",
                icon: "📐"
            },
            {
                title: "Interior Architecture",
                description: "Detailed interior planning and design that harmonizes with the architectural structure to create cohesive and inspiring spaces.",
                icon: "🛋️"
            },
            {
                title: "Urban Planning",
                description: "Master planning for communities and large-scale developments, prioritizing connectivity, green spaces, and livability.",
                icon: "🏙️"
            }
        ];

        // Check if services already exist to avoid duplicates
        const count = await Service.countDocuments();
        if (count === 0) {
            await Service.insertMany(services);
            console.log('✅ 3 Services added successfully!');
        } else {
            console.log(`ℹ️  Services already exist (${count} found). Skipping...`);
        }

        console.log('\n🎉 Service seeding completed!');
        process.exit(0);
    } catch (error) {
        console.error('\n❌ Seeding error:', error);
        process.exit(1);
    }
}

seedServices();
