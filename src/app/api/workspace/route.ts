import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";


export async function GET() {

    try {
        const credentials = cookies().get("credentials");

        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user`, {
            headers: {
                'Cookie': `${credentials?.name!}=${credentials?.value!}`
            },
            cache: "no-store"
        })
        if(!response.ok) throw new Error((await response.json()).error)
        const userData = (await response.json()).userData;
    
        const workspaceData = await prismadb.workspaceData.create({
            data: {}
        })
        const workspace = await prismadb.workspace.create({
            data: {
                adminEmail: userData.email as string,
                workspaceDataId: workspaceData.id
            }
        })
        return NextResponse.json({url: `/workspace?id=${workspace.id}`}, {status: 200})
    } catch (error) {
        return NextResponse.json({error: (error as Error).message}, {status: 500})
    }
}