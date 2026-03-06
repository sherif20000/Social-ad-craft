import React, { useState } from 'react';
import { PLACEHOLDER_IMAGE, CAROUSEL_PLACEHOLDERS, OBJECTIVES } from '@/lib/constants';
import { FaThumbsUp, FaComment, FaShare, FaEllipsis, FaGlobe } from 'react-icons/fa6';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const FacebookPreview = ({ adData }) => {
  const { brandName, caption, headline, description, ctaText, ctaLink, mediaUrl, mediaType, profileImage, objective, adFormat, carouselCards } = adData;
  const displayMedia = mediaUrl || PLACEHOLDER_IMAGE;
  const initial = brandName?.[0]?.toUpperCase() || 'B';
  const showCta = OBJECTIVES.find(o => o.id === objective)?.hasCta !== false;
  const [carouselIndex, setCarouselIndex] = useState(0);

  const ProfileHeader = () => (
    <div className="px-4 pt-3 pb-2 flex items-center gap-2.5">
      {profileImage ? (
        <img src={profileImage} alt="" className="w-10 h-10 rounded-full object-cover" />
      ) : (
        <div className="w-10 h-10 rounded-full bg-[#1877F2] flex items-center justify-center text-white font-bold text-sm">{initial}</div>
      )}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-[13px] text-zinc-900 leading-tight">{brandName || 'Brand Name'}</p>
        <p className="text-[11px] text-zinc-500 flex items-center gap-1">
          Sponsored <span className="mx-0.5">·</span> <FaGlobe className="w-2.5 h-2.5" />
        </p>
      </div>
      <FaEllipsis className="w-4 h-4 text-zinc-400" />
    </div>
  );

  const EngagementBar = () => (
    <div className="px-4 py-2.5 flex items-center justify-around text-zinc-500 border-t border-zinc-100">
      <span className="flex items-center gap-1.5 text-[13px] font-medium"><FaThumbsUp className="w-4 h-4" /> Like</span>
      <span className="flex items-center gap-1.5 text-[13px] font-medium"><FaComment className="w-4 h-4" /> Comment</span>
      <span className="flex items-center gap-1.5 text-[13px] font-medium"><FaShare className="w-4 h-4" /> Share</span>
    </div>
  );

  // Story format - vertical fullscreen
  if (adFormat === 'story') {
    return (
      <div data-testid="facebook-preview" className="bg-black text-white font-sans relative" style={{ aspectRatio: '9/16', minHeight: '560px' }}>
        <div className="absolute inset-0">
          <img src={displayMedia} alt="Ad" className="w-full h-full object-cover" crossOrigin="anonymous" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
        </div>
        <div className="absolute top-3 left-3 right-3 z-10 flex items-center gap-2">
          {profileImage ? (
            <img src={profileImage} alt="" className="w-8 h-8 rounded-full object-cover border border-white/50" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-[#1877F2] flex items-center justify-center text-white font-bold text-[11px]">{initial}</div>
          )}
          <span className="text-[12px] font-bold drop-shadow-lg">{brandName}</span>
          <span className="text-[10px] text-white/70 ml-auto">Sponsored</span>
        </div>
        <div className="absolute bottom-4 left-3 right-3 z-10 text-center">
          <p className="text-[13px] drop-shadow-lg mb-3">{caption}</p>
          {showCta && (
            <button className="w-full bg-white text-zinc-900 text-[13px] font-bold py-2.5 rounded-lg">{ctaText || 'Learn More'}</button>
          )}
        </div>
      </div>
    );
  }

  // Carousel format
  if (adFormat === 'carousel') {
    const cards = carouselCards?.length > 0 ? carouselCards : [{ imageUrl: '', headline, description }];
    return (
      <div data-testid="facebook-preview" className="bg-white font-sans text-[14px]">
        <ProfileHeader />
        <div className="px-4 pb-2.5">
          <p className="text-[13px] text-zinc-900 leading-snug">{caption || 'Your ad caption here...'}</p>
        </div>
        {/* Carousel */}
        <div className="relative">
          <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
            {cards.map((card, i) => (
              <div key={i} className="flex-shrink-0 w-[75%] snap-center pr-2 first:pl-4 last:pr-4">
                <div className="rounded-lg overflow-hidden border border-zinc-200">
                  <img
                    src={card.imageUrl || CAROUSEL_PLACEHOLDERS[i % CAROUSEL_PLACEHOLDERS.length]}
                    alt=""
                    className="w-full aspect-square object-cover"
                    crossOrigin="anonymous"
                  />
                  <div className="p-2.5 bg-zinc-50 flex items-center justify-between">
                    <div className="flex-1 min-w-0 mr-2">
                      <p className="font-semibold text-[12px] text-zinc-900 truncate">{card.headline || headline || 'Headline'}</p>
                      <p className="text-[11px] text-zinc-500 truncate">{card.description || ctaLink}</p>
                    </div>
                    {showCta && (
                      <button className="bg-[#1877F2] text-white text-[11px] font-semibold px-3 py-1.5 rounded flex-shrink-0">
                        {ctaText || 'Shop Now'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Dots */}
          <div className="flex justify-center gap-1 py-2">
            {cards.map((_, i) => (
              <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-[#1877F2]' : 'bg-zinc-300'}`} />
            ))}
          </div>
        </div>
        <EngagementBar />
      </div>
    );
  }

  // Single Image / Video (default)
  return (
    <div data-testid="facebook-preview" className="bg-white font-sans text-[14px]">
      <ProfileHeader />
      <div className="px-4 pb-2.5">
        <p className="text-[13px] text-zinc-900 leading-snug">{caption || 'Your ad caption here...'}</p>
      </div>
      <div className="w-full aspect-square bg-zinc-100 relative overflow-hidden">
        {mediaType === 'video' || adFormat === 'video' ? (
          <video src={displayMedia} className="w-full h-full object-cover" muted />
        ) : (
          <img src={displayMedia} alt="Ad" className="w-full h-full object-cover" crossOrigin="anonymous" />
        )}
        {adFormat === 'video' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 bg-black/50 rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-white ml-0.5" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </div>
          </div>
        )}
      </div>
      {/* CTA Card - hidden for awareness/engagement */}
      {showCta ? (
        <div className="px-4 py-3 bg-zinc-50 flex items-center justify-between border-t border-zinc-100">
          <div className="flex-1 min-w-0 mr-3">
            <p className="text-[11px] text-zinc-500 uppercase tracking-wide truncate">{ctaLink || 'WEBSITE.COM'}</p>
            <p className="font-semibold text-[14px] text-zinc-900 leading-tight truncate">{headline || 'Ad Headline'}</p>
            <p className="text-[12px] text-zinc-500 truncate">{description || 'Ad description'}</p>
          </div>
          <button className="bg-[#1877F2] text-white text-[12px] font-semibold px-4 py-2 rounded-md whitespace-nowrap flex-shrink-0">
            {ctaText || 'Shop Now'}
          </button>
        </div>
      ) : (
        <div className="px-4 py-2 border-t border-zinc-100">
          <p className="text-[12px] text-zinc-500">{headline && <span className="font-semibold text-zinc-700">{headline}</span>}</p>
        </div>
      )}
      <EngagementBar />
    </div>
  );
};
