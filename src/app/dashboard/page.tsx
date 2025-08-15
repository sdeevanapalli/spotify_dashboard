"use client";
import React, { useEffect, useState } from "react";

interface Track {
  id: string;
  name: string;
  artists: { name: string }[];
  album: { images: { url: string }[] };
  external_urls: { spotify: string };
}

interface User {
  display_name: string;
  images: { url: string }[];
}

export default function Dashboard() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const recRes = await fetch("/api/spotify/recommendations");
        const recData = await recRes.json();
        setTracks(recData.tracks || []);

        const meRes = await fetch("/api/spotify/me");
        const meData = await meRes.json();
        setUser(meData);

        const playingRes = await fetch("/api/spotify/currently-playing");
        const playingData = await playingRes.json();
        if (playingData.playing) setCurrentTrack(playingData.track);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <p className="text-xl text-white">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      {/* User Info */}
      {user && (
        <div className="flex items-center mb-10">
          {user.images[0]?.url && (
            <img
              src={user.images[0].url}
              alt={user.display_name}
              className="w-16 h-16 rounded-full mr-4"
            />
          )}
          <h1 className="text-3xl font-bold">{user.display_name}</h1>
        </div>
      )}

      {/* Currently Playing Track */}
      {currentTrack && (
        <div className="mb-10 p-4 bg-green-700 bg-opacity-20 rounded-2xl shadow-lg flex items-center gap-4 hover:bg-opacity-30 transition">
          <img
            src={currentTrack.album.images[0]?.url}
            alt={currentTrack.name}
            className="w-20 h-20 rounded-lg"
          />
          <div>
            <h2 className="font-bold text-xl">{currentTrack.name}</h2>
            <p className="text-gray-300">
              {currentTrack.artists.map((a) => a.name).join(", ")}
            </p>
          </div>
        </div>
      )}

      {/* Recommendations */}
      <h2 className="text-2xl font-bold mb-6">Recommended Tracks</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {tracks.map((track) => (
          <a
            key={track.id}
            href={track.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition p-4 flex flex-col items-center transform hover:scale-105"
          >
            <img
              src={track.album.images[0]?.url}
              alt={track.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="font-semibold text-lg text-center">{track.name}</h3>
            <p className="text-gray-400 text-center mt-1">
              {track.artists.map((a) => a.name).join(", ")}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
