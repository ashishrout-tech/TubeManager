import prismadb from "@/lib/prismadb";
import {NextRequest, NextResponse} from "next/server";


export async function POST(req: NextRequest) {
    const body = await req.json();

    try {
        if(!body.adminEmail || !body.workspaceName) throw new Error("Invalid request")
        const check = await prismadb.workspace.findUnique({
            where: {
                adminEmail_name: {
                    adminEmail: body.adminEmail,
                    name: body.workspaceName
                }
            }
        })
        if(check) throw new Error(`Workspace with name '${body.workspaceName}' already exists`)

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

export async function GET(req: NextRequest){
    const email = req.headers.get("email");

    try {
        if(!email || email.length === 0) throw new Error("Invalid request")
        const user = await prismadb.user.findUnique({
            where: {
                email: email
            },
            select: {
                adminWorkspaces: {
                    select: {
                        id: true,
                        name: true,
                        adminEmail: true,
                        createdAt: true,
                        isDeployed: true
                    },
                    orderBy: {
                        createdAt: "desc"
                    }
                },
                editorWorkspaces: {
                    select: {
                        id: true,
                        name: true,
                        adminEmail: true,
                        createdAt: true,
                        isDeployed: true
                    },
                    orderBy: {
                        name: "asc"
                    }
                },
            },

        })

        return NextResponse.json({
            adminWorkspaces: user?.adminWorkspaces || [],
            editorWorkspaces: user?.editorWorkspaces || [],
        }, {status: 200})
    } catch (e: any) {
        return NextResponse.json({error: e.message}, {status: 400})
    }
}