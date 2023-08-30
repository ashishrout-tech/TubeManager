import Navbar from "@/components/navbar";
import { oauth2Client } from "@/lib/auth";
import { google, oauth2_v2 } from "googleapis";
import { cookies } from "next/headers";



export default async function NavbarProvider() {
  const profile = google.oauth2("v2");
  let userData: oauth2_v2.Schema$Userinfo | null = null;

  try {
    const credentials = cookies().get("credentials");
    if (credentials) { 
      oauth2Client.setCredentials(JSON.parse(credentials?.value!));
      const user = await profile.userinfo.get({
        auth: oauth2Client,
      });
      userData = user.data;
    }
  } catch (err) {
    console.log("User Fetching Error",(err as Error)?.name, (err as Error)?.message);
  }

  return (
    <>
      <Navbar userInfo={userData} />
    </>
  );
}
