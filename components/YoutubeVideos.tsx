"use client";
import React, { useEffect, useState } from "react";

const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
const CHANNEL_ID = "UCZFGT7aMFQd4sXDxCqRPTBw"; // Replace with your channel ID

interface Video {
  id: { videoId: string };
  snippet: {
    title: string;
    thumbnails: { medium: { url: string } };
  };
}

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVideos() {
      setLoading(true);
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=12&type=video`
      );
      const data = await res.json();
      setVideos(data.items || []);
      setLoading(false);
    }
    fetchVideos();
  }, []);

  return (
    <main className="min-h-screen bg-white py-16">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-green-800 mb-8 text-center">
          Latest Videos
        </h1>
        {loading ? (
          <div className="text-center text-gray-500">Loading videos...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {videos.map((video) => (
              <a
                key={video.id.videoId}
                href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-gray-50 rounded-lg shadow hover:shadow-lg transition"
              >
                <img
                  src={video.snippet.thumbnails.medium.url}
                  alt={video.snippet.title}
                  className="w-full rounded-t-lg"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {video.snippet.title}
                  </h2>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}