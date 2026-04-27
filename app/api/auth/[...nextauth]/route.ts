import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;
                const adminEmail = process.env.ADMIN_EMAIL;
                const adminHash = process.env.ADMIN_PASSWORD_HASH;
                if (!adminEmail || !adminHash) return null;
                if (credentials.email !== adminEmail) return null;
                const valid = await bcrypt.compare(credentials.password, adminHash);
                if (!valid) return null;
                return { id: "1", name: "Kona Aravind", email: adminEmail };
            },
        }),
    ],
    pages: { signIn: "/admin/login" },
    session: { strategy: "jwt" },
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
