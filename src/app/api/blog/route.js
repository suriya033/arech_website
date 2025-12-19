import dbConnect from "@/lib/db";
import Blog from "@/models/Blog";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await dbConnect();
        const blogs = await Blog.find({}).sort({ date: -1 });
        return NextResponse.json(blogs);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await dbConnect();
        const data = await request.json();
        const blog = await Blog.create(data);
        return NextResponse.json(blog, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request) {
    try {
        await dbConnect();
        const { _id, ...data } = await request.json();
        const blog = await Blog.findByIdAndUpdate(_id, data, { new: true });
        return NextResponse.json(blog);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        await Blog.findByIdAndDelete(id);
        return NextResponse.json({ message: 'Blog deleted' });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
