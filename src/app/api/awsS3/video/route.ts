import { getObjectURL } from "@/lib/aws";
import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    
    if(!req.nextUrl.searchParams.has("id")) return NextResponse.json({error: "Id is not provided"}, {status: 400})
    try {
        const id = req.nextUrl.searchParams.get("id")!;
        const data = await prismadb.workspace.findUnique({
            where: {
                id: id
            },
            select: {
                workspaceData: { select: { videoPath: true } }
            }
        })
        
        const vidName = data?.workspaceData.videoPath;
        if(!vidName || vidName === "") throw new Error("Video not uploaded");

        const url = await getObjectURL(`${id}/video/${vidName}`);
        return NextResponse.json({url: url}, {status: 200});

    } catch (error) {
        console.log((error as Error).message);
        return NextResponse.json({error: "Internal Server Error"}, {status: 500})
    }

}