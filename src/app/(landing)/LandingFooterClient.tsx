"use client"

import { Button } from "@/components/ui/button";
import {oauth2_v2} from "googleapis";
import {Dialog, DialogTrigger} from "@/components/ui/dialog";
import CreateDialogContentProvider from "@/components/landing/CreateDialogContentProvider";
import JoinDialogContentProvider from "@/components/landing/JoinDialogContentProvider";

const LandingFooterClient = ({
    userInfo
}: {
    userInfo:  oauth2_v2.Schema$Userinfo | null
}) => {


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
                        Create
                    </Button>
                </DialogTrigger>
                <CreateDialogContentProvider userInfo={userInfo} />

            </Dialog>
        </div>
    )
}

export default LandingFooterClient;