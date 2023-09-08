"use client"

import { Button } from "@/components/ui/button";
import {oauth2_v2} from "googleapis";
import {Dialog, DialogTrigger} from "@/components/ui/dialog";
import CreateDialogContentProvider from "@/components/landing/CreateDialogContentProvider";
import JoinDialogContentProvider from "@/components/landing/JoinDialogContentProvider";
import {useState} from "react";
import {Loader2Icon} from "lucide-react";
import {cn} from "@/lib/utils";
import {Separator} from "@/components/ui/separator";

const LandingFooterClient = ({
    userInfo
}: {
    userInfo:  oauth2_v2.Schema$Userinfo | null
}) => {
    const[isCreateLoading, setIsCreateLoading] = useState(false);

    return(
        <>
            <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-500 to-slate-800 text-transparent bg-clip-text dark:bg-gradient-to-r dark:from-slate-300 dark:to-slate-500">Workspace</span>

        <div className="flex justify-between w-10/12 md:w-5/12 mt-7">
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant={"outline"}
                            className="hover:bg-background transition-all border-b-4 hover:border-b-8 hover:-translate-y-0.5 active:translate-y-0 active:border-b-2 w-28 text-sm md:w-40 md:text-xl rounded-full"
                    >
                        Join
                    </Button>
                </DialogTrigger>
                <JoinDialogContentProvider userInfo={userInfo} />
            </Dialog>

            <Dialog>
                <DialogTrigger asChild>
                    <Button variant={"outline"} className="hover:bg-background transition-all border-b-4 hover:border-b-8 hover:-translate-y-0.5 active:translate-y-0 active:border-b-2 w-28 text-sm md:w-40 md:text-xl rounded-full">
                        { isCreateLoading && <Loader2Icon className=" absolute animate-spin" />}
                        <span className={cn(isCreateLoading ? " text-foreground/30": "" )}>Create</span>
                    </Button>
                </DialogTrigger>
                <CreateDialogContentProvider setLoader={setIsCreateLoading} userInfo={userInfo} />
            </Dialog>
        </div>
        </>
    )
}

export default LandingFooterClient;