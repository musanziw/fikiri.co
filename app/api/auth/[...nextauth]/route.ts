import axios from '@/app/shared/config/axios'
import NextAuth from 'next-auth'
import GooogleProvider from "next-auth/providers/google"
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
    providers: [
        GooogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),
        CredentialsProvider({
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials) {
                try {
                    const { data: res } = await axios.post('/auth/login', JSON.stringify(credentials))
                    if (res.data) {
                        return res.data
                    }
                } catch {
                    return null
                }
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET as string,
})

export { handler as GET, handler as POST }
