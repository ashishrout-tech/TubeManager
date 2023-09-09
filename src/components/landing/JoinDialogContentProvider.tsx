"use client"

import {DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {useEffect, useState} from "react";
import {oauth2_v2} from "googleapis";
import {Separator} from "@/components/ui/separator";
import {ScrollArea} from "@/components/ui/scroll-area";
import { CheckCircleIcon, Clock2Icon, ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {buttonVariants} from "@/components/ui/button";

const JoinDialogContentProvider = ({
    userInfo
}: {
    userInfo:  oauth2_v2.Schema$Userinfo | null
}) => {
    type workspaceType = {
        id: string,
        name: string,
        adminEmail: string,
        createdAt: Date,
        isDeployed: boolean,
    }[]
    const[adminWorkspaces, setAdminWorkspaces] = useState<workspaceType>([])
    const[editorWorkspaces, setEditorWorkspaces] = useState<workspaceType>([])
    const[loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        async function getData() {
            try {
                if(!userInfo) throw new Error("Login to display all workspaces")
                setLoggedIn(true);

                const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/workspace`, {
                    headers: {
                        email: userInfo.email!
                    },
                    cache: "no-store"
                })
                const data = await response.json();
                if(!response.ok) throw new Error(data.error);
                setAdminWorkspaces(data.adminWorkspaces);
                setEditorWorkspaces(data.editorWorkspaces);
            } catch (e: any) {
                // TODO
                console.log(e.message);
            }
        }

        getData();
    }, [])


    if(!loggedIn){
        return (
            <DialogContent>
                To access workspaces, please login
                <div className="flex flex-col">
                    If you&rsquo;re not logged in, try out this dummy workspace:
                    <Link target={"_blank"}
                          href={`${process.env.NEXT_PUBLIC_URL}/workspace?id=49387914-b8ea-4b1e-b00d-869a8e0a57e0`}
                          className={cn(buttonVariants({variant: "link"}))}
                    >
                        Link <ExternalLinkIcon />
                    </Link>
                </div>
            </DialogContent>
        )
    }

    return(
        <DialogContent >
            <DialogHeader>
                <DialogTitle>
                    <div className=" flex justify-between">
                        <div className=" text-2xl">Join Workspace</div>
                        <div className=" gap-x-2 mr-5 flex sm:gap-x-4 sm:mr-12">
                            <div className=" flex flex-col h-fit items-center text-yellow-500">
                                <Clock2Icon className="h-5 w-5 p-0.5" />
                                <span style={{fontSize: "0.6rem"}}>In progress</span>
                            </div>
                            <div className=" flex flex-col h-fit items-center gap-y-0.5 text-green-500">
                                <CheckCircleIcon className="h-5 w-5 p-0.5" />
                                <span style={{fontSize: "0.6rem"}}>Deployed</span>
                            </div>
                        </div>
                    </div>
                </DialogTitle>
            </DialogHeader>

            <div>
                <div>
                   <span className=" text-sm text-muted-foreground font-serif">Admin access (<i style={{fontSize: "0.8rem"}} className=" tracking-wide">created by you</i>)</span>
                    <Separator className=" my-2" />
                    <div className=" w-full">
                        <div className="px-2 text-xs text-muted-foreground flex justify-between ">
                            <span className="w-6/12 ">Workspace Name</span>
                            <span className="w-6/12">Created On</span>
                        </div>
                        <ScrollArea className="mt-2 min-h-[9rem] max-h-20 border-t pt-1 flex flex-col px-2 w-full">
                            {
                                adminWorkspaces.map((ele) => (
                                    <div key={ele.id} className="w-full flex justify-between items-center mb-1.5 text-xs">
                                        <span className="w-6/12 overflow-hidden flex gap-x-2 items-center">
                                            {ele.name.slice(0, 20)}
                                            {!ele.isDeployed && <Clock2Icon style={{height: "0.8rem", width: "0.8rem"}} className=" text-yellow-600 dark:text-yellow-500" />}
                                            {ele.isDeployed && <CheckCircleIcon style={{height: "0.8rem", width: "0.8rem"}} className=" text-green-500" />}
                                        </span>
                                        <span className="w-4/12 ">{new Date(ele.createdAt).toLocaleDateString()}</span>
                                        <Link target={"_blank"} href={`/workspace?id=${ele.id}`} className="w-2/12 pl-4 mb-0.5"> <ExternalLinkIcon className=" h-5 w-5 p-0.5 hover:text-muted-foreground" /> </Link>
                                    </div>
                                ))
                            }
                        </ScrollArea>
                    </div>
                </div>


                <div className=" mt-5">
                    <span className=" text-sm text-muted-foreground font-serif">Editing access (<i style={{fontSize: "0.8rem"}} className=" tracking-wide">access granted by others</i>)</span>
                    <Separator className=" my-2" />
                    <div>
                        <div className=" px-2 text-xs text-muted-foreground flex justify-between ">
                            <span className=" w-[44%] sm:w-[46%] ">Workspace Name</span>
                            <span className=" w-[33%] sm:w-[32%] ">Created By</span>
                            <span className="w-[23%] sm:w-[22%]">Created On</span>
                        </div>
                        <ScrollArea className=" mt-2 min-h-[9rem] max-h-20 border-t pt-1 flex flex-col px-2 ">
                            {
                                editorWorkspaces.map((ele) => (
                                    <div key={ele.id} className=" w-full flex justify-between items-center mb-1.5 text-xs">
                                        <span className="w-[44%] sm:w-[46%] overflow-hidden flex gap-x-2 items-center">
                                            {ele.name.slice(0, 20)}
                                            {!ele.isDeployed && <Clock2Icon style={{height: "0.8rem", width: "0.8rem"}} className=" text-yellow-600 dark:text-yellow-500" />}
                                            {ele.isDeployed && <CheckCircleIcon style={{height: "0.8rem", width: "0.8rem"}} className=" text-green-500" />}
                                        </span>
                                        <span className="w-[33%] sm:w-[32%] ">{ele.adminEmail.split("@")[0].slice(0, 25)}</span>
                                        <span className="w-[18%] sm:w-[15%] ">{new Date(ele.createdAt).toLocaleDateString()}</span>
                                        <Link target={"_blank"} href={`/workspace?id=${ele.id}`} className="w-[5%] sm:w-[7%] sm:pl-2 mb-0.5"> <ExternalLinkIcon className=" h-5 w-5 p-0.5 hover:text-muted-foreground" /> </Link>
                                    </div>
                                ))
                            }
                        </ScrollArea>
                    </div>
                </div>

            </div>
        </DialogContent>
    )
}
export default JoinDialogContentProvider;