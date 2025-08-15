import { NextResponse } from "next/server";

async function getToken() {
  const res = await fetch("http://localhost:3000/api/spotify/token");
  const data = await res.json();
  return data.access_token;
}

export async function GET() {
  const token = await getToken();
  const res = await fetch("https://api.spotify.com/v1/me/top/artists", {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  return NextResponse.json(data);
}
