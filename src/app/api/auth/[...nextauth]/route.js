import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
});

// export like this cause when we are pass username and password we use POST method
// and when we fetch our session our user information we gonna use GET method
export { handler as GET, handler as POST };
