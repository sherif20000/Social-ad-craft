import React from 'react';
import { PLACEHOLDER_IMAGE, CAROUSEL_PLACEHOLDERS, OBJECTIVES } from '@/lib/constants';
import { FaEllipsis, FaArrowUpFromBracket } from 'react-icons/fa6';
import { AutoPlayVideo } from '@/components/AutoPlayVideo';

export const PinterestPreview = ({ adData }) => {
  const { brandName, headline, description, ctaText, ctaLink, mediaUrl, mediaType, profileImage, objective, adFormat, carouselCards } = adData;
  const displayMedia = mediaUrl || PLACEHOLDER_IMAGE;
  const initial = brandName?.[0]?.toUpperCase() || 'B';
  const showCta = OBJECTIVES.find(o => o.id === objective)?.hasCta !== false;

  // Carousel Pin
  if (adFormat === 'carousel') {
    const cards = carouselCards?.length > 0 ? carouselCards : [{ imageUrl: '' }];
    return (
      <div data-testid="pinterest-preview" className="bg-white font-sans text-[14px] max-w-[300px] mx-auto">
        <div className="flex gap-2 overflow-x-auto snap-x snap-mandatory p-2" style={{ scrollbarWidth: 'none' }}>
          {cards.map((card, i) => (
            <div key={i} className="flex-shrink-0 w-[85%] snap-center rounded-2xl overflow-hidden shadow-sm border border-zinc-100">
              <div className="relative" style={{ aspectRatio: '2/3' }}>
                <img
                  src={card.imageUrl || CAROUSEL_PLACEHOLDERS[i % CAROUSEL_PLACEHOLDERS.length]}
                  alt=""
                  className="w-full h-full object-cover"
                 
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-white/90 text-zinc-700 text-[10px] font-semibold px-2 py-1 rounded-full">Promoted</span>
                </div>
                <div className="absolute top-3 right-3">
                  <button className="bg-[#E60023] text-white text-[13px] font-bold px-4 py-2 rounded-full shadow-lg">Save</button>
                </div>
              </div>
              <div className="p-3">
                <p className="font-semibold text-[14px] text-zinc-900">{card.headline || headline}</p>
                {card.description && <p className="text-[12px] text-zinc-500 mt-1">{card.description}</p>}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-1 pb-2">
          {cards.map((_, i) => (
            <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-[#E60023]' : 'bg-zinc-300'}`} />
          ))}
        </div>
      </div>
    );
  }

  // Video Pin
  if (adFormat === 'video') {
    return (
      <div data-testid="pinterest-preview" className="bg-white font-sans text-[14px] max-w-[300px] mx-auto">
        <div className="rounded-2xl overflow-hidden shadow-sm border border-zinc-100">
          <div className="relative" style={{ aspectRatio: '2/3' }}>
            {mediaType === 'video' && mediaUrl ? (
              <AutoPlayVideo src={mediaUrl} className="w-full h-full object-cover" />
            ) : (
              <img src={displayMedia} alt="" className="w-full h-full object-cover" />
            )}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 bg-black/40 rounded-full flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-white ml-0.5" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              </div>
            </div>
            <div className="absolute top-3 left-3">
              <span className="bg-white/90 text-zinc-700 text-[10px] font-semibold px-2 py-1 rounded-full">Promoted</span>
            </div>
            <div className="absolute top-3 right-3">
              <button className="bg-[#E60023] text-white text-[13px] font-bold px-4 py-2 rounded-full shadow-lg">Save</button>
            </div>
            <div className="absolute bottom-3 left-3 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded">0:15</div>
          </div>
          <div className="p-3">
            <p className="font-semibold text-[14px] text-zinc-900">{headline}</p>
            {description && <p className="text-[12px] text-zinc-500 mt-1 line-clamp-2">{description}</p>}
            <div className="flex items-center gap-2 mt-2.5">
              {profileImage ? (
                <img src={profileImage} alt="" className="w-6 h-6 rounded-full object-cover" />
              ) : (
                <div className="w-6 h-6 rounded-full bg-[#E60023] flex items-center justify-center text-white font-bold text-[10px]">{initial}</div>
              )}
              <span className="text-[12px] font-medium text-zinc-700">{brandName}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Standard Pin (default)
  return (
    <div data-testid="pinterest-preview" className="bg-white font-sans text-[14px] max-w-[300px] mx-auto">
      <div className="rounded-2xl overflow-hidden shadow-sm border border-zinc-100">
        <div className="relative" style={{ aspectRatio: '2/3' }}>
          {mediaType === 'video' && mediaUrl ? (
            <video src={mediaUrl} className="w-full h-full object-cover" autoPlay muted loop playsInline />
          ) : (
            <img src={displayMedia} alt="Pin" className="w-full h-full object-cover" />
          )}
          <div className="absolute top-3 left-3">
            <span className="bg-white/90 text-zinc-700 text-[10px] font-semibold px-2 py-1 rounded-full">Promoted</span>
          </div>
          <div className="absolute top-3 right-3">
            <button className="bg-[#E60023] text-white text-[13px] font-bold px-4 py-2 rounded-full shadow-lg">Save</button>
          </div>
          <div className="absolute bottom-3 right-3 flex items-center gap-2">
            <button className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-sm"><FaArrowUpFromBracket className="w-3.5 h-3.5 text-zinc-700" /></button>
            <button className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-sm"><FaEllipsis className="w-3.5 h-3.5 text-zinc-700" /></button>
          </div>
          {showCta && ctaLink && (
            <div className="absolute bottom-3 left-3">
              <button className="bg-white text-zinc-900 text-[12px] font-semibold px-3 py-1.5 rounded-full shadow-sm">{ctaLink}</button>
            </div>
          )}
        </div>
        <div className="p-3">
          <p className="font-semibold text-[14px] text-zinc-900">{headline || 'Pin Title'}</p>
          {description && <p className="text-[12px] text-zinc-500 mt-1 line-clamp-2">{description}</p>}
          <div className="flex items-center gap-2 mt-2.5">
            {profileImage ? (
              <img src={profileImage} alt="" className="w-6 h-6 rounded-full object-cover" />
            ) : (
              <div className="w-6 h-6 rounded-full bg-[#E60023] flex items-center justify-center text-white font-bold text-[10px]">{initial}</div>
            )}
            <span className="text-[12px] font-medium text-zinc-700">{brandName}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
