"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const ImageProvider = ({src}: {src?: string}) => {
  return (
    <>
      <Card>
        <CardContent>
          <div className=" mt-6 max-w-2xl m-auto">
            {src && <Image
              className=" w-full h-full rounded-md"
              height={1000}
              width={1000}
              src={src}
              alt="thumbnail"
            />}
          </div>
        </CardContent>
        <CardFooter className=" flex justify-between">
          {src && <Button variant={"outline"}>Download</Button>}
          <Button variant={"outline"}>Update</Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default ImageProvider;
