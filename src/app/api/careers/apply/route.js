import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Application from "@/models/Application";

export async function POST(req) {
    try {
        await dbConnect();
        const body = await req.json();

        const application = await Application.create(body);

        return NextResponse.json({ success: true, data: application }, { status: 201 });
    } catch (error) {
        console.error("Application submission error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function GET() {
    try {
        await dbConnect();
        const applications = await Application.find().sort({ createdAt: -1 });
        return NextResponse.json(applications);
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
