import dbConnect from "@/lib/db";
import Project from "@/models/Project";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await dbConnect();
        const projects = await Project.find({}).sort({ createdAt: -1 });
        return NextResponse.json(projects);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await dbConnect();
        const data = await request.json();
        const project = await Project.create(data);
        return NextResponse.json(project, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request) {
    try {
        await dbConnect();
        const { _id, ...data } = await request.json();
        const project = await Project.findByIdAndUpdate(_id, data, { new: true });
        return NextResponse.json(project);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        await Project.findByIdAndDelete(id);
        return NextResponse.json({ message: 'Project deleted' });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
