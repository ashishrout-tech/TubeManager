"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

import {
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IMAGE_FILE_TYPES, VIDEO_FILE_TYPES } from "@/constatnts";

const DialogContentProvider = ({
  uploadFile,
  fileFormat,
  id,
  setLoader
}: {
  uploadFile: (
    file: File | null,
    fileType: string,
    fileKey: string,
    fileFormat: string,
    id?: string
  ) => Promise<void>;
  fileFormat: string;
  id?: string;
  setLoader: Dispatch<SetStateAction<boolean>>
}) => {
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState("");
  const [fileKey, setFileKey] = useState("");

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setFileType(selectedFile?.type);
    setFileKey(selectedFile?.name);
  };

  const handleUploadFile = async () => {
    setLoader(true);
    await uploadFile(file, fileType, fileKey, fileFormat, id);
    setFile(null);
    if(fileFormat === "Video") setLoader(false);
    // TODO
    router.refresh();
  };

  return (
    <DialogContent >
      <DialogHeader>
        <DialogTitle>UPDATE {fileFormat.toUpperCase()}</DialogTitle>
        <DialogDescription>
          Upload the {fileFormat}, then click &apos;Submit&apos;.
        </DialogDescription>
      </DialogHeader>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor={fileFormat}>{fileFormat}</Label>
          <Input
            id={fileFormat}
            type="file"
            accept={
              fileFormat === "Video" ? VIDEO_FILE_TYPES : IMAGE_FILE_TYPES
            }
            onChange={handleFileChange}
          />
        </div>
        <DialogClose asChild>
          <Button
            onClick={handleUploadFile}
            size={"sm"}
            type="submit"
            className=" mt-5"
          >
            Submit
          </Button>
        </DialogClose>
      </div>
    </DialogContent>
  );
};

export default DialogContentProvider;
