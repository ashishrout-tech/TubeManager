import {NextRequest, NextResponse} from "next/server";
import prismadb from "@/lib/prismadb";

export async function GET(req: NextRequest){
    try {
        const id = req.nextUrl.searchParams.get('id');
        if(!id) throw new Error(`Invalid Access`);
        const info = await prismadb.workspace.findUnique({
            where: {
                id: id
            },
            select: {
                name: true,
                isDeployed: true
            }
        })
        if(!info) throw new Error("Internal Error");
        return NextResponse.json({info: info}, {status: 200})
    }catch(err: any) {
        return NextResponse.json({error: err.message}, {status: 400})
    }
}