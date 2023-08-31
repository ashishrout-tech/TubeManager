"use client";

import { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import ImageProvider from "@/components/ImageProvider";
import { handleVideoFetch } from "./function";

const PageProvider = ({
  title,
  description,
  imgUrl,
  id
}: {
  title?: string;
  description?: string;
  imgUrl?: string;
  id?: string;
}) => {
  const[videoSrc, setVideoSrc] = useState("");

  if (!description) description = "";
  const [desc, setDesc] = useState(description);
  const descRows = Math.min(15, desc.split("\n").length);
  function handleDesc(e: ChangeEvent<HTMLTextAreaElement>) {
    setDesc(e.target.value);
  }

  return (
    <div className=" mt-12 mb-6">
      <div className=" pt-10 sm:pt-4 w-full flex justify-center">
        <div className=" w-11/12 max-w-4xl">
          <video src={videoSrc} controls className=" w-full rounded-md" />
          <div className=" flex justify-between mt-6 px-2 mb-3">
            <div className=" flex flex-col gap-1">
              <Label
                className=" h-fit text-xs text-muted-foreground pl-1"
                htmlFor="Video"
              >
                Video
              </Label>
              <div className=" flex w-fit items-center h-fit">
                <Button
                  className=" border-r rounded-none rounded-l-md text-xs md:text-sm p-2 h-8 md:p-3 md:h-9"
                  variant={"outline"}
                  size={"sm"}
                  onClick={() => handleVideoFetch(setVideoSrc, id)}
                >
                  Stream
                </Button>
                <Button
                  className=" border-r rounded-none text-xs md:text-sm p-2 h-8 md:p-3 md:h-9"
                  variant={"outline"}
                  size={"sm"}
                >
                  Download
                </Button>
                <Button
                  className=" rounded-none rounded-r-md text-xs md:text-sm p-2 h-8 md:p-3 md:h-9"
                  variant={"outline"}
                  size={"sm"}
                >
                  Update
                </Button>
              </div>
            </div>
            <Button className=" mt-4 text-sm md:text-base" variant={"destructive"}>
              DEPLOY
            </Button>
          </div>
        </div>
      </div>

      <div className=" gap-4 md:flex ">


        <div className=" w-full mt-10 grid-cols-1 grid md:grid-cols-1 gap-6 px-10 lg:px-20 md:px-8 xl:px-28 md:w-7/12">
          <div className=" flex justify-center md:col-span-1">
            <div className=" grid grid-cols-1 gap-2 w-full h-fit">
              <Label htmlFor="Title">Title</Label>
              <Textarea
                wrap="off"
                rows={1}
                disabled={false}
                placeholder="Type video title here."
                value={title}
              />
              <Button disabled={false}>Update Title</Button>
            </div>
          </div>
          <div className=" flex justify-center md:col-span-1">
            <div className=" grid grid-cols-1 gap-2 w-full h-fit">
              <Label htmlFor="Description">Description</Label>
              <Textarea
                onChange={handleDesc}
                value={desc}
                wrap="off"
                rows={Math.max(descRows, 7)}
                disabled={false}
                placeholder="Type video description here."
              />
              <Button disabled={false}>Update Description</Button>
            </div>
          </div>
        </div>
        <div className=" w-full mt-10 gap-6 px-10 md:px-8 lg:px-20 xl:px-28 md:w-5/12">
        <Label htmlFor="Thumbnail">Thumbnail</Label>
            <ImageProvider src={imgUrl}/>
        </div>


      </div>

    </div>
  );
};

export default PageProvider;
