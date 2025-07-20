import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/utils/db";
import User from "@/app/models/userModel";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const { username, email, password, role } = await request.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword, role });

    await newUser.save();

    return NextResponse.json({ message: "User created successfully" }, { status: 201 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
