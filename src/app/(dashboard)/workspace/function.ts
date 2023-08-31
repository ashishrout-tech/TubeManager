"use client";

import { Dispatch, SetStateAction } from "react";

export async function handleVideoFetch(
  setVideoSrc: Dispatch<SetStateAction<string>>,
  id?: string
) {
  try {
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
  }
}
