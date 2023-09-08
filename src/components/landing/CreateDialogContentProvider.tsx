"use client"

import {DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {oauth2_v2} from "googleapis";
import {Separator} from "@/components/ui/separator";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Dispatch, SetStateAction, useState} from "react";
import {useRouter} from "next/navigation";
import {DialogClose} from "@radix-ui/react-dialog";
import {useToast} from "@/components/ui/use-toast";

const CreateDialogContentProvider = ({
     userInfo,
    setLoader
}: {
    userInfo:  oauth2_v2.Schema$Userinfo | null,
    setLoader:  Dispatch<SetStateAction<boolean>>
}) => {
    const router = useRouter();
    const[workspaceName, setWorkspaceName] = useState("")
    const {toast} = useToast();
    async function Submit(){
        try {
            setLoader(true);
            if(!userInfo?.email) throw new Error("Please Login to create Workspace");
            if(!workspaceName || workspaceName.length === 0) throw new Error("workspace name can't be empty");
            if(workspaceName.length >= 20) throw new Error("workspace name must be less than 20 characters");

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
            toast({
                description: "Successfully created. Wait for redirection.",
            })
            router.push(data.url);
        } catch (err: any) {
            toast({
                title: "ERROR",
                description: `${err.message}`,
                variant: "destructive"
            })
            console.log(err.message);
        } finally {
            setLoader(false);
        }
    }

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Create Workspace</DialogTitle>
                <DialogDescription>create workspace here and add editors in manage workspace section.</DialogDescription>
            </DialogHeader>
            <Separator />
            <div className=" flex flex-col">
                <Input type="text"
                       placeholder="Type your workspace name here"
                       onChange={(e) => setWorkspaceName(e.target.value)}
                />
                <DialogClose asChild>
                    <Button className="w-28 h-9 rounded-full mt-4"
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