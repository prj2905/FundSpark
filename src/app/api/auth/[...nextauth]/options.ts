import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/app/utils/db";
import User from "@/app/models/userModel"
import { email } from "zod/v4";


export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials-login",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "Enter your email" },
                password: { label: "Password", type: "password", placeholder: "Enter your password" }
            },
            async authorize(credentials: any): Promise<any> {
                await dbConnect();
                try {
                    const user = await User.findOne({
                        $or: [
                            { email: credentials.email },

                        ]
                    })
                    if (!user) {
                        throw new Error("User not found");
                    }

                    

                    const isPasswordCorrect = await bcrypt.compare(
                        credentials.password, user.password);
                    if (isPasswordCorrect) {
                        return user;
                    }
                    else {
                        throw new Error("Invalid credentials");
                    }
                } catch (error: any) {
                    throw new Error(error);
                }
            },




        }),

         GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
    ],

    pages: {
        signIn: '/login',

    },

    session: {
        strategy: "jwt",

    },

    secret: process.env.NEXTAUTH_SECRET,

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token._id = user._id.toString();
                token.isVerified = user.isVerified;
                
                token.username = user.username;
            }

            return token;
        },

        async session({ session, token }) {
            if(token){
                session.user._id = token._id as string;
                session.user.isVerified = token.isVerified as boolean;
                
                session.user.username = token.username as string;
            }
            return session;
        } 
        
    }




    }