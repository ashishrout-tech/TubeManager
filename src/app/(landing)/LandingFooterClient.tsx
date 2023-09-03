"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

const LandingFooterClient = () => {
    const router = useRouter();

    async function createWorkspace() {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/workspace`, {
                cache: "no-store"
            })
            const data = await response.json()
            if(!response.ok) throw new Error((await response.json()).error)
            router.push(data.url)
        } catch (error: any) {
            // TODO
            console.log(error.message)
        }
    }

    return(
        <div className=" flex justify-between">
            <Button onClick={() => {}}> 
                Join 
            </Button>
            <Button onClick={createWorkspace}> 
                Create 
            </Button>
        </div>
    )
}

export default LandingFooterClient;