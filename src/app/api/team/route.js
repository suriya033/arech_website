import dbConnect from "@/lib/db";
import TeamMember from "@/models/TeamMember";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await dbConnect();
        const members = await TeamMember.find({}).sort({ order: 1, createdAt: -1 });
        return NextResponse.json(members);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await dbConnect();
        const data = await request.json();
        const member = await TeamMember.create(data);
        return NextResponse.json(member, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request) {
    try {
        await dbConnect();
        const { _id, ...data } = await request.json();
        const member = await TeamMember.findByIdAndUpdate(_id, data, { new: true });
        return NextResponse.json(member);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        await TeamMember.findByIdAndDelete(id);
        return NextResponse.json({ message: 'Team member deleted' });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
