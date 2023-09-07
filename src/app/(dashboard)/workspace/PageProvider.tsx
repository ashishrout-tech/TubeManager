"use client";

import { useState } from "react";
import {  ImageIcon, Loader2Icon, TextIcon, VideoIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import ImageProvider from "@/components/ImageProvider";
import {handleUploadFile, handleVideoFetch, onDeploy, titleDesc} from "./function";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import DialogContentProvider from "@/components/DialogContentProvider";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {useToast} from "@/components/ui/use-toast";
import {useRouter} from "next/navigation";

const PageProvider = ({
  preTitle,
  description,
  imgUrl,
  id,
  isDeployed
}: {
  preTitle?: string;
  description?: string;
  imgUrl?: string;
  id?: string;
  isDeployed?: boolean;
}) => {
  const {toast} = useToast();

  const[isVidUpdateLoading, setIsVidUpdateLoading] = useState(false);
  const[isVidStreamLoading, setIsVidStreamLoading] = useState(false);
  const[isDeployLoading, setIsDeployLoading] = useState(false);

  const[isTitleLoading, setIsTitleLoading] = useState(false);
  const[isDescriptionLoading, setIsDescriptionLoading] = useState(false);

  const[videoSrc, setVideoSrc] = useState("");
  const[status, setStatus] = useState<"public"|"private"|"unlisted"|null>(null);

  const router = useRouter();

  if (!description) description = "";
  const [desc, setDesc] = useState(description);
  const descRows = Math.min(15, desc.split("\n").length);


  const [title, setTitle] = useState(preTitle);

  return (
    <div className=" mt-4 mb-6">
      <div className=" pt-5 sm:pt-4 w-full flex justify-center">
        <div className=" w-11/12 max-w-4xl flex flex-col">
          <video src={videoSrc} controls className=" w-full rounded-md" />
          <div className=" flex justify-between mt-6 px-2 mb-3">
            <div className=" flex flex-col gap-1">
              <Label
                className=" h-fit text-xs text-muted-foreground pl-1"
                htmlFor="Video"
              ><span className=" flex items-center gap-x-1">
                <VideoIcon className="h-5 w-5 text-muted-foreground" />
                Video</span>
              </Label>
              <div className=" flex w-fit items-center h-fit">
                <Button
                  className=" border-r rounded-none rounded-l-md text-xs md:text-sm p-2 h-8 md:p-3 md:h-9"
                  variant={"outline"}
                  size={"sm"}
                  onClick={() => handleVideoFetch(setVideoSrc, setIsVidStreamLoading, id, toast)}
                >
                  { isVidStreamLoading && <Loader2Icon className=" absolute animate-spin" />}
                  <span className={cn(isVidStreamLoading ? " text-foreground/30": "" )}>Stream</span>
                </Button>
                <Button
                  className=" border-r rounded-none text-xs md:text-sm p-2 h-8 md:p-3 md:h-9"
                  variant={"outline"}
                  size={"sm"}
                >
                  Download
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className={cn("rounded-none rounded-r-md text-xs md:text-sm p-2 h-8 md:p-3 md:h-9")}
                      variant={"outline"}
                      size={"sm"}
                      disabled={isVidUpdateLoading}
                    >
                      { isVidUpdateLoading && <Loader2Icon className=" absolute animate-spin" />}
                      <span className={cn(isVidUpdateLoading ? " text-foreground/30": "" )}>Update</span>
                    </Button>
                    </DialogTrigger>
                    <DialogContentProvider setLoader={setIsVidUpdateLoading} id={id} fileFormat="Video" uploadFile={handleUploadFile}/>
                </Dialog>
              </div>
            </div>
            {!isDeployed && <Button className=" mt-4 text-sm md:text-base"
                    variant={"destructive"}
                    onClick={() => onDeploy(id, status, toast, setIsDeployLoading, router)}
                    disabled={isDeployLoading}
            >
              { isDeployLoading && <Loader2Icon className=" absolute animate-spin" />}
              <span className={cn(isDeployLoading ? " text-foreground/30": "" )}>DEPLOY</span>
            </Button>}
          </div>
          <div className="w-full flex flex-col gap-1 px-2">
            <Label className="text-xs text-muted-foreground">Select status of your video</Label>
            <Select onValueChange={(value: "public" | "private" | "unlisted") => (setStatus(value))}>
              <SelectTrigger className="w-32 h-8">
                <SelectValue className="text-xs" placeholder="Select here" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  <SelectItem className="text-sm" value="public">Public</SelectItem>
                  <SelectItem className="text-sm" value="private">Private</SelectItem>
                  <SelectItem className="text-sm" value="unlisted">Unlisted</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className=" gap-4 md:flex ">

        <div className=" w-full mt-12 grid-cols-1 grid md:grid-cols-1 gap-6 px-10 lg:px-20 md:px-8 xl:px-28 md:w-7/12">
          <div className=" flex justify-center md:col-span-1">
            <div className=" grid grid-cols-1 gap-2 w-full h-fit">
              <Label htmlFor="Title">
                <span className="flex items-center gap-x-1">
                  <TextIcon className="h-5 w-5 text-muted-foreground" />
                  Title
                </span>
              </Label>
              <Textarea
                wrap="off"
                rows={1}
                disabled={isTitleLoading}
                placeholder="Type video title here."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Button
                  disabled={isTitleLoading}
                  onClick={() => {titleDesc(title, "title", setIsTitleLoading, id!, toast)}}
              >
                { isTitleLoading && <Loader2Icon className=" absolute animate-spin" />}
                <span className={cn(isTitleLoading ? " text-foreground/30": "" )}>Update Title</span>
              </Button>
            </div>
          </div>
          <div className=" flex justify-center md:col-span-1">
            <div className=" grid grid-cols-1 gap-2 w-full h-fit">
              <Label htmlFor="Description">
              <span className="flex items-center gap-x-1">
                <TextIcon className="h-5 w-5 text-muted-foreground" />
                Description
              </span>
              </Label>
              <Textarea
                onChange={(e) => setDesc(e.target.value)}
                value={desc}
                wrap="off"
                rows={Math.max(descRows, 7)}
                disabled={isDescriptionLoading}
                placeholder="Type video description here."
              />
              <Button
                  disabled={isDescriptionLoading}
                  onClick={() => titleDesc(desc, "description", setIsDescriptionLoading, id!, toast)}
              >
                { isDescriptionLoading && <Loader2Icon className=" absolute animate-spin" />}
                <span className={cn(isDescriptionLoading ? " text-foreground/30": "" )}>Update Description</span>
              </Button>
            </div>
          </div>
        </div>
        <div className=" space-y-1.5 w-full mt-10 px-10 md:px-8 lg:px-20 xl:px-28 md:w-5/12">
          <Label htmlFor="Thumbnail">
            <span className="flex items-center gap-x-1">
              <ImageIcon className="h-5 w-5 text-muted-foreground" />
            Thumbnail
            </span>
          </Label>
            <ImageProvider id={id} handleUploadFile={handleUploadFile} src={imgUrl}/>
        </div>

      </div>
    </div>
  );
};

export default PageProvider;
