
import { NextResponse } from "next/server";
import { dbConnect } from "../../lib/db";
// import dbConnect from "@/app/lib/db";

export async function GET() {
  try {
    await dbConnect();

    return NextResponse.json({
      success: true,
      message: "MongoDB connected successfully!",
    });
  } catch (error) {
    console.error("Database connection failed:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to connect to MongoDB",
      },
      { status: 500 }
    );
  }
}
