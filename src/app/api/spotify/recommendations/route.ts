import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Return a small set of hardcoded tracks for now
    const liteRecommendations = [
      {
        id: "3n3Ppam7vgaVa1iaRUc9Lp",
        name: "Lose Yourself",
        artists: [{ name: "Eminem" }],
        album: { images: [{ url: "https://i.scdn.co/image/ab67616d0000b273e44e7d7c0c0c70b2b3f25d62" }] },
        external_urls: { spotify: "https://open.spotify.com/track/3n3Ppam7vgaVa1iaRUc9Lp" },
      },
      {
        id: "7ouMYWpwJ422jRcDASZB7P",
        name: "Blinding Lights",
        artists: [{ name: "The Weeknd" }],
        album: { images: [{ url: "https://i.scdn.co/image/ab67616d0000b273c5edc0c0a83b8d06c1a2e1b3" }] },
        external_urls: { spotify: "https://open.spotify.com/track/7ouMYWpwJ422jRcDASZB7P" },
      },
    ];

    return NextResponse.json({ tracks: liteRecommendations });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
