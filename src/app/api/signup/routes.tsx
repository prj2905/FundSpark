import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '@/app/models/userModel';
import dbConnect from '@/app/utils/db'; 
import { z } from 'zod';


interface SignupRequestBody {
  name: string;
  email: string;
  role: 'backer' | 'creator'; 
  password: string;
}


const signupSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  role: z.enum(['backer', 'creator'], { message: 'Invalid role' }).default('backer'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export async function POST(request: NextRequest) {
  try {
    
    await dbConnect();

   
    const reqBody = await request.json();
    const parsedBody = signupSchema.safeParse(reqBody);

    if (!parsedBody.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsedBody.error.errors },
        { status: 400 }
      );
    }

    const { name, email, role, password } = parsedBody.data as SignupRequestBody;

    
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    
    const newUser = new User({
      name,
      email,
      role,
      password: hashedPassword,
    });

    
    await newUser.save();

    
    return NextResponse.json(
      {
        message: 'User created successfully',
        user: { name, email, role }, 
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    
    if (error instanceof Error && error.name === 'MongoServerError' && 'code' in error && error.code === 11000) {
      return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
    }

    
    const errorMessage = error instanceof Error ? error.message : 'Server error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}