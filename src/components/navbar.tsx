"use client";

import Image from "next/image";
import { ModeToggle } from "./provider/toogle";
import { oauth2_v2 } from "googleapis";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton"
import NavigationProvider from "@/components/NavigationProvider";
import {useToast} from "@/components/ui/use-toast";


const Navbar = ({
  userInfo,
}: {
  userInfo: oauth2_v2.Schema$Userinfo | null;
}) => {
  const router = useRouter();
  const[userData, setUserData] = useState(userInfo);
  const[loading, setLoading] = useState(false);
  const {toast} = useToast();

  const pathName = usePathname();
  const id = useSearchParams().get("id");
  async function Logout() {
    try {
      setLoading(true);
      const response = await fetch("/api/logout", {cache: "no-cache"})
      if(!response.ok) throw new Error("Something went wrong");
      console.log(await response.text());
    } catch (error: any) {
      toast({
        title: "ERROR",
        description: `${error.message}`,
        variant: "destructive"
      })
      console.log(error);
    } finally {
      if(userData !== null) {
        setUserData(null)
      }
      setLoading(false);
      router.push("/");
    }
  }

  return (
    <div className=" top-0 fixed w-full z-10">
      <div className=" px-4 p-2 flex justify-between">
        <div className=" flex gap-x-2 w-fit pt-1.5">
          <Image className=" h-7 w-auto" src={"/logo.png"} alt="logo" height={40} width={40}></Image>
          <h1 className=" text-xl">Youtube</h1>
        </div>

        <div className=" flex gap-x-4 sm:gap-x-10">
          { userData && !loading && pathName !== "/" &&
          <div className="hidden sm:visible">
            <NavigationProvider id={id} />
          </div>
          }
          <div>
            {userData && !loading && (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage src={`${userData?.picture}`} />
                    <AvatarFallback>{`${userData?.given_name?.charAt(
                      0
                    )} ${userData?.family_name?.charAt(0)}`}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem onClick={Logout} className="hover:cursor-pointer">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            {loading && 
              <Skeleton className="mt-1.5 h-7 w-20 sm:w-24 sm:h-8 sm:mt-1" />
            }
            {!userData && (
              <Link
                className={cn(
                  buttonVariants({ variant: "default" }),
                  " mt-1.5 h-7 w-20 sm:w-24 sm:h-8 sm:mt-1"
                )}
                href={"/authorization"}
              >
                Login
              </Link>
            )}
          </div>

          <div className=" h-5 w-10">
            <ModeToggle />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
