import { putObject } from "@/lib/aws";
import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    const body = await req.json();
    console.log(body);
    const id = req.nextUrl.searchParams.get("id")
    
    try {
        if(!id) throw new Error("No searchParams");
        const shortPath = body.fileType.slice(0, 5) === "video" ? "video": "thumbnail";
        const fileName = giveName(body.fileKey, shortPath);

        const url = await putObject(`${id}/${shortPath}/${fileName}`, body.fileType);
        
        await storeInDatabase(id, shortPath, fileName);
        return NextResponse.json({url: url}, {status: 200});
    } catch (error) {
        return NextResponse.json({error: "Internal Server Error"}, {status: 500})
    }
}

function giveName(fileKey: string, fileType: "video" | "thumbnail") {
    const ext = fileKey.split('.')[fileKey.split('.').length - 1];
    return `${fileType}.${ext}`;
}

async function storeInDatabase(id: string, shortPath: "video" | "thumbnail", fileName: string) {
   try {
    const data = await prismadb.workspace.findUnique({
        where: {
            id: id
        },
        select: {
            workspaceDataId: true
        }
    })
    if(shortPath === "video"){
       await prismadb.workspaceData.update({
        where:{
            id: data?.workspaceDataId!
        },
        data:{
            videoPath: fileName
        }
       })
    }
    else{
        await prismadb.workspaceData.update({
        where:{
            id: data?.workspaceDataId!
        },
        data:{
            thumbnailPath: fileName
        }
        })
    }
   } catch (error: any) {
    console.log(error.message)
    throw new Error("Database Upload failed");
   }
}