import React from "react";

export const VideoPlayer = ({ videoUrl, title }) => {
  // Extract video ID from URL
  const getEmbedUrl = (url) => {
    if (!url) return "";
    let videoId = "";

    if (url.includes("youtube.com/watch?v=")) {
      videoId = url.split("v=")[1].split("&")[0];
    } else if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1].split("?")[0];
    } else if (url.includes("youtube.com/embed/")) {
   
      const baseUrl = url.split("?")[0];
      return `${baseUrl}?modestbranding=1&rel=0&showinfo=0`;
    }

    return `https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0`;
  };

  const embedUrl = getEmbedUrl(videoUrl);

  if (!embedUrl) return null;

  return (
    <div className="group relative w-full aspect-video shrink-0 bg-black rounded-xl overflow-hidden shadow-sm dark:shadow-2xl dark:shadow-black/50 mt-4 border border-border">
    
      <iframe
        src={embedUrl}
        title={title}
        className="absolute inset-0 w-full h-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />

      <div className="absolute -inset-1 bg-primary/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </div>
  );
};
