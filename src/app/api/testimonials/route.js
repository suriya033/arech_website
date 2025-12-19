import dbConnect from "@/lib/db";
import Testimonial from "@/models/Testimonial";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await dbConnect();
        const testimonials = await Testimonial.find({}).sort({ createdAt: -1 });
        return NextResponse.json(testimonials);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await dbConnect();
        const data = await request.json();
        const testimonial = await Testimonial.create(data);
        return NextResponse.json(testimonial, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request) {
    try {
        await dbConnect();
        const { _id, ...data } = await request.json();
        const testimonial = await Testimonial.findByIdAndUpdate(_id, data, { new: true });
        return NextResponse.json(testimonial);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        await Testimonial.findByIdAndDelete(id);
        return NextResponse.json({ message: 'Testimonial deleted' });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
