import NextAuth from "next-auth";
import { authOptions } from "./options";
import dbConnect from "@/app/utils/db";


const handler = NextAuth(authOptions);
await dbConnect();

export { handler as GET, handler as POST };
