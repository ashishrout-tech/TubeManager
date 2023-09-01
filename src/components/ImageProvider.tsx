"use client";

import { useState } from "react";
import Image from "next/image";
import { Loader2Icon } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import DialogContentProvider from "@/components/DialogContentProvider";

const ImageProvider = ({
  src,
  handleUploadFile,
  id,
}: {
  src?: string;
  handleUploadFile: (
    file: File | null,
    fileType: string,
    fileKey: string,
    fileFormat: string,
    id?: string
  ) => Promise<void>;
  id?: string;
}) => {
  const [isImgUpdateLoading, setIsImgUpdateLoading] = useState(false);

  return (
    <>
      <Card>
        <CardContent>
          <div className=" mt-6 max-w-2xl m-auto">
            {src && (
              <Image
                className=" w-full h-full rounded-md"
                height={1000}
                width={1000}
                src={src}
                alt="thumbnail"
              />
            )}
          </div>
        </CardContent>
        <CardFooter className=" flex justify-between">
          {src && <Button variant={"outline"}>Download</Button>}
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant={"outline"}
                disabled={isImgUpdateLoading? true: false}
                >
                { isImgUpdateLoading && <Loader2Icon className=" absolute animate-spin" />}
                <span className={cn(isImgUpdateLoading ? " text-foreground/30": "" )}>Update</span>
              </Button>
            </DialogTrigger>
            <DialogContentProvider
              setLoader={setIsImgUpdateLoading}
              id={id}
              fileFormat="Thumbnail"
              uploadFile={handleUploadFile}
            />
          </Dialog>
        </CardFooter>
      </Card>
    </>
  );
};

export default ImageProvider;
