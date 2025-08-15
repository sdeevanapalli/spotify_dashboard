"use client";
import React, { useEffect, useState } from "react";

interface User { display_name: string; email: string; country: string; images: { url: string }[]; }
interface Track { id: string; name: string; artists: { name: string }[]; album: { images: { url: string }[] }; duration_ms: number; progress_ms?: number; }

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const meRes = await fetch("/api/spotify/me");
        if (!meRes.ok) {
          window.location.href = "/app";
          return;
        }
        const me = await meRes.json();
        setUser(me);

        const playingRes = await fetch("/api/spotify/currently-playing");
        if (playingRes.ok) {
          const playing = await playingRes.json();
          if (playing.playing) setCurrentTrack(playing.track);
        }
      } catch (err) {
        console.error(err);
        window.location.href = "/app";
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>{user?.display_name}</h1>
      {currentTrack && <p>Now Playing: {currentTrack.name}</p>}
    </div>
  );
}
