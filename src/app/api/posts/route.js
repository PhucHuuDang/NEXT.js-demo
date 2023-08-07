import connect from "@/utils/db";
import { NextResponse } from "next/server";
// import Posts from "../../../models/Posts";
import Posts from "@/models/Posts";
// import Posts from "@/models/Posts";

export const GET = async (request) => {
    const url = new URL(request.url);

    // take all the queries have username
    const username = url.searchParams.get("username");

    try {
        await connect();

        // fetch all post from db
        const posts = await Posts.find(username && { username });
        return new NextResponse(JSON.stringify(posts), { status: 200 });
    } catch (err) {
        return new NextResponse("Database Error", { status: 500 });
    }
};

export const POST = async (request) => {
    // got this error ==> JSON()
    const body = await request.json();

    const newPost = new Posts(body);

    try {
        await connect();

        await newPost.save();

        // fetch all post from db
        const posts = await Posts.find(username && { username });
        return new NextResponse("Post has been created", { status: 201 });
    } catch (err) {
        return new NextResponse("Database Error", { status: 500 });
    }
};
