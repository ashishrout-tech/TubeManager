import { google, oauth2_v2 } from "googleapis";

import Navbar from "@/components/navbar";
import { cookies } from "next/headers";
import { oauth2Client } from "@/lib/auth";

export default async function NavbarProvider() {

  
  let userData: oauth2_v2.Schema$Userinfo | null = null;
  try {
    const profile = google.oauth2("v2");
    const credentials = cookies().get("credentials");
    
    oauth2Client.setCredentials(JSON.parse(credentials?.value!));
    const user = await profile.userinfo.get({
      auth: oauth2Client,
    });
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user`, {
      headers: {
        'Cookie': `${credentials?.name!}=${credentials?.value!}`
      },
      cache: "no-store"
    })
    if(!response.ok) throw new Error((await response.json()).error)

    userData = user.data
    
  } catch (error) {
    console.log((error as Error).message);
  }

 

  return (
    <>
      <Navbar userInfo={userData} />
    </>
  );
}
