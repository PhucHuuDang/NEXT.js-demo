import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import bcrypt from "bcryptjs";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            async function(credentials) {
                await connect();
                try {
                    // this user in the db
                    const user = await User.findOne({
                        email: credentials.email,
                    });
                    if (user) {
                        const isPasswordCorrect = await bcrypt.compare(
                            credentials.password,
                            user.password
                        );

                        if (isPasswordCorrect) {
                            return user;
                        } else {
                            throw new Error("Wrong Credentials");
                        }
                    } else {
                        throw new Error("User Not Found");
                    }
                } catch (err) {
                    throw new Error(err);
                }
            },
        }),
    ],
    pages: {
        error: "/dashboard/login",
    },
});

// export like this cause when we are pass username and password we use POST method
// and when we fetch our session our user information we gonna use GET method
export { handler as GET, handler as POST };
