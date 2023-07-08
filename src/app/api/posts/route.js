import connect from "@/utils/db";
import { NextResponse } from "next/server";
// import Posts from "../../../models/Posts";
import Posts from "@/models/Posts";
// import Posts from "@/models/Posts";

export const GET = async (request) => {
    try {
        await connect();

        // fetch all post from db
        const posts = await Posts.find();
        return new NextResponse(JSON.stringify(posts), { status: 200 });
    } catch (err) {
        return new NextResponse("Database Error", { status: 500 });
    }
};
