import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('❌ Error: MONGODB_URI is not defined in .env.local');
    console.error('Please create a .env.local file with your MongoDB connection string.');
    process.exit(1);
}

if (MONGODB_URI.includes('<db_password>')) {
    console.error('❌ Error: You need to replace <db_password> with your actual MongoDB password in .env.local');
    console.error('Current URI contains placeholder: <db_password>');
    console.error('\nPlease edit .env.local and replace <db_password> with your actual password.');
    process.exit(1);
}

console.log('📦 Starting database seeding...');

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'admin' },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', UserSchema);

const TeamMemberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String },
}, { timestamps: true });

const TeamMember = mongoose.models.TeamMember || mongoose.model('TeamMember', TeamMemberSchema);

async function seed() {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Create Admin User
        const email = 'admin@gmail.com';
        const password = '123123';

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            const hashedPassword = await bcrypt.hash(password, 10);
            await User.create({
                email,
                password: hashedPassword,
                role: 'admin'
            });
            console.log(`✅ Admin user created: ${email}`);
        } else {
            console.log(`ℹ️  Admin user already exists: ${email}`);
        }

        // Create Team Members
        const teamMembers = [
            {
                name: "John Doe",
                role: "Principal Architect",
                image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop",
                description: "John has over 20 years of experience in sustainable architecture."
            },
            {
                name: "Jane Smith",
                role: "Senior Designer",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop",
                description: "Jane specializes in modern interior spaces and lighting design."
            },
            {
                name: "Michael Brown",
                role: "Project Manager",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
                description: "Michael ensures all projects are delivered on time and within budget."
            }
        ];

        const count = await TeamMember.countDocuments();
        if (count === 0) {
            await TeamMember.insertMany(teamMembers);
            console.log('✅ Team members seeded');
        } else {
            console.log(`ℹ️  Team members already exist (${count} found)`);
        }

        console.log('\n🎉 Seeding completed successfully!');
        console.log('\nYou can now login at: http://localhost:3000/admin/login');
        console.log('Email: admin@gmail.com');
        console.log('Password: 123123\n');
        process.exit(0);
    } catch (error) {
        console.error('\n❌ Seeding error:', error.message);
        if (error.message.includes('authentication')) {
            console.error('\n💡 Tip: Check that your MongoDB password is correct in .env.local');
        }
        process.exit(1);
    }
}

seed();
