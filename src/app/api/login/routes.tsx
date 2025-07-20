import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '@/app/models/userModel';
import dbConnect from '@/app/utils/db';
import { z } from 'zod';


interface LoginRequestBody {
  email: string;
  password: string;
}


const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

export async function POST(request: NextRequest) {
  try {
    
    await dbConnect();

    // Parse and validate request body
    const reqBody = await request.json();
    const parsedBody = loginSchema.safeParse(reqBody);

    if (!parsedBody.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsedBody.error.errors },
        { status: 400 }
      );
    }

    const { email, password } = parsedBody.data as LoginRequestBody;

    
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 });
    }

    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 });
    }

    
    return NextResponse.json(
      {
        message: 'Login successful',
        user: {
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 200 }
    );
  } catch (error: unknown) {
   
    if (error instanceof Error && error.name === 'MongoServerError') {
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    
    const errorMessage = error instanceof Error ? error.message : 'Server error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}