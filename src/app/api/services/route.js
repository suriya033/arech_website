import dbConnect from "@/lib/db";
import Service from "@/models/Service";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await dbConnect();
        const services = await Service.find({}).sort({ createdAt: -1 });
        return NextResponse.json(services);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await dbConnect();
        const data = await request.json();
        const service = await Service.create(data);
        return NextResponse.json(service, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request) {
    try {
        await dbConnect();
        const { _id, ...data } = await request.json();
        const service = await Service.findByIdAndUpdate(_id, data, { new: true });
        return NextResponse.json(service);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        await Service.findByIdAndDelete(id);
        return NextResponse.json({ message: 'Service deleted' });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
