import { cookies } from "next/headers";
import { google } from "googleapis";
import prismadb from "@/lib/prismadb";

import { oauth2Client } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
    const profile = google.oauth2("v2");
    if(!cookies().has("credentials")) return NextResponse.json({error: "User not logged in"}, {status: 400})

    try {
        const credentials = cookies().get("credentials");
       
        oauth2Client.setCredentials(JSON.parse(credentials?.value!));
        const user = await profile.userinfo.get({
            auth: oauth2Client,
        });

        await prismadb.user.upsert({
            where: {
                email: user.data.email!
            },
            update:{
                name: user.data.name
            },
            create: {
                email: user.data.email!,
                name: user.data.name
            }
        })

        console.log("user created:", user.data);
        return NextResponse.json({userData: user.data}, {status: 201})

        
      } catch (err) {
        // TODO
        console.log("User Fetching Error",(err as Error)?.name, (err as Error)?.message);
        return NextResponse.json({error: (err as Error)?.message}, {status: 400})
      }
}