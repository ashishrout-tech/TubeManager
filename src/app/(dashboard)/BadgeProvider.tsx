"use client"


import {useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import {Skeleton} from "@/components/ui/skeleton";
import {Badge} from "@/components/ui/badge";
import {CheckCircleIcon, Clock2Icon} from "lucide-react";

const BadgeProvider = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [isDeployed, setIsDeployed] = useState<Boolean | null>(null);
    const [name, setName] = useState<String | null>(null);

    useEffect(() => {
        async function getInfo() {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/workspace/getDeploy?id=${id}`);
                const data = await response.json();
                if(!response.ok) throw new Error(data.error);

                setIsDeployed(data.info.isDeployed);
                setName(data.info.name);
            } catch (e: any) {
                console.log(e.message);
            }
        }
        getInfo();
    }, [])

    if(name === null){
        return <Skeleton className="h-5 w-36 rounded-full" />
    }

    return (
        <>
            {!isDeployed &&
                <Badge className="h-4 sm:h-5 items-center bg-amber-600 flex gap-x-1 w-fit">
                    <Clock2Icon className="h-3 w-3" />
                    <span>{name}</span>
                </Badge>
            }
            {isDeployed &&
                <Badge className="h-4 sm:h-5 items-center bg-green-700 flex gap-x-1 w-fit">
                    <CheckCircleIcon className="h-3 w-3" />
                    <span>{name}</span>
                </Badge>
            }
        </>
    )
}
export default BadgeProvider;