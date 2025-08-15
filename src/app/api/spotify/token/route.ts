import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { code } = await req.json();
    if (!code) return NextResponse.json({ error: "Missing code" }, { status: 400 });

    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;
    const redirectUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI!;

    const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
    const params = new URLSearchParams({ grant_type: "authorization_code", code, redirect_uri: redirectUri });

    const res = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${basicAuth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });

    const data = await res.json();
    if (!data.access_token) return NextResponse.json({ error: "Failed to get token", data }, { status: 500 });

    const response = NextResponse.json({ success: true });
    response.cookies.set("spotify_access_token", data.access_token, { httpOnly: true, path: "/" });
    return response;
  } catch (err) {
    console.error("Token route error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
