import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("spotify_token")?.value;
  if (!token) return NextResponse.json({ error: "No token" }, { status: 401 });

  const res = await fetch("https://api.spotify.com/v1/me", {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) return NextResponse.json({ error: "Failed to fetch" }, { status: res.status });

  const data = await res.json();
  return NextResponse.json(data);
}
