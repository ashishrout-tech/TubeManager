import LandingFooterClient from "./LandingFooterClient";
import {cookies} from "next/headers";
import {oauth2_v2} from "googleapis";
import LandingHeader from "./LandingHeader";
import {Separator} from "@/components/ui/separator";
import LandingFooter from "./LandingFooter";

export default async function Home() {

  let userData: oauth2_v2.Schema$Userinfo | null = null;
  try {

    const credentials = cookies().get("credentials");

    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user`, {
      headers: {
        'Cookie': `${credentials?.name!}=${credentials?.value!}`
      },
      cache: "no-store"
    })
    if(!response.ok) throw new Error((await response.json()).error)

    const data = await response.json();

    userData = data.userData;

  } catch (error) {
    console.log((error as Error).message);
  }



  return <div className=" mt-16">
    <div className="mt-28 md:mt-36">
      <LandingHeader />
    </div>
    <span className="flex justify-center"><Separator className="my-14 md:my-12 w-10/12 md:w-9/12" /></span>
    <div className="flex flex-col items-center justify-center">
      <LandingFooterClient userInfo={userData} />
    </div>

    <div className="relative h-[100px] mt-16">
      <div className="custom-background-size absolute h-full w-full bg-wave-pattern animate-waves4 opacity-100 z-50 bottom-0"></div>
      <div className="custom-background-size absolute h-full w-full bg-wave-pattern animate-W4 opacity-50 z-40 bottom-2.5"></div>
      <div className="custom-background-size absolute h-full w-full bg-wave-pattern animate-waves3 opacity-20 z-50 bottom-4"></div>
      <div className="custom-background-size absolute h-full w-full bg-wave-pattern animate-W3 opacity-70 z-40 bottom-5"></div>
    </div>

    <div className="h-full bg-footer w-full">
      <LandingFooter />
    </div>
  </div>;
}
