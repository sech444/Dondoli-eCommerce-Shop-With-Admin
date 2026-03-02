// // /components/YoutubeVideos.tsx

// "use client";
// import React, { useEffect, useState } from "react";
// import { Play, ExternalLink, Users, Star, Clock, Share2, Facebook, MessageCircle } from 'lucide-react';

// const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
// const CHANNEL_ID = "UCZFGT7aMFQd4sXDxCqRPTBw"; // Replace with your channel ID

// export const metadata = {
//   title: 'Customer Testimonies | DONDOOIL Success Stories',
//   description: 'Watch real customer testimonies and success stories about DONDOOIL natural health supplements and their life-changing benefits.',
// };

// interface Video {
//   id: { videoId: string };
//   snippet: {
//     title: string;
//     description: string;
//     thumbnails: { 
//       medium: { url: string };
//       high: { url: string };
//     };
//     publishedAt: string;
//   };
// }

// export default function TestimonyVideosPage() {
//   const [videos, setVideos] = useState<Video[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
//   const [showShareDropdown, setShowShareDropdown] = useState(false);

//   useEffect(() => {
//     async function fetchVideos() {
//       setLoading(true);
//       setError(null);
      
//       try {
//         if (!YOUTUBE_API_KEY) {
//           // Fallback demo videos if no API key
//           setVideos([
//             {
//               id: { videoId: "dQw4w9WgXcQ" },
//               snippet: {
//                 title: "Amazing Recovery Story - Sarah's Journey with DONDOOIL",
//                 description: "Sarah shares her incredible recovery story after using DONDOOIL supplements...",
//                 thumbnails: { 
//                   medium: { url: "/api/placeholder/320/180" },
//                   high: { url: "/api/placeholder/480/360" }
//                 },
//                 publishedAt: "2024-01-15T10:00:00Z"
//               }
//             },
//             {
//               id: { videoId: "dQw4w9WgXcQ" },
//               snippet: {
//                 title: "Immune System Boost - John's Testimony",
//                 description: "How DONDOOIL helped John strengthen his immune system naturally...",
//                 thumbnails: { 
//                   medium: { url: "/api/placeholder/320/180" },
//                   high: { url: "/api/placeholder/480/360" }
//                 },
//                 publishedAt: "2024-01-10T14:30:00Z"
//               }
//             }
//           ]);
//           setLoading(false);
//           return;
//         }

//         const res = await fetch(
//           `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=12&type=video`
//         );

//         if (!res.ok) {
//           throw new Error(`Failed to fetch videos: ${res.status}`);
//         }

//         const data = await res.json();
        
//         if (data.error) {
//           throw new Error(data.error.message);
//         }

//         setVideos(data.items || []);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "Failed to load videos");
//       } finally {
//         setLoading(false);
//       }
//     }
    
//     fetchVideos();
//   }, []);

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   const truncateDescription = (description: string, maxLength: number = 100) => {
//     if (description.length <= maxLength) return description;
//     return description.substring(0, maxLength) + '...';
//   };

//   // Social sharing functions
//   const shareToFacebook = () => {
//     const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
//     const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
//     window.open(facebookUrl, '_blank', 'width=600,height=400');
//     setShowShareDropdown(false);
//   };

//   const shareToWhatsApp = () => {
//     const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
//     const shareText = "Check out these amazing DONDOOIL customer testimonies and success stories!";
//     const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + currentUrl)}`;
//     window.open(whatsappUrl, '_blank');
//     setShowShareDropdown(false);
//   };

//   return (
//     <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
//       {/* Top spacing and decorative elements */}
//       <div className="h-32 bg-green-50"></div>
//       <div className="relative w-full h-20 overflow-hidden">
//         <svg className="absolute bottom-0 w-full h-20" viewBox="0 0 1440 120" preserveAspectRatio="none">
//           <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z" 
//                 fill="#4ade80" fillOpacity="0.2"/>
//         </svg>
//       </div>

//       <div className="py-12 px-4 sm:px-6 lg:px-8 -mt-20">
//         <div className="max-w-7xl mx-auto">
//           {/* Hero Section */}
//           <div className="text-center mb-20 pt-16 animate-fade-in">
//             <div className="inline-block p-2 bg-green-100 rounded-full mb-4">
//               <Users className="w-8 h-8 text-green-600" />
//             </div>
//             <h1 className="text-5xl font-bold text-green-800 mb-6">
//               Customer Testimonies
//             </h1>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               Real stories from real customers who have experienced the life-changing benefits of DONDOOIL natural health supplements
//             </p>
//           </div>

//           {/* Video Modal */}
//           {selectedVideo && (
//             <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
//               <div className="bg-white rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh]">
//                 <div className="p-4 border-b flex justify-between items-center">
//                   <h3 className="text-xl font-semibold text-green-700">Watch Video</h3>
//                   <button 
//                     onClick={() => setSelectedVideo(null)}
//                     className="text-gray-500 hover:text-gray-700 text-2xl"
//                   >
//                     ×
//                   </button>
//                 </div>
//                 <div className="aspect-video">
//                   <iframe
//                     src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
//                     className="w-full h-full"
//                     allowFullScreen
//                     allow="autoplay"
//                   ></iframe>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Videos Section */}
//           <div className="mb-20">
//             <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-8 md:p-12">
//               <div className="flex items-center justify-between mb-8">
//                 <h2 className="text-3xl font-semibold text-green-700 flex items-center">
//                   <Play className="w-8 h-8 mr-3 text-green-600" />
//                   Success Stories
//                 </h2>
//                 <div className="flex items-center text-green-600">
//                   <Star className="w-5 h-5 mr-2" />
//                   <span className="text-sm font-medium">Real Customer Experiences</span>
//                 </div>
//               </div>

//               {loading ? (
//                 <div className="text-center py-12">
//                   <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mb-4"></div>
//                   <div className="text-gray-500">Loading testimonies...</div>
//                 </div>
//               ) : error ? (
//                 <div className="text-center py-12">
//                   <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
//                     <div className="text-red-600 mb-2">Unable to load videos</div>
//                     <p className="text-red-500 text-sm">{error}</p>
//                   </div>
//                 </div>
//               ) : videos.length === 0 ? (
//                 <div className="text-center py-12 text-gray-500">
//                   <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
//                   <p>No testimonies available at the moment</p>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                   {videos.map((video) => (
//                     <div
//                       key={video.id.videoId}
//                       className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
//                     >
//                       <div className="relative group cursor-pointer">
//                         <img
//                           src={video.snippet.thumbnails.medium.url}
//                           alt={video.snippet.title}
//                           className="w-full h-48 object-cover"
//                           loading="lazy"
//                         />
//                         <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
//                           <div className="transform scale-0 group-hover:scale-100 transition-transform duration-300">
//                             <Play className="w-16 h-16 text-white" />
//                           </div>
//                         </div>
//                       </div>
                      
//                       <div className="p-6">
//                         <h3 className="text-lg font-semibold text-green-700 mb-3 line-clamp-2 min-h-[3.5rem]">
//                           {video.snippet.title}
//                         </h3>
                        
//                         <p className="text-gray-600 text-sm mb-4 line-clamp-3">
//                           {truncateDescription(video.snippet.description)}
//                         </p>
                        
//                         <div className="flex items-center text-xs text-gray-500 mb-4">
//                           <Clock className="w-4 h-4 mr-1" />
//                           {formatDate(video.snippet.publishedAt)}
//                         </div>
                        
//                         <div className="flex gap-2">
//                           <button
//                             onClick={() => setSelectedVideo(video.id.videoId)}
//                             className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center text-sm font-medium"
//                           >
//                             <Play className="w-4 h-4 mr-2" />
//                             Watch Here
//                           </button>
//                           <a
//                             href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="bg-gray-100 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center"
//                           >
//                             <ExternalLink className="w-4 h-4" />
//                           </a>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Call to Action Section with Social Sharing */}
//           <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//             <div className="p-8 md:p-12 text-center">
//               <h2 className="text-3xl font-semibold text-green-700 mb-6">Share Your Story</h2>
//               <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
//                 Have you experienced positive results with DONDOOIL? We'd love to hear your success story! 
//                 Share your testimony and inspire others on their wellness journey.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                 {/* Share Your Story Button with Social Media Dropdown */}
//                 <div className="relative">
//                   <button 
//                     onClick={() => setShowShareDropdown(!showShareDropdown)}
//                     className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
//                   >
//                     <Share2 className="w-5 h-5" />
//                     Share Your Story
//                   </button>
                  
//                   {/* Social Sharing Dropdown */}
//                   {showShareDropdown && (
//                     <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[200px]">
//                       <button
//                         onClick={shareToFacebook}
//                         className="w-full px-4 py-3 text-left hover:bg-blue-50 flex items-center gap-3 border-b border-gray-100 transition-colors"
//                       >
//                         <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center">
//                           <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
//                             <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
//                           </svg>
//                         </div>
//                         <span className="text-gray-700">Share to Facebook</span>
//                       </button>
                      
//                       <button
//                         onClick={shareToWhatsApp}
//                         className="w-full px-4 py-3 text-left hover:bg-green-50 flex items-center gap-3 transition-colors"
//                       >
//                         <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center">
//                           <MessageCircle className="w-3 h-3 text-white" />
//                         </div>
//                         <span className="text-gray-700">Share to WhatsApp</span>
//                       </button>
//                     </div>
//                   )}
//                 </div>
                
//                 {/* Contact Us Button */}
//                 <a
//                   href="/contact"
//                   className="border border-green-600 text-green-600 px-8 py-3 rounded-lg hover:bg-green-600 hover:text-white transition-all duration-300"
//                 >
//                   Contact Us
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Click outside to close dropdown */}
//       {showShareDropdown && (
//         <div 
//           className="fixed inset-0 z-5" 
//           onClick={() => setShowShareDropdown(false)}
//         ></div>
//       )}
//     </main>
//   );
// }


"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  Play,
  ExternalLink,
  Users,
  Star,
  Clock,
  Share2,
  MessageCircle,
  Loader2,
  ChevronDown,
  AlertCircle,
} from "lucide-react";

const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
const CHANNEL_ID = "UCZFGT7aMFQd4sXDxCqRPTBw"; // Your channel ID
const VIDEOS_PER_PAGE = 12; // YouTube API max per request is 50

interface VideoSnippet {
  title: string;
  description: string;
  thumbnails: {
    medium: { url: string; width: number; height: number };
    high: { url: string; width: number; height: number };
    maxres?: { url: string; width: number; height: number };
  };
  publishedAt: string;
  resourceId: {
    videoId: string;
  };
}

interface PlaylistItem {
  snippet: VideoSnippet;
}

interface VideoItem {
  videoId: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
}

export default function TestimonyVideosPage() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [showShareDropdown, setShowShareDropdown] = useState(false);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [uploadsPlaylistId, setUploadsPlaylistId] = useState<string | null>(
    null
  );

  // Step 1: Get the channel's "uploads" playlist ID
  const fetchUploadsPlaylistId = useCallback(async (): Promise<string> => {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?key=${YOUTUBE_API_KEY}&id=${CHANNEL_ID}&part=contentDetails`
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch channel info: ${res.status}`);
    }

    const data = await res.json();

    if (!data.items || data.items.length === 0) {
      throw new Error("Channel not found. Check the CHANNEL_ID.");
    }

    const playlistId =
      data.items[0].contentDetails.relatedPlaylists.uploads;
    return playlistId;
  }, []);

  // Step 2: Fetch videos from the uploads playlist
  const fetchPlaylistVideos = useCallback(
    async (playlistId: string, pageToken?: string) => {
      let url = `https://www.googleapis.com/youtube/v3/playlistItems?key=${YOUTUBE_API_KEY}&playlistId=${playlistId}&part=snippet&maxResults=${VIDEOS_PER_PAGE}&order=date`;

      if (pageToken) {
        url += `&pageToken=${pageToken}`;
      }

      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`Failed to fetch videos: ${res.status}`);
      }

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      const items: VideoItem[] = (data.items || [])
        .filter(
          (item: PlaylistItem) =>
            // Filter out deleted / private videos that have no valid ID
            item.snippet.resourceId.videoId &&
            item.snippet.title !== "Deleted video" &&
            item.snippet.title !== "Private video"
        )
        .map((item: PlaylistItem) => ({
          videoId: item.snippet.resourceId.videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnail:
            item.snippet.thumbnails.high?.url ||
            item.snippet.thumbnails.medium?.url ||
            `https://img.youtube.com/vi/${item.snippet.resourceId.videoId}/hqdefault.jpg`,
          publishedAt: item.snippet.publishedAt,
        }));

      return {
        items,
        nextPageToken: data.nextPageToken || null,
        totalResults: data.pageInfo?.totalResults || 0,
      };
    },
    []
  );

  // Initial load
  useEffect(() => {
    async function init() {
      setLoading(true);
      setError(null);

      try {
        if (!YOUTUBE_API_KEY) {
          throw new Error(
            "YouTube API key is missing. Add NEXT_PUBLIC_YOUTUBE_API_KEY to your .env.local file."
          );
        }

        const playlistId = await fetchUploadsPlaylistId();
        setUploadsPlaylistId(playlistId);

        const result = await fetchPlaylistVideos(playlistId);
        setVideos(result.items);
        setNextPageToken(result.nextPageToken);
        setTotalResults(result.totalResults);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load videos"
        );
      } finally {
        setLoading(false);
      }
    }

    init();
  }, [fetchUploadsPlaylistId, fetchPlaylistVideos]);

  // Load more
  const handleLoadMore = async () => {
    if (!uploadsPlaylistId || !nextPageToken || loadingMore) return;

    setLoadingMore(true);

    try {
      const result = await fetchPlaylistVideos(
        uploadsPlaylistId,
        nextPageToken
      );
      setVideos((prev) => [...prev, ...result.items]);
      setNextPageToken(result.nextPageToken);
      setTotalResults(result.totalResults);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load more videos"
      );
    } finally {
      setLoadingMore(false);
    }
  };

  // Load ALL remaining videos at once
  const handleLoadAll = async () => {
    if (!uploadsPlaylistId || !nextPageToken || loadingMore) return;

    setLoadingMore(true);

    try {
      let currentToken: string | null = nextPageToken;
      let allNewVideos: VideoItem[] = [];

      while (currentToken) {
        const result = await fetchPlaylistVideos(
          uploadsPlaylistId,
          currentToken
        );
        allNewVideos = [...allNewVideos, ...result.items];
        currentToken = result.nextPageToken;
        setTotalResults(result.totalResults);
      }

      setVideos((prev) => [...prev, ...allNewVideos]);
      setNextPageToken(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load all videos"
      );
    } finally {
      setLoadingMore(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const truncateDescription = (
    description: string,
    maxLength: number = 120
  ) => {
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + "...";
  };

  // Social sharing
  const shareToFacebook = () => {
    const url =
      typeof window !== "undefined" ? window.location.href : "";
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      "_blank",
      "width=600,height=400"
    );
    setShowShareDropdown(false);
  };

  const shareToWhatsApp = () => {
    const url =
      typeof window !== "undefined" ? window.location.href : "";
    const text =
      "Check out these amazing DONDOOIL customer testimonies and success stories!";
    window.open(
      `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`,
      "_blank"
    );
    setShowShareDropdown(false);
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedVideo(null);
        setShowShareDropdown(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Top spacing */}
      <div className="h-32 bg-green-50" />
      <div className="relative w-full h-20 overflow-hidden">
        <svg
          className="absolute bottom-0 w-full h-20"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
            fill="#4ade80"
            fillOpacity="0.2"
          />
        </svg>
      </div>

      <div className="py-12 px-4 sm:px-6 lg:px-8 -mt-20">
        <div className="max-w-7xl mx-auto">
          {/* ─── Hero ─── */}
          <div className="text-center mb-20 pt-16">
            <div className="inline-block p-2 bg-green-100 rounded-full mb-4">
              <Users className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-5xl font-bold text-green-800 mb-6">
              Customer Testimonies
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real stories from real customers who have experienced the
              life-changing benefits of DONDOOIL natural health supplements
            </p>
          </div>

          {/* ─── Video Modal ─── */}
          {selectedVideo && (
            <div
              className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedVideo(null)}
            >
              <div
                className="bg-white rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4 border-b flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-green-700">
                    Watch Video
                  </h3>
                  <button
                    onClick={() => setSelectedVideo(null)}
                    className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
                  >
                    ×
                  </button>
                </div>
                <div className="aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&rel=0`}
                    className="w-full h-full"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ─── Videos Grid ─── */}
          <div className="mb-20">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-8 md:p-12">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                <h2 className="text-3xl font-semibold text-green-700 flex items-center">
                  <Play className="w-8 h-8 mr-3 text-green-600" />
                  Success Stories
                </h2>
                <div className="flex items-center gap-4">
                  <div className="flex items-center text-green-600">
                    <Star className="w-5 h-5 mr-2" />
                    <span className="text-sm font-medium">
                      Real Customer Experiences
                    </span>
                  </div>
                  {!loading && videos.length > 0 && (
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {videos.length}
                      {totalResults > videos.length
                        ? ` of ${totalResults}`
                        : ""}{" "}
                      videos
                    </span>
                  )}
                </div>
              </div>

              {/* Loading State */}
              {loading ? (
                <div className="text-center py-16">
                  <Loader2 className="w-10 h-10 text-green-600 animate-spin mx-auto mb-4" />
                  <div className="text-gray-500 text-lg">
                    Loading testimonies...
                  </div>
                </div>
              ) : error ? (
                /* Error State */
                <div className="text-center py-12">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-lg mx-auto">
                    <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-3" />
                    <div className="text-red-600 font-medium mb-2">
                      Unable to load videos
                    </div>
                    <p className="text-red-500 text-sm mb-4">{error}</p>
                    <button
                      onClick={() => window.location.reload()}
                      className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              ) : videos.length === 0 ? (
                /* Empty State */
                <div className="text-center py-16 text-gray-500">
                  <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg">
                    No testimonies available at the moment
                  </p>
                  <p className="text-sm mt-2">
                    Check back soon for new content!
                  </p>
                </div>
              ) : (
                <>
                  {/* Video Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {videos.map((video, index) => (
                      <div
                        key={`${video.videoId}-${index}`}
                        className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                      >
                        {/* Thumbnail */}
                        <div
                          className="relative group cursor-pointer"
                          onClick={() => setSelectedVideo(video.videoId)}
                        >
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-48 object-cover"
                            loading="lazy"
                            onError={(e) => {
                              // Fallback thumbnail if the primary one fails
                              const target =
                                e.target as HTMLImageElement;
                              target.src = `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`;
                            }}
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                            <div className="transform scale-0 group-hover:scale-100 transition-transform duration-300 bg-green-600/90 rounded-full p-4">
                              <Play className="w-10 h-10 text-white ml-1" />
                            </div>
                          </div>
                        </div>

                        {/* Info */}
                        <div className="p-6">
                          <h3 className="text-lg font-semibold text-green-700 mb-3 line-clamp-2 min-h-[3.5rem]">
                            {video.title}
                          </h3>

                          {video.description && (
                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                              {truncateDescription(video.description)}
                            </p>
                          )}

                          <div className="flex items-center text-xs text-gray-500 mb-4">
                            <Clock className="w-4 h-4 mr-1" />
                            {formatDate(video.publishedAt)}
                          </div>

                          <div className="flex gap-2">
                            <button
                              onClick={() =>
                                setSelectedVideo(video.videoId)
                              }
                              className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center text-sm font-medium"
                            >
                              <Play className="w-4 h-4 mr-2" />
                              Watch Here
                            </button>
                            <a
                              href={`https://www.youtube.com/watch?v=${video.videoId}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-gray-100 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center"
                              title="Watch on YouTube"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* ─── Load More / Load All ─── */}
                  {nextPageToken && (
                    <div className="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
                      <button
                        onClick={handleLoadMore}
                        disabled={loadingMore}
                        className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                      >
                        {loadingMore ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Loading...
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-5 h-5" />
                            Load More Videos
                          </>
                        )}
                      </button>

                      <button
                        onClick={handleLoadAll}
                        disabled={loadingMore}
                        className="border border-green-600 text-green-600 px-8 py-3 rounded-lg hover:bg-green-600 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loadingMore ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Loading All...
                          </>
                        ) : (
                          "Load All Videos"
                        )}
                      </button>

                      <span className="text-sm text-gray-500">
                        Showing {videos.length} of {totalResults} videos
                      </span>
                    </div>
                  )}

                  {/* All loaded message */}
                  {!nextPageToken && videos.length > 0 && !loading && (
                    <div className="mt-8 text-center text-sm text-gray-500">
                      ✅ All {videos.length} videos loaded
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* ─── CTA / Share Section ─── */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 md:p-12 text-center">
              <h2 className="text-3xl font-semibold text-green-700 mb-6">
                Share Your Story
              </h2>
              <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                Have you experienced positive results with DONDOOIL?
                We&apos;d love to hear your success story! Share your
                testimony and inspire others on their wellness journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="relative">
                  <button
                    onClick={() =>
                      setShowShareDropdown(!showShareDropdown)
                    }
                    className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <Share2 className="w-5 h-5" />
                    Share Your Story
                  </button>

                  {showShareDropdown && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[200px]">
                      <button
                        onClick={shareToFacebook}
                        className="w-full px-4 py-3 text-left hover:bg-blue-50 flex items-center gap-3 border-b border-gray-100 transition-colors"
                      >
                        <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center">
                          <svg
                            className="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                          </svg>
                        </div>
                        <span className="text-gray-700">
                          Share to Facebook
                        </span>
                      </button>

                      <button
                        onClick={shareToWhatsApp}
                        className="w-full px-4 py-3 text-left hover:bg-green-50 flex items-center gap-3 transition-colors"
                      >
                        <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center">
                          <MessageCircle className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-gray-700">
                          Share to WhatsApp
                        </span>
                      </button>
                    </div>
                  )}
                </div>

                <a
                  href="/contact"
                  className="border border-green-600 text-green-600 px-8 py-3 rounded-lg hover:bg-green-600 hover:text-white transition-all duration-300"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Close share dropdown when clicking outside */}
      {showShareDropdown && (
        <div
          className="fixed inset-0 z-[5]"
          onClick={() => setShowShareDropdown(false)}
        />
      )}
    </main>
  );
}