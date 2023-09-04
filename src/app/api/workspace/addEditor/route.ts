import {NextRequest, NextResponse} from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(req: NextRequest){
    const body = await req.json();

   try {
       await prismadb.workspace.update({
           where: {
               id: body.wId
           },
           data: {
               editor: {
                   connectOrCreate: {
                       where: {
                           email: body.email
                       },
                       create: {
                           email: body.email
                       }
                   }
               }
           }
       })
       return new NextResponse("Successfully added", {status: 202})
   }
   catch (err: any) {
       return NextResponse.json({error: "Failed to add user"}, {status: 400})
   }
}

export async function DELETE(req: NextRequest){
    const body = await req.json();

    try {
        await prismadb.workspace.update({
            where: {
                id: body.wId
            },
            data: {
                editor: {
                    disconnect:{
                        email: body.email
                    }
                }
            }
        });
        return new NextResponse("Successfully deleted", {status: 202})
    } catch(err: any) {
        return NextResponse.json({error: err.message})
    }
}