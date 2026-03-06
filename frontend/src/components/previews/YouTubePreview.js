import React from 'react';
import { PLACEHOLDER_IMAGE } from '@/lib/constants';
import { FaThumbsUp, FaThumbsDown, FaShare, FaEllipsisVertical } from 'react-icons/fa6';

export const YouTubePreview = ({ adData }) => {
  const { brandName, caption, headline, description, ctaText, ctaLink, mediaUrl, mediaType, profileImage } = adData;
  const displayMedia = mediaUrl || PLACEHOLDER_IMAGE;
  const initial = brandName?.[0]?.toUpperCase() || 'B';

  return (
    <div data-testid="youtube-preview" className="bg-white font-sans text-[14px]">
      {/* Video Thumbnail */}
      <div className="w-full aspect-video bg-zinc-900 relative overflow-hidden">
        {mediaType === 'video' ? (
          <video src={displayMedia} className="w-full h-full object-cover" muted />
        ) : (
          <img src={displayMedia} alt="Ad" className="w-full h-full object-cover" crossOrigin="anonymous" />
        )}
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-black/60 rounded-full flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-7 h-7 text-white ml-1" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
        {/* Duration */}
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[11px] font-medium px-1.5 py-0.5 rounded">
          0:30
        </div>
        {/* Ad badge */}
        <div className="absolute bottom-2 left-2 bg-[#FBBF24] text-black text-[10px] font-bold px-1.5 py-0.5 rounded">
          Ad
        </div>
      </div>

      {/* Video Info */}
      <div className="px-3 py-3 flex gap-3">
        {profileImage ? (
          <img src={profileImage} alt="" className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
        ) : (
          <div className="w-9 h-9 rounded-full bg-[#FF0000] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">{initial}</div>
        )}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-[14px] text-zinc-900 leading-tight line-clamp-2">{headline || 'Ad Headline'}</p>
          <p className="text-[12px] text-zinc-500 mt-0.5">{brandName || 'Brand Name'} <span className="mx-0.5">·</span> Sponsored</p>
          <p className="text-[12px] text-zinc-500">{ctaLink || 'yourbrand.com'}</p>
        </div>
        <FaEllipsisVertical className="w-4 h-4 text-zinc-500 flex-shrink-0 mt-1" />
      </div>

      {/* Caption */}
      <div className="px-3 pb-2">
        <p className="text-[13px] text-zinc-700 line-clamp-2">{caption || description || 'Your ad description here...'}</p>
      </div>

      {/* CTA */}
      <div className="px-3 pb-3">
        <button className="bg-[#065FD4] text-white text-[13px] font-semibold px-5 py-2 rounded-full">
          {ctaText || 'Shop Now'}
        </button>
      </div>

      {/* Engagement */}
      <div className="px-3 pb-3 flex items-center gap-4 text-zinc-600">
        <span className="flex items-center gap-1.5 text-[12px]"><FaThumbsUp className="w-4 h-4" /> 1.2K</span>
        <span className="flex items-center gap-1.5 text-[12px]"><FaThumbsDown className="w-4 h-4" /></span>
        <span className="flex items-center gap-1.5 text-[12px]"><FaShare className="w-4 h-4" /> Share</span>
      </div>
    </div>
  );
};
