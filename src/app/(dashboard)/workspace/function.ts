"use client";

import { Dispatch, SetStateAction } from "react";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context";

export async function handleVideoFetch(
  setVideoSrc: Dispatch<SetStateAction<string>>,
  setIsVidStreamLoading: Dispatch<SetStateAction<boolean>>,
  id?: string,
  toast?: any
) {
  try {
    setIsVidStreamLoading(true);

    const vidResponse = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/awsS3/video?id=${id}`,
      { cache: "no-store" }
    );
    const vidData = await vidResponse.json();
    console.log(vidData);
    toast({
      description: "Successfully Fetched",
    })
    setVideoSrc(vidData.url);
  } catch (error) {
    toast({
      title: "ERROR",
      description: "Video Fetching Error",
      variant: "destructive"
    })
    console.log((error as Error).message);
  } finally{
    setIsVidStreamLoading(false);
  }
}

export async function handleUploadFile(file: File | null, fileType: string, fileKey: string, fileFormat: string, id?: string, toast?: any) {
  try {
    if(!file) {
      throw new Error("File required");
    }

    if(fileFormat === "Video" && fileType.slice(0, 5) !== "video"){
      throw new Error("Wrong File Type Received");
    }

    if(fileFormat === "Thumbnail" && fileType.slice(0, 5) !== "image"){
      throw new Error("Wrong File Type Received");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/awsS3?id=${id}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileType: fileType,
          fileKey: fileKey
        }),
        cache: "no-store"
      }
    )
    if(!response.ok) throw new Error("Error Uploading File");

    const data = await response.json();
    console.log(data);
    const preSignedUrl = data.url;

    const response2 = await fetch(preSignedUrl, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": fileType,
      }
    })

    if(!response2.ok) throw new Error("Error Uploading File");
    toast({
      description: "Successfully updated",
    })

  } catch (error: any) {
    toast({
      title: "ERROR",
      description: `${error.message}`,
      variant: "destructive"
    })
    console.log(error);
  }

}

export async function titleDesc(text: string | undefined, type: "title" | "description", setLoader:  Dispatch<SetStateAction<boolean>>, id: string, toast?: any){
  try {
   if(!text) text = "";
    setLoader(true);
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/titleDesc?id=${id}`, {
      method: "POST",
      body: JSON.stringify({
        text: text,
        type: type
      }),
      cache: "no-store"
    })
    if(!response.ok) throw new Error((await response.json()).error)
    toast({
      description: `Successfully updated`,
    })

  } catch (err: any) {
    toast({
      title: "ERROR",
      description: `${err.message}`,
      variant: "destructive"
    })
    console.log((err as Error).message);
  }
  finally {
    setLoader(false);
  }
}

export async function  onDeploy(id?: string, status?: "public" | "private" | "unlisted" | null, toast?: any, setIsDeployLoading?:  Dispatch<SetStateAction<boolean>>, adminEmail?:string, router?: AppRouterInstance){
    if(!setIsDeployLoading) return;
    if(!adminEmail) return;
  try {
    setIsDeployLoading(true);

    const userResponse = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user`,{
      cache: "no-store"
    })
    const userData = await userResponse.json();
    if(!userResponse.ok) throw new Error(userData.error);

    if(adminEmail !== userData.userData.email) throw new Error("You don't have rights to deploy this workspace")

    if(!status) throw new Error("Set Video Status");
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/deploy?id=${id}`, {
      method: "POST",
      body: JSON.stringify({
        status: status
      }),
      cache: "no-store"
    })
    if(!response.ok) throw new Error((await response.json()).error)
    toast({
      description: `Successfully deployed`,
    })
  }catch (e: any) {
    toast({
      title: "ERROR",
      description: `${e.message}`,
      variant: "destructive"
    })
    console.log(e.message)
  }finally {
    setIsDeployLoading(false);
    router?.refresh()
  }
}
