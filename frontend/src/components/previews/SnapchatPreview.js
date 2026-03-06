import React from 'react';
import { PLACEHOLDER_IMAGE } from '@/lib/constants';
import { FaChevronUp } from 'react-icons/fa6';

export const SnapchatPreview = ({ adData }) => {
  const { brandName, caption, ctaText, mediaUrl, mediaType, profileImage } = adData;
  const displayMedia = mediaUrl || PLACEHOLDER_IMAGE;
  const initial = brandName?.[0]?.toUpperCase() || 'B';

  return (
    <div data-testid="snapchat-preview" className="bg-black text-white font-sans text-[14px] relative" style={{ aspectRatio: '9/16', minHeight: '560px' }}>
      {/* Background Media */}
      <div className="absolute inset-0">
        {mediaType === 'video' ? (
          <video src={displayMedia} className="w-full h-full object-cover" muted />
        ) : (
          <img src={displayMedia} alt="Ad" className="w-full h-full object-cover" crossOrigin="anonymous" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
      </div>

      {/* Top Bar */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {profileImage ? (
            <img src={profileImage} alt="" className="w-8 h-8 rounded-full object-cover border border-white/50" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-[#FFFC00] flex items-center justify-center text-black font-bold text-xs">{initial}</div>
          )}
          <div>
            <p className="text-[12px] font-bold drop-shadow-lg">{brandName || 'Brand Name'}</p>
            <p className="text-[10px] text-white/70">Sponsored</p>
          </div>
        </div>
        <button className="text-white/80 text-[10px] font-medium px-2 py-0.5 border border-white/30 rounded-full">
          Ad
        </button>
      </div>

      {/* Bottom Content */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-4 text-center">
        {/* Caption */}
        <p className="text-[14px] font-medium drop-shadow-lg mb-4 leading-snug max-w-[85%] mx-auto">
          {caption || 'Your ad caption here...'}
        </p>

        {/* Swipe Up CTA */}
        <div className="flex flex-col items-center gap-1.5">
          <FaChevronUp className="w-5 h-5 text-white animate-bounce" />
          <div className="bg-white rounded-full px-6 py-2.5">
            <span className="text-black text-[13px] font-bold">{ctaText || 'Shop Now'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
