import {NextRequest, NextResponse} from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(req: NextRequest){
    try {
        const id = req.nextUrl.searchParams.get("id");
        if (!id) throw new Error("Id not passed in search params");

        const body = await req.json();
        await updateDatabase(body, id);
        return new NextResponse("OK", {status: 202})

    } catch (err: any) {
        return NextResponse.json({error: err.message});
    }
}


async function updateDatabase(body: any, id: string) {
    try {
        const data = await prismadb.workspace.findUnique({
            where:{
                id: id
            },
            select:{
                workspaceDataId: true
            }
        })
        if(body.type === "title"){
            await prismadb.workspaceData.update({
                where: {
                    id: data?.workspaceDataId
                },
                data: {
                    title: body.text
                }
            })
        }
        else {
            await prismadb.workspaceData.update({
                where: {
                    id: data?.workspaceDataId
                },
                data: {
                    description: body.text
                }
            })
        }
    } catch (err) {
       throw new Error((err as Error).message)
    }
}