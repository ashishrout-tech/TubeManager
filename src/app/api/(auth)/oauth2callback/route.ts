import { oauth2Client } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import {cookies} from "next/headers";

export async function GET(req: NextRequest) {
  let searchParams = req.nextUrl.searchParams;
  if (searchParams.has("error")) {
    console.log("Authorization error", searchParams.get("error"));
  } else {
    let code = searchParams.get("code") as string;
    let { tokens } = await oauth2Client.getToken(code);
    cookies().set("credentials", JSON.stringify(tokens))
  }
  return NextResponse.redirect(new URL("/", req.url), { status: 301 });
}
