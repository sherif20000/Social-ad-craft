import React from 'react';
import { PLACEHOLDER_IMAGE } from '@/lib/constants';
import { FaHeart, FaCommentDots, FaShare, FaBookmark, FaMusic } from 'react-icons/fa6';

export const TikTokPreview = ({ adData }) => {
  const { brandName, brandHandle, caption, ctaText, mediaUrl, mediaType, profileImage } = adData;
  const displayMedia = mediaUrl || PLACEHOLDER_IMAGE;
  const initial = brandName?.[0]?.toUpperCase() || 'B';
  const handle = brandHandle?.replace('@', '') || 'yourbrand';

  return (
    <div data-testid="tiktok-preview" className="bg-black text-white font-sans text-[14px] relative" style={{ aspectRatio: '9/16', minHeight: '560px' }}>
      {/* Background Media */}
      <div className="absolute inset-0">
        {mediaType === 'video' ? (
          <video src={displayMedia} className="w-full h-full object-cover" muted />
        ) : (
          <img src={displayMedia} alt="Ad" className="w-full h-full object-cover" crossOrigin="anonymous" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      </div>

      {/* Sponsored tag */}
      <div className="absolute top-4 left-3 z-10">
        <span className="bg-white/20 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-0.5 rounded">Sponsored</span>
      </div>

      {/* Right Side Icons */}
      <div className="absolute right-3 bottom-32 z-10 flex flex-col items-center gap-5">
        <div className="flex flex-col items-center gap-1">
          {profileImage ? (
            <img src={profileImage} alt="" className="w-10 h-10 rounded-full object-cover border-2 border-white" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center text-white font-bold text-sm border-2 border-white">{initial}</div>
          )}
          <div className="w-5 h-5 rounded-full bg-[#FE2C55] flex items-center justify-center -mt-3">
            <span className="text-white text-[10px] font-bold">+</span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <FaHeart className="w-7 h-7 text-white drop-shadow-lg" />
          <span className="text-[11px] font-medium">24.5K</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <FaCommentDots className="w-7 h-7 text-white drop-shadow-lg" />
          <span className="text-[11px] font-medium">1,234</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <FaBookmark className="w-6 h-6 text-white drop-shadow-lg" />
          <span className="text-[11px] font-medium">856</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <FaShare className="w-6 h-6 text-white drop-shadow-lg" />
          <span className="text-[11px] font-medium">Share</span>
        </div>
        <div className="w-8 h-8 rounded-full bg-zinc-800 border-2 border-zinc-600 animate-spin" style={{ animationDuration: '3s' }}>
          <div className="w-full h-full rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center">
            <FaMusic className="w-3 h-3 text-white" />
          </div>
        </div>
      </div>

      {/* Bottom Content */}
      <div className="absolute bottom-16 left-3 right-16 z-10">
        <p className="font-bold text-[15px] mb-1 drop-shadow-lg">@{handle}</p>
        <p className="text-[13px] leading-snug drop-shadow-lg line-clamp-2">{caption || 'Your ad caption here...'}</p>
        <div className="flex items-center gap-2 mt-2">
          <FaMusic className="w-3 h-3" />
          <p className="text-[11px] truncate">Original Sound - {brandName || 'Brand'}</p>
        </div>
      </div>

      {/* CTA Button */}
      <div className="absolute bottom-3 left-3 right-3 z-10">
        <button className="w-full bg-[#FE2C55] text-white text-[13px] font-semibold py-2.5 rounded-sm">
          {ctaText || 'Shop Now'}
        </button>
      </div>
    </div>
  );
};
