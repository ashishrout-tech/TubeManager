import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const userCredential = JSON.parse(cookies().get("credentials")?.value!);
  const postData = `token=${userCredential.access_token}`;

  cookies().delete("credentials");

  const postOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Content-Length": Buffer.byteLength(postData).toString(),
    },
    body: postData,
  };

  try {
    const response = await fetch(
      "https://oauth2.googleapis.com/revoke",
      postOptions
    );
    const data = await response.text();
    return new NextResponse("OK", {status: 200})
  } catch (error) {
    console.error(error);
    return new NextResponse((error as Error).message, {status: 500})
  }
 
}
