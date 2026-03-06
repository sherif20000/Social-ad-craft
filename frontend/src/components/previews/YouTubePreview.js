import React from 'react';
import { PLACEHOLDER_IMAGE, OBJECTIVES } from '@/lib/constants';
import { FaThumbsUp, FaThumbsDown, FaShare, FaEllipsisVertical } from 'react-icons/fa6';

export const YouTubePreview = ({ adData }) => {
  const { brandName, caption, headline, description, ctaText, ctaLink, mediaUrl, profileImage, objective, adFormat } = adData;
  const displayMedia = mediaUrl || PLACEHOLDER_IMAGE;
  const initial = brandName?.[0]?.toUpperCase() || 'B';
  const showCta = OBJECTIVES.find(o => o.id === objective)?.hasCta !== false;
  const isShorts = adFormat === 'shorts';
  const isBumper = adFormat === 'bumper';
  const isInStream = adFormat === 'in_stream';

  // Shorts format (vertical)
  if (isShorts) {
    return (
      <div data-testid="youtube-preview" className="bg-black text-white font-sans relative" style={{ aspectRatio: '9/16', minHeight: '560px' }}>
        <div className="absolute inset-0">
          <img src={displayMedia} alt="Ad" className="w-full h-full object-cover" crossOrigin="anonymous" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-[#FF0000] text-white text-[10px] font-bold px-2 py-0.5 rounded">Ad</span>
        </div>
        <div className="absolute right-3 bottom-28 z-10 flex flex-col items-center gap-5">
          <FaThumbsUp className="w-7 h-7" /><span className="text-[10px]">1.2K</span>
          <FaThumbsDown className="w-7 h-7" />
          <FaShare className="w-6 h-6" /><span className="text-[10px]">Share</span>
        </div>
        <div className="absolute bottom-4 left-3 right-14 z-10">
          <p className="font-bold text-[14px] drop-shadow-lg">{headline || brandName}</p>
          <p className="text-[12px] drop-shadow-lg line-clamp-2 mt-1">{caption}</p>
          {showCta && (
            <button className="mt-2 bg-white text-zinc-900 text-[12px] font-bold px-4 py-2 rounded-full">{ctaText || 'Visit'}</button>
          )}
        </div>
      </div>
    );
  }

  // In-Stream / Bumper (video player style)
  if (isInStream || isBumper) {
    return (
      <div data-testid="youtube-preview" className="bg-black font-sans text-[14px]">
        <div className="w-full aspect-video bg-zinc-900 relative overflow-hidden">
          <img src={displayMedia} alt="Ad" className="w-full h-full object-cover" crossOrigin="anonymous" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-black/60 rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-7 h-7 text-white ml-1" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </div>
          </div>
          {/* Skip button */}
          {!isBumper && (
            <div className="absolute bottom-12 right-0 bg-zinc-900/90 text-white text-[12px] px-3 py-2 rounded-l border-l-2 border-yellow-400">
              Skip Ad <span className="text-[10px] text-zinc-400 ml-1">5</span>
            </div>
          )}
          {isBumper && (
            <div className="absolute bottom-12 right-0 bg-zinc-900/90 text-white text-[10px] px-3 py-1.5 rounded-l">
              Ad · 0:06
            </div>
          )}
          {/* Ad badge */}
          <div className="absolute bottom-2 left-2 bg-[#FBBF24] text-black text-[10px] font-bold px-1.5 py-0.5 rounded">Ad</div>
          {/* CTA Overlay */}
          {showCta && (
            <div className="absolute bottom-2 right-2">
              <button className="bg-white text-zinc-900 text-[11px] font-bold px-3 py-1.5 rounded">{ctaText || 'Visit Site'}</button>
            </div>
          )}
          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-zinc-700">
            <div className="h-full bg-[#FBBF24] w-1/3" />
          </div>
        </div>
        {/* Video info */}
        <div className="bg-white px-3 py-3 flex gap-3">
          {profileImage ? (
            <img src={profileImage} alt="" className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
          ) : (
            <div className="w-9 h-9 rounded-full bg-[#FF0000] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">{initial}</div>
          )}
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-[14px] text-zinc-900 leading-tight">{headline || 'Ad Headline'}</p>
            <p className="text-[12px] text-zinc-500 mt-0.5">{brandName} · Sponsored</p>
          </div>
        </div>
      </div>
    );
  }

  // In-Feed (default)
  return (
    <div data-testid="youtube-preview" className="bg-white font-sans text-[14px]">
      <div className="w-full aspect-video bg-zinc-900 relative overflow-hidden">
        <img src={displayMedia} alt="Ad" className="w-full h-full object-cover" crossOrigin="anonymous" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-black/60 rounded-full flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-7 h-7 text-white ml-1" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
          </div>
        </div>
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[11px] font-medium px-1.5 py-0.5 rounded">0:30</div>
        <div className="absolute bottom-2 left-2 bg-[#FBBF24] text-black text-[10px] font-bold px-1.5 py-0.5 rounded">Ad</div>
      </div>
      <div className="px-3 py-3 flex gap-3">
        {profileImage ? (
          <img src={profileImage} alt="" className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
        ) : (
          <div className="w-9 h-9 rounded-full bg-[#FF0000] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">{initial}</div>
        )}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-[14px] text-zinc-900 leading-tight line-clamp-2">{headline || 'Ad Headline'}</p>
          <p className="text-[12px] text-zinc-500 mt-0.5">{brandName} · Sponsored</p>
          <p className="text-[12px] text-zinc-500">{ctaLink}</p>
        </div>
        <FaEllipsisVertical className="w-4 h-4 text-zinc-500 flex-shrink-0 mt-1" />
      </div>
      {caption && <div className="px-3 pb-2"><p className="text-[13px] text-zinc-700 line-clamp-2">{caption}</p></div>}
      {showCta && (
        <div className="px-3 pb-3">
          <button className="bg-[#065FD4] text-white text-[13px] font-semibold px-5 py-2 rounded-full">{ctaText || 'Shop Now'}</button>
        </div>
      )}
      <div className="px-3 pb-3 flex items-center gap-4 text-zinc-600">
        <span className="flex items-center gap-1.5 text-[12px]"><FaThumbsUp className="w-4 h-4" /> 1.2K</span>
        <span className="flex items-center gap-1.5 text-[12px]"><FaThumbsDown className="w-4 h-4" /></span>
        <span className="flex items-center gap-1.5 text-[12px]"><FaShare className="w-4 h-4" /> Share</span>
      </div>
    </div>
  );
};
