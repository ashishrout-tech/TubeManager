import { authorizationUrl } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.redirect(new URL(authorizationUrl), { status: 307 });
}
