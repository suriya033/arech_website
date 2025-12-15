import dbConnect from "@/lib/db";
import SiteSettings from "@/models/SiteSettings";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        await dbConnect();
        let settings = await SiteSettings.findOne().lean();
        if (!settings) {
            settings = await SiteSettings.create({});
            settings = settings.toObject();
        }
        console.log("GET settings:", settings);
        return NextResponse.json(settings);
    } catch (error) {
        console.error("GET settings error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request) {
    try {
        await dbConnect();
        const data = await request.json();

        // Ensure numeric fields are properly converted
        const sanitizedData = {
            ...data,
            ongoingProjects: Number(data.ongoingProjects) || 0,
            completedProjects: Number(data.completedProjects) || 0,
            publications: Number(data.publications) || 0
        };

        console.log("Updating settings with:", sanitizedData);

        // Update the first document found, or create if not exists
        const settings = await SiteSettings.findOneAndUpdate(
            {},
            { $set: sanitizedData },
            { new: true, upsert: true, runValidators: true }
        );

        console.log("Updated settings:", settings);

        // Convert to plain object to ensure all fields are properly serialized
        const settingsObj = settings.toObject();
        console.log("Settings as plain object:", settingsObj);

        // Revalidate the home page to reflect changes immediately
        revalidatePath('/');

        return NextResponse.json(settingsObj);
    } catch (error) {
        console.error("Settings update error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
