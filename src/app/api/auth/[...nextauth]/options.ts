import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/app/utils/db";
import User from "@/app/models/userModel"



export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials-login",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "Enter your email" },
                password: { label: "Password", type: "password", placeholder: "Enter your password" }
            },
            async authorize(
                credentials: Record<"email" | "password", string> | undefined
            ): Promise<null> {
                await dbConnect();
                if (!credentials) return null;
                const { email, password } = credentials;
                try {
                    const user = await User.findOne({
                        $or: [
                            { email: email },
                        ]
                    });
                    if (!user) {
                        return null;
                    }
                    const isPasswordCorrect = await bcrypt.compare(
                        password, user.password
                    );
                    if (isPasswordCorrect) {
                        return user;
                    } else {
                        return null;
                    }
                } catch (error) {
                    console.error("Login error:", error);
                    return null;
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
            if (token) {
                session.user._id = token._id as string;
                session.user.isVerified = token.isVerified as boolean;

                session.user.username = token.username as string;
            }
            return session;
        }

    }




}