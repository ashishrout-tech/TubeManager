import LandingFooterClient from "./LandingFooterClient";
import {cookies} from "next/headers";
import {oauth2_v2} from "googleapis";

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
    <div>
      LANDING PAGE
    </div>
    <LandingFooterClient userInfo={userData} />
  </div>;
}
