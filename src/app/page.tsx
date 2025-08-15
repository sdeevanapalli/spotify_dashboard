"use client";
import React from "react";

const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!;
const redirectUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI!;
const scopes = [
  "user-read-private",
  "user-read-email",
  "user-top-read",
  "playlist-modify-public",
  "user-follow-read",
  "user-read-playback-state",
  "user-read-currently-playing"
].join("%20");

export default function Home() {
  const handleLogin = () => {
    const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${scopes}&redirect_uri=${encodeURIComponent(redirectUri)}`;
    window.location.href = authUrl;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-6">Music Recommender</h1>
      <button
        onClick={handleLogin}
        className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
      >
        Login with Spotify
      </button>
    </div>
  );
}
