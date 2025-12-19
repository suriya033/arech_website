import dbConnect from "@/lib/db";
import ContactMessage from "@/models/ContactMessage";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await dbConnect();
        const messages = await ContactMessage.find({}).sort({ createdAt: -1 });
        return NextResponse.json(messages);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await dbConnect();
        const data = await request.json();
        const message = await ContactMessage.create(data);
        return NextResponse.json(message, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        await ContactMessage.findByIdAndDelete(id);
        return NextResponse.json({ message: 'Message deleted' });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        const data = await request.json();
        const message = await ContactMessage.findByIdAndUpdate(id, data, { new: true });
        return NextResponse.json(message);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
