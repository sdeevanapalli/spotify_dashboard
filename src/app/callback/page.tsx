import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) return NextResponse.redirect("/app");

  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", process.env.SPOTIFY_REDIRECT_URI!);

  const basicAuth = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  ).toString("base64");

  const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  const tokenData = await tokenRes.json();

  if (!tokenData.access_token) return NextResponse.redirect("/app");

  // Set HTTP-only cookie
  const response = NextResponse.redirect("/dashboard");
  response.cookies.set("spotify_token", tokenData.access_token, {
    httpOnly: true,
    path: "/",
    maxAge: tokenData.expires_in,
    sameSite: "lax",
  });

  return response;
}
