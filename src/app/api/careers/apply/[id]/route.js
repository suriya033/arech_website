import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Application from "@/models/Application";

export async function PUT(req, { params }) {
    try {
        await dbConnect();
        const { id } = await params;
        const body = await req.json();

        const updatedApplication = await Application.findByIdAndUpdate(
            id,
            { status: body.status },
            { new: true }
        );

        if (!updatedApplication) {
            return NextResponse.json({ success: false, error: "Application not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: updatedApplication });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    try {
        await dbConnect();
        const { id } = await params;
        console.log("Attempting to delete application with ID:", id);

        if (!id) {
            console.error("No ID provided in params");
            return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });
        }

        const deletedApplication = await Application.findByIdAndDelete(id);

        if (!deletedApplication) {
            console.error("Application not found for ID:", id);
            return NextResponse.json({ success: false, error: "Application not found" }, { status: 404 });
        }

        console.log("Successfully deleted application:", id);
        return NextResponse.json({ success: true, data: {} });
    } catch (error) {
        console.error("Delete error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
