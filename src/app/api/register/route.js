import dbConnect from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        console.log('📝 Registration attempt started...');
        await dbConnect();
        console.log('✅ Database connected');

        const { email, password } = await request.json();
        console.log('📧 Email:', email);

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('⚠️ User already exists');
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hashedPassword });
        console.log('✅ User created successfully:', email);

        return NextResponse.json({ message: "User created successfully" }, { status: 201 });
    } catch (error) {
        console.error('❌ Registration error:', error.message);
        console.error('Full error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
