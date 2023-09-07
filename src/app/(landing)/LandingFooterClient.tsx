"use client"

import { Button } from "@/components/ui/button";
import {oauth2_v2} from "googleapis";
import {Dialog, DialogTrigger} from "@/components/ui/dialog";
import CreateDialogContentProvider from "@/components/landing/CreateDialogContentProvider";
import JoinDialogContentProvider from "@/components/landing/JoinDialogContentProvider";
import {useState} from "react";
import {Loader2Icon} from "lucide-react";
import {cn} from "@/lib/utils";

const LandingFooterClient = ({
    userInfo
}: {
    userInfo:  oauth2_v2.Schema$Userinfo | null
}) => {
    const[isCreateLoading, setIsCreateLoading] = useState(false);

    return(
        <div className=" flex justify-between">
            <Dialog>
                <DialogTrigger asChild>
                    <Button>
                        Join
                    </Button>
                </DialogTrigger>
                <JoinDialogContentProvider userInfo={userInfo} />
            </Dialog>

            <Dialog>
                <DialogTrigger asChild>
                    <Button>
                        { isCreateLoading && <Loader2Icon className=" absolute animate-spin" />}
                        <span className={cn(isCreateLoading ? " text-foreground/30": "" )}>Create</span>
                    </Button>
                </DialogTrigger>
                <CreateDialogContentProvider setLoader={setIsCreateLoading} userInfo={userInfo} />
            </Dialog>
        </div>
    )
}

export default LandingFooterClient;