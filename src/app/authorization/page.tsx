"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const Authorization = () => {
  return (
    <div className=" flex justify-center items-center h-screen">
      <Tabs defaultValue="Login" className=" w-10/12 sm:w-[400px]">
        <TabsList className=" grid w-full grid-cols-2">
          <TabsTrigger value="Login">Login</TabsTrigger>
          <TabsTrigger value="Signup">Signup</TabsTrigger>
        </TabsList>
        <TabsContent value="Login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Login to your account here.</CardDescription>
            </CardHeader>
            <CardContent className=" grid grid-cols-12 mt-1">
              <Image
                className={"col-span-2"}
                width={30}
                height={30}
                alt="google-logo"
                src={"/search.png"}
              />
              <Link
                className={cn(
                  buttonVariants({ variant: "default", size: "default" }),
                  " h-8 col-span-10 tracking-wide"
                )}
                href={"/api/login"}
              >
                
                Login with Google
              </Link>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="Signup">
          <Card>
            <CardHeader>
              <CardTitle>Signup</CardTitle>
              <CardDescription>Signup here.</CardDescription>
            </CardHeader>
            <CardContent className=" grid grid-cols-12 mt-1">
              <Image
                className={"col-span-2"}
                width={30}
                height={30}
                alt="google-logo"
                src={"/search.png"}
              />
              <Link
                className={cn(
                  buttonVariants({ variant: "default", size: "default" }),
                  " h-8 col-span-10 tracking-wide"
                )}
                href={"/api/login"}
              >
               
                Signup with Google
              </Link>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default Authorization;
