import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('Please define the MONGODB_URI environment variable inside .env.local');
    process.exit(1);
}

async function checkDB() {
    try {
        console.log('Connecting to:', MONGODB_URI.split('@').pop());
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');
        console.log('Database name:', mongoose.connection.name);

        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('Collections:', collections.map(c => c.name));

        if (collections.some(c => c.name === 'teammembers')) {
            const count = await mongoose.connection.db.collection('teammembers').countDocuments({});
            console.log(`Found ${count} team members in 'teammembers' collection`);
            const result = await mongoose.connection.db.collection('teammembers').deleteMany({});
            console.log(`Deleted ${result.deletedCount} team members`);
        } else {
            console.log("'teammembers' collection not found");
        }

        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

checkDB();
