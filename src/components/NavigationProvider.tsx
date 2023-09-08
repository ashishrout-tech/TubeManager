"use client"

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuLink, navigationMenuTriggerStyle, NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import {ArrowLeftIcon} from "lucide-react";

const NavigationProvider = ({id}: {id: string | null}) => {
    const router = useRouter();
    const pathName = usePathname();

    return (
        <NavigationMenu>
            <NavigationMenuList>

                <NavigationMenuItem>
                    <Link href={"/"} legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Home
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>

                {pathName === "/workspace" &&
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Manage</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid gap-3 p-6 md:w-96">
                                <li>
                                    <NavigationMenuLink asChild>
                                        <a href={`/manage-workspace?id=${id}`} className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                            <div className="text-sm font-medium leading-none">Editors</div>
                                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">Add or Remove any users from this workspace.</p>
                                        </a>
                                    </NavigationMenuLink>
                                </li>

                                <li>
                                    <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground hover:cursor-pointer">
                                        <div className="text-sm font-medium leading-none text-red-700 dark:text-red-500">Delete</div>
                                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">This action will permanently delete this workspace and it&rsquo;s data.</p>
                                    </div>
                                </li>

                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                }
                {pathName === "/manage-workspace" &&
                    <NavigationMenuItem className="group hover:cursor-pointer">
                        <div className="flex items-center gap-x-1 ml-1 w-fit"
                            onClick={() => router.back()}
                        >
                            <ArrowLeftIcon className="h-4 w-4 group-hover:-translate-x-0.5" />
                            Back
                        </div>
                    </NavigationMenuItem>
                }

            </NavigationMenuList>
        </NavigationMenu>
    )
}
export default NavigationProvider;