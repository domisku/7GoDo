import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"

export default async function auth(req, res) {
    return await NextAuth(req, res, {
    adapter: MongoDBAdapter({
        db: (await clientPromise).db('goDoDB'),
    }),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        EmailProvider({
            server: process.env.EMAIL_SERVER,
            from: process.env.EMAIL_FROM
        }),
    ],
    pages: {
        signIn: '/signin',
        singOut: '/signout',
        verifyRequest: '/verify-request',
        error: '/error'
    }
});
}