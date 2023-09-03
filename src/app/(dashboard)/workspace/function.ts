"use client";

import { Dispatch, SetStateAction } from "react";

export async function handleVideoFetch(
  setVideoSrc: Dispatch<SetStateAction<string>>,
  setIsVidStreamLoading: Dispatch<SetStateAction<boolean>>,
  id?: string,
) {
  try {
    setIsVidStreamLoading(true);

    const vidResponse = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/awsS3/video?id=${id}`,
      { cache: "no-store" }
    );
    const vidData = await vidResponse.json();
    console.log(vidData);
    setVideoSrc(vidData.url);
  } catch (error) {
    // TODO
    console.log((error as Error).message);
  } finally{
    setIsVidStreamLoading(false);
  }
}

export async function handleUploadFile(file: File | null, fileType: string, fileKey: string, fileFormat: string, id?: string) {
  if(!file) {
    // TODO
    console.log("File required");
    return;
  }
  console.dir(file);
  console.log("fileType", fileType)
  console.log("fileKey", fileKey)
  console.log("fileFormat", fileFormat)

  if(fileFormat === "Video" && fileType.slice(0, 5) !== "video"){
    // TODO
    console.log("Wrong File Type Received");
    return;
  }

  if(fileFormat === "Thumbnail" && fileType.slice(0, 5) !== "image"){
    // TODO
    console.log("Wrong File Type Received");
    return;
  }

  try {
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

  } catch (error) {
    // TODO
    console.log(error);
  }

}

export async function titleDesc(text: string | undefined, type: "title" | "description", setLoader:  Dispatch<SetStateAction<boolean>>, id: string){
  if(!text) text = "";
  try {
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

  } catch (err) {
    // TODO
    console.log((err as Error).message);
  }
  finally {
    setLoader(false);
  }
}
