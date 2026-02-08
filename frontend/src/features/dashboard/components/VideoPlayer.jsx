import React from "react";

export const VideoPlayer = ({ videoUrl, title }) => {
  // Extract video ID from URL
  const getEmbedUrl = (url) => {
    if (!url) return "";
    let videoId = "";

    // Handle standard YouTube URLs
    if (url.includes("youtube.com/watch?v=")) {
      videoId = url.split("v=")[1].split("&")[0];
    }
    // Handle compressed YouTube URLs
    else if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1].split("?")[0];
    }
    // Handle already embedded URLs
    else if (url.includes("youtube.com/embed/")) {
      return url;
    }

    return `https://www.youtube.com/embed/${videoId}`;
  };

  const embedUrl = getEmbedUrl(videoUrl);

  if (!embedUrl) return null;

  return (
    <div className="relative pt-[56.25%] w-full bg-black rounded-lg overflow-hidden shadow-sm dark:shadow-lg dark:shadow-black/50 mt-4 border border-border">
      <iframe
        src={embedUrl}
        title={title}
        className="absolute top-0 left-0 w-full h-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};
