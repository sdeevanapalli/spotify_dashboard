import { NextResponse } from "next/server";

async function getToken() {
  const res = await fetch("http://localhost:3000/api/spotify/token");
  const data = await res.json();
  return data.access_token;
}

export async function GET() {
  const token = await getToken();
  const res = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.status === 204) return NextResponse.json({}); // nothing playing
  const data = await res.json();
  return NextResponse.json(data);
}
