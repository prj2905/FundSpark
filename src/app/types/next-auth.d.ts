import  "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    _id : string;
    isVerified : boolean;
    isAcceptingMessages : boolean;
    username : string;
    role : "creator" | "backer";
  } 

  interface Session {
    user: User & DefaultSession["user"]; 
  }

  interface JWT {

  }
}