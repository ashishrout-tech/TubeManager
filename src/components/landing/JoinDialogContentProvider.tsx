"use client"

import {DialogContent} from "@/components/ui/dialog";
import {useEffect, useState} from "react";
import {oauth2_v2} from "googleapis";

const JoinDialogContentProvider = ({
    userInfo
}: {
    userInfo:  oauth2_v2.Schema$Userinfo | null
}) => {
    type workspaceType = {
        id: string,
        name: string,
        adminEmail: string,
        createdAt: Date
    }[]
    const [uiLoading, setUiLoading] = useState(false);
    const[adminWorkspaces, setAdminWorkspaces] = useState<workspaceType>()
    const[editorWorkspaces, setEditorWorkspaces] = useState<workspaceType>()
    const[loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        async function getData() {
            try {
                setUiLoading(true);
                if(!userInfo) throw new Error("Login to display all workspaces")
                setLoggedIn(true);

                const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/workspace`, {
                    body: JSON.stringify({
                        email: userInfo.email!
                    }),
                    cache: "no-store"
                })
                const data = await response.json();
                if(!response.ok) throw new Error(data.error);

                setAdminWorkspaces(data.adminWorkspaces);
                setEditorWorkspaces(data.editorWorkspaces);
            } catch (e: any) {
                // TODO
                console.log(e.message);
            } finally {
                setUiLoading(false);
            }
        }

        getData();
    }, [])

    return(
        <DialogContent>

        </DialogContent>
    )
}
export default JoinDialogContentProvider;