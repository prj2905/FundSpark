import dbConnect from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  return NextResponse.json({ message: "Connected to MongoDB" });
}
