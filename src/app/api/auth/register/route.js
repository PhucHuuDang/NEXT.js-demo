import User from "@/models/User";
import connect from "@/utils/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (request) => {
    const { name, email, password } = await request.json();
    // connect with db
    await connect();

    // hash password before save in mongodb
    const hashPassword = await bcrypt.hash(password, 5);

    const newUser = new User({
        name,
        email,
        password: hashPassword,
    });

    try {
        // save newUser in the mongodb
        await newUser.save();
        return new NextResponse("User has been created", {
            status: 201,
        });
    } catch (err) {
        return new NextResponse(err.message, {
            status: 500,
        });
    }
};
