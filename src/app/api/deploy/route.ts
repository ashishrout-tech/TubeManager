import {NextRequest, NextResponse} from "next/server";
import prismadb from "@/lib/prismadb";
import {cookies} from "next/headers";
import {oauth2Client} from "@/lib/auth";
import {google} from "googleapis";
import request from "request";
import axios from 'axios';
import { Readable } from 'stream';

export async function POST(req: NextRequest){
    try {
        const id = req.nextUrl.searchParams.get("id");
        const body = await req.json();
        const titleDesc = await prismadb.workspace.findUnique({
            where: {
                id: id!,
            },
            select: {
                workspaceData: {select: {title: true, description: true}}
            }
        })
        const title = titleDesc?.workspaceData.title || "";
        const description = titleDesc?.workspaceData.description || "";

        const imgUrlResponse = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/awsS3/thumbnail?id=${id}`, {
            cache: "no-store"
        })
        const imgUrlData = await imgUrlResponse.json();
        console.log("imgurl", imgUrlData);
        if(!imgUrlResponse.ok) throw new Error(imgUrlData.error);
        const thumbnailUrl = imgUrlData.url;
        if(!thumbnailUrl) throw new Error("No thumbnail")

        const vidUrlResponse = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/awsS3/video?id=${id}`, {
            cache: "no-store"
        })
        const vidUrlData = await vidUrlResponse.json();
        if(!vidUrlResponse.ok) throw new Error(vidUrlData.error);
        const videoUrl = vidUrlData.url;
        if(!videoUrl) throw new Error("No video")

        const credentials = cookies().get("credentials");
        if(!credentials) throw new Error("No credentials");
        oauth2Client.setCredentials(JSON.parse(credentials.value));

        console.log("videoUrl", videoUrl);

        const videoResponse = await axios.get(videoUrl, {responseType: "stream"});
        const videoStream: Readable = videoResponse.data;
        
        const youtube = google.youtube("v3");
        const vidUploadResponse = await youtube.videos.insert({
           "auth": oauth2Client,
            "part": ["snippet", "status"],
            requestBody:{
               snippet:{
                   title: title,
                   description: description,
                   thumbnails: {
                       default: {
                           url: thumbnailUrl
                       }
                   },
                   tags: ["video"],
                   defaultLanguage: "en"
               },
                status:{
                   privacyStatus: body.status,
                }
            },
            media: {
               body: videoStream,
            }
        })

        const thumbnailResponse = await axios.get(thumbnailUrl, {responseType: "stream"});
        const thumbnailStream: Readable = thumbnailResponse.data;
        await youtube.thumbnails.set({
            auth: oauth2Client,
            videoId: vidUploadResponse.data.id || undefined,
            media: {
                body: thumbnailStream
            }
        })

        await prismadb.workspace.update({
            where: {
                id: id!
            },
            data: {
                isDeployed: true
            }
        })

        return new NextResponse("OK", {status: 200});
    } catch (err: any) {
        console.log(err.message);
        return NextResponse.json({error: err.message}, {status: 400})
    }
}