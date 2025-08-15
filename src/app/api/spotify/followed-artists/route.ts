import { NextResponse } from "next/server";

async function getToken() {
  const res = await fetch("http://localhost:3000/api/spotify/token"); // your token route
  const data = await res.json();
  return data.access_token;
}

export async function GET() {
  try {
    const token = await getToken();
    const res = await fetch(
      "https://api.spotify.com/v1/me/following?type=artist&limit=20",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Followed artists route error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
