import { putObject } from "@/lib/aws";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    const body = await req.json();
    console.log(body);

    try {
        const shortPath = body.fileType.slice(0, 5) === "video" ? "video": "thumbnail";
        const fileName = giveName(body.fileKey, shortPath);

        const url = await putObject(`${req.nextUrl.searchParams.get("id")!}/${shortPath}/${fileName}`, body.fileType);
        return NextResponse.json({url: url}, {status: 200});
    } catch (error) {
        return NextResponse.json({error: "Internal Server Error"}, {status: 500})
    }
}

function giveName(fileKey: string, fileType: "video" | "thumbnail") {
    const ext = fileKey.split('.')[fileKey.split('.').length - 1];
    return `${fileType}.${ext}`;
}