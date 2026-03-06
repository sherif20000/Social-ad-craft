import React from 'react';
import { PLACEHOLDER_IMAGE, OBJECTIVES } from '@/lib/constants';
import { FaChevronUp } from 'react-icons/fa6';

export const SnapchatPreview = ({ adData }) => {
  const { brandName, caption, ctaText, mediaUrl, mediaType, profileImage, objective, adFormat, carouselCards } = adData;
  const displayMedia = mediaUrl || PLACEHOLDER_IMAGE;
  const initial = brandName?.[0]?.toUpperCase() || 'B';
  const showCta = OBJECTIVES.find(o => o.id === objective)?.hasCta !== false;

  // Collection Ad
  if (adFormat === 'collection') {
    const cards = carouselCards?.slice(0, 4) || [];
    return (
      <div data-testid="snapchat-preview" className="bg-black text-white font-sans text-[14px] relative" style={{ aspectRatio: '9/16', minHeight: '560px' }}>
        <div className="absolute inset-0">
          {mediaType === 'video' && mediaUrl ? (
            <video src={mediaUrl} className="w-full h-full object-cover" autoPlay muted loop playsInline />
          ) : (
            <img src={displayMedia} alt="Ad" className="w-full h-full object-cover" crossOrigin="anonymous" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />
        </div>
        <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {profileImage ? (
              <img src={profileImage} alt="" className="w-8 h-8 rounded-full object-cover border border-white/50" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-[#FFFC00] flex items-center justify-center text-black font-bold text-xs">{initial}</div>
            )}
            <div>
              <p className="text-[12px] font-bold drop-shadow-lg">{brandName}</p>
              <p className="text-[10px] text-white/70">Sponsored</p>
            </div>
          </div>
        </div>
        {/* Collection grid at bottom */}
        <div className="absolute bottom-16 left-3 right-3 z-10">
          <p className="text-[13px] font-medium drop-shadow-lg mb-3">{caption}</p>
          <div className="grid grid-cols-2 gap-1.5">
            {[0, 1, 2, 3].map(i => (
              <div key={i} className="rounded-lg overflow-hidden bg-white/10 backdrop-blur-sm aspect-square">
                <img
                  src={cards[i]?.imageUrl || `${PLACEHOLDER_IMAGE}&w=${200 + i * 50}`}
                  alt="" className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                />
              </div>
            ))}
          </div>
        </div>
        {showCta && (
          <div className="absolute bottom-3 left-3 right-3 z-10">
            <button className="w-full bg-white rounded-full px-6 py-2.5 text-center">
              <span className="text-black text-[13px] font-bold">{ctaText || 'Shop Now'}</span>
            </button>
          </div>
        )}
      </div>
    );
  }

  // Story Ad
  if (adFormat === 'story') {
    return (
      <div data-testid="snapchat-preview" className="bg-black text-white font-sans text-[14px] relative" style={{ aspectRatio: '9/16', minHeight: '560px' }}>
        <div className="absolute inset-0">
          {mediaType === 'video' && mediaUrl ? (
            <video src={mediaUrl} className="w-full h-full object-cover" autoPlay muted loop playsInline />
          ) : (
            <img src={displayMedia} alt="Ad" className="w-full h-full object-cover" crossOrigin="anonymous" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
        </div>
        {/* Story tiles at top */}
        <div className="absolute top-2 left-2 right-2 z-10">
          <div className="flex gap-0.5 mb-2">
            <div className="flex-1 h-0.5 bg-white rounded-full" />
            <div className="flex-1 h-0.5 bg-white/30 rounded-full" />
            <div className="flex-1 h-0.5 bg-white/30 rounded-full" />
          </div>
          <div className="flex items-center gap-2">
            {profileImage ? (
              <img src={profileImage} alt="" className="w-7 h-7 rounded-full object-cover" />
            ) : (
              <div className="w-7 h-7 rounded-full bg-[#FFFC00] flex items-center justify-center text-black font-bold text-[10px]">{initial}</div>
            )}
            <span className="text-[12px] font-bold">{brandName}</span>
            <span className="text-[10px] text-white/60 ml-auto">Sponsored</span>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-10 p-4 text-center">
          <p className="text-[14px] font-medium drop-shadow-lg mb-4">{caption}</p>
          {showCta && (
            <div className="flex flex-col items-center gap-1.5">
              <FaChevronUp className="w-5 h-5 text-white animate-bounce" />
              <div className="bg-white rounded-full px-6 py-2.5">
                <span className="text-black text-[13px] font-bold">{ctaText || 'Shop Now'}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Single Image/Video (default)
  return (
    <div data-testid="snapchat-preview" className="bg-black text-white font-sans text-[14px] relative" style={{ aspectRatio: '9/16', minHeight: '560px' }}>
      <div className="absolute inset-0">
        <img src={displayMedia} alt="Ad" className="w-full h-full object-cover" crossOrigin="anonymous" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
      </div>
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {profileImage ? (
            <img src={profileImage} alt="" className="w-8 h-8 rounded-full object-cover border border-white/50" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-[#FFFC00] flex items-center justify-center text-black font-bold text-xs">{initial}</div>
          )}
          <div>
            <p className="text-[12px] font-bold drop-shadow-lg">{brandName}</p>
            <p className="text-[10px] text-white/70">Sponsored</p>
          </div>
        </div>
        <button className="text-white/80 text-[10px] font-medium px-2 py-0.5 border border-white/30 rounded-full">Ad</button>
      </div>
      <div className="absolute bottom-0 left-0 right-0 z-10 p-4 text-center">
        <p className="text-[14px] font-medium drop-shadow-lg mb-4 leading-snug max-w-[85%] mx-auto">{caption}</p>
        {showCta && (
          <div className="flex flex-col items-center gap-1.5">
            <FaChevronUp className="w-5 h-5 text-white animate-bounce" />
            <div className="bg-white rounded-full px-6 py-2.5">
              <span className="text-black text-[13px] font-bold">{ctaText || 'Shop Now'}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
