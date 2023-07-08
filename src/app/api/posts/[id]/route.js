import connect from "@/utils/db";
import { NextResponse } from "next/server";
// import Posts from "../../../models/Posts";
import Posts from "@/models/Posts";
// import Posts from "@/models/Posts";

export const GET = async (request, { params }) => {
    const { id } = params;

    try {
        await connect();

        const post = await Posts.findById(id);

        return new NextResponse(JSON.stringify(post), { status: 200 });
    } catch (err) {
        return new NextResponse("Database Error", { status: 500 });
    }
};
