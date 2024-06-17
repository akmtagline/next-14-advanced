import Credentials from "next-auth/providers/credentials";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      return true;
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        console.log("credentials :", credentials);

        if (credentials) {
          const { email, password } = credentials;
          if (email === "abc@gmail.com" && password === "Abc@123")
            return { id: 123, email, password };
        }

        return null;
        // if (credentials]) {
        //     const { email, password } = parsedCredentials.data;
        //     const user = await getUser(email);
        //     if (!user) return null;
        //   }

        //   return null;
      },
    }),
  ], // Add providers with an empty array for now
};
