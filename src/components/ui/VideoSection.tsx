import React, { useState } from 'react';
import { Video } from '../../types';
import { X } from 'lucide-react';

interface VideoSectionProps {
  videos: Video[];
}

const VideoSection: React.FC<VideoSectionProps> = ({ videos }) => {
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);
  
  // Filter to only YouTube trailers
  const trailers = videos.filter(
    video => video.site === 'YouTube' && 
    (video.type === 'Trailer' || video.type === 'Teaser')
  ).slice(0, 4);
  
  if (!trailers.length) return null;
  
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Trailers & Videos</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {trailers.map(video => (
          <div 
            key={video.id} 
            className="relative cursor-pointer group rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700"
            onClick={() => setActiveVideo(video)}
          >
            <div className="aspect-video">
              <img 
                src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`} 
                alt={video.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="p-2">
              <h3 className="text-sm text-gray-900 dark:text-white line-clamp-1">{video.name}</h3>
            </div>
          </div>
        ))}
      </div>
      
      {/* Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl">
            <button 
              onClick={() => setActiveVideo(null)}
              className="absolute -top-10 right-0 p-2 text-white hover:text-red-400"
              aria-label="Close video"
            >
              <X size={24} />
            </button>
            
            <div className="relative pb-[56.25%] h-0">
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                src={`https://www.youtube.com/embed/${activeVideo.key}?autoplay=1`}
                title={activeVideo.name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoSection;