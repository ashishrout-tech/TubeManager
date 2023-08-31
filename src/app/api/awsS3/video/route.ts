import { getObjectURL } from "@/lib/aws";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    if(!req.nextUrl.searchParams.has("id")) return NextResponse.json({error: "Id is not provided"}, {status: 400})
    try {
        const vidName = "video.mp4";

        const url = await getObjectURL(`${req.nextUrl.searchParams.get("id")!}/video/${vidName}`);
        return NextResponse.json({url: url}, {status: 200});

    } catch (error) {
        console.log((error as Error).message);
        return NextResponse.json({error: "Internal Server Error"}, {status: 500})
    }

}