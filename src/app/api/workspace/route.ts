import prismadb from "@/lib/prismadb";
import {NextRequest, NextResponse} from "next/server";


export async function POST(req: NextRequest) {
    const body = await req.json();

    try {
        const check = await prismadb.workspace.findUnique({
            where: {
                adminEmail_name: {
                    adminEmail: body.adminEmail,
                    name: body.workspaceName
                }
            }
        })
        if(check) throw new Error(`Workspace with name '${body.name}' already exists`)

        const workspace = await prismadb.workspace.create({
            data: {
                admin: {
                    connect: {
                        email: body.adminEmail,
                    }
                },
                name: body.workspaceName,
                workspaceData: {
                    create: {}
                }
            },
            select: {
                id: true
            }
        })
        return NextResponse.json({url: `/workspace?id=${workspace.id}`}, {status: 200})
    } catch (error) {
        return NextResponse.json({error: (error as Error).message}, {status: 400})
    }
}