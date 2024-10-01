import { PrismaAdapter } from "@auth/prisma-adapter";
import GitHubProvider from "next-auth/providers/github";
import CredendtialsProvider from "next-auth/providers/credentials";
import db from "../../../../../prisma/db";

export const options = {
    adapter: PrismaAdapter(db),
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        CredendtialsProvider({
            email : {
                label : "E-mail",
                type : "email",
                placeHolder : "digite seu email"
            },
            password :  {
                label : "your password",
                type : "password",
                placeHolder : "Enter your password"
            }
        })
    ],

    callbacks: {
        async session({ session, user }) {
            if (session?.user) {
                session.user.id = user.id;
                // session.user.role = user.role; // Adiciona o role ao objeto de sessão
            }
            return session;
        }
    }

}