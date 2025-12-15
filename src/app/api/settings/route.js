import dbConnect from "@/lib/db";
import SiteSettings from "@/models/SiteSettings";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await dbConnect();
        let settings = await SiteSettings.findOne();
        if (!settings) {
            settings = await SiteSettings.create({});
        }
        return NextResponse.json(settings);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request) {
    try {
        await dbConnect();
        const data = await request.json();
        // Update the first document found, or create if not exists
        const settings = await SiteSettings.findOneAndUpdate({}, data, { new: true, upsert: true });
        return NextResponse.json(settings);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
