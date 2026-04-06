import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Admin Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email as string;
        const password = credentials?.password as string;

        if (!email || !password) return null;

        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!adminEmail || !adminPassword) return null;

        // Simple email check + password comparison
        if (email !== adminEmail) return null;

        // Support both plain text (dev) and hashed passwords (prod)
        const isValid =
          password === adminPassword ||
          (await bcrypt.compare(password, adminPassword));

        if (!isValid) return null;

        return {
          id: "1",
          email: adminEmail,
          name: "T8 Admin",
        };
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    authorized({ auth, request }) {
      const isAdmin = request.nextUrl.pathname.startsWith("/admin");
      const isLoginPage = request.nextUrl.pathname === "/admin/login";
      const isAuthenticated = !!auth?.user;

      if (isAdmin && !isLoginPage && !isAuthenticated) {
        return false; // Redirect to login
      }

      return true;
    },
  },
});
