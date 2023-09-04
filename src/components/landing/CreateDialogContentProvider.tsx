"use client"

import {DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {oauth2_v2} from "googleapis";
import {Separator} from "@/components/ui/separator";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {DialogClose} from "@radix-ui/react-dialog";

const CreateDialogContentProvider = ({
     userInfo
}: {
    userInfo:  oauth2_v2.Schema$Userinfo | null
}) => {
    const router = useRouter();
    const[workspaceName, setWorkspaceName] = useState("")

    async function Submit(){
        try {
            if(!userInfo?.email) throw new Error("Please Login to create Workspace");
            if(!workspaceName || workspaceName.length === 0) throw new Error("workspace name can't be empty");

            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/workspace`, {
                method: "POST",
                body: JSON.stringify({
                    workspaceName: workspaceName,
                    adminEmail: userInfo.email
                }),
                cache: "no-store"
            })
            const data = await response.json()
            if (!response.ok) throw new Error(data.error);
            router.push(data.url);
        } catch (err: any) {
            // TODO
            console.log(err.message);
        }
    }

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Create Workspace</DialogTitle>
                <DialogDescription>create workspace here and add editors in manage workspace section.</DialogDescription>
            </DialogHeader>
            <Separator className=" my-4" />
            <div className=" flex flex-col">
                <Input type="text"
                       placeholder="Type your workspace name here"
                       onChange={(e) => setWorkspaceName(e.target.name)}
                />
                <DialogClose asChild>
                    <Button className=" w-fit h-7"
                            type="submit"
                            onClick={Submit}
                    >
                        Create
                    </Button>
                </DialogClose>
            </div>
        </DialogContent>
    )
}
export default CreateDialogContentProvider;