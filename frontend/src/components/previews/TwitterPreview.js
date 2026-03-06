import React from 'react';
import { PLACEHOLDER_IMAGE, CAROUSEL_PLACEHOLDERS, OBJECTIVES } from '@/lib/constants';
import { FaRegComment, FaRetweet, FaRegHeart, FaChartSimple, FaArrowUpFromBracket, FaEllipsis } from 'react-icons/fa6';

export const TwitterPreview = ({ adData }) => {
  const { brandName, brandHandle, caption, headline, ctaText, ctaLink, mediaUrl, mediaType, profileImage, objective, adFormat, carouselCards } = adData;
  const displayMedia = mediaUrl || PLACEHOLDER_IMAGE;
  const initial = brandName?.[0]?.toUpperCase() || 'B';
  const handle = brandHandle || '@yourbrand';
  const showCta = OBJECTIVES.find(o => o.id === objective)?.hasCta !== false;

  const Engagement = () => (
    <div className="flex items-center justify-between text-zinc-500 pr-6 mt-2.5">
      <span className="flex items-center gap-1.5 text-[12px] hover:text-[#1D9BF0] cursor-pointer"><FaRegComment className="w-4 h-4" /> 12</span>
      <span className="flex items-center gap-1.5 text-[12px] hover:text-green-500 cursor-pointer"><FaRetweet className="w-4.5 h-4.5" /> 48</span>
      <span className="flex items-center gap-1.5 text-[12px] hover:text-pink-500 cursor-pointer"><FaRegHeart className="w-4 h-4" /> 256</span>
      <span className="flex items-center gap-1.5 text-[12px] hover:text-[#1D9BF0] cursor-pointer"><FaChartSimple className="w-4 h-4" /> 12K</span>
      <FaArrowUpFromBracket className="w-3.5 h-3.5" />
    </div>
  );

  return (
    <div data-testid="twitter-preview" className="bg-white font-sans text-[15px] px-4 py-3">
      <div className="flex items-center gap-1.5 text-zinc-400 text-[12px] mb-1.5 pl-12">
        <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current"><path d="M19.498 3h-15c-1.381 0-2.5 1.12-2.5 2.5v13c0 1.38 1.119 2.5 2.5 2.5h15c1.381 0 2.5-1.12 2.5-2.5v-13c0-1.38-1.119-2.5-2.5-2.5zm-3.502 12h-2v-3.59l-5.293 5.3-1.414-1.42L12.581 10H8.998V8h7v7z"/></svg>
        Promoted
      </div>
      <div className="flex gap-2.5">
        {profileImage ? (
          <img src={profileImage} alt="" className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
        ) : (
          <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">{initial}</div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 mb-0.5">
            <span className="font-bold text-[14px] text-zinc-900 truncate">{brandName || 'Brand Name'}</span>
            <span className="text-zinc-500 text-[13px] truncate">{handle}</span>
            <FaEllipsis className="w-4 h-4 text-zinc-400 ml-auto flex-shrink-0" />
          </div>
          <p className="text-[14px] text-zinc-900 leading-snug mb-2.5">{caption || 'Your ad caption here...'}</p>

          {/* Carousel */}
          {adFormat === 'carousel' ? (
            <div className="flex overflow-x-auto gap-2 snap-x snap-mandatory rounded-2xl" style={{ scrollbarWidth: 'none' }}>
              {(carouselCards?.length > 0 ? carouselCards : [{ imageUrl: '' }]).map((card, i) => (
                <div key={i} className="flex-shrink-0 w-[70%] snap-center rounded-xl overflow-hidden border border-zinc-200">
                  <img
                    src={card.imageUrl || CAROUSEL_PLACEHOLDERS[i % CAROUSEL_PLACEHOLDERS.length]}
                    alt="" className="w-full aspect-[4/3] object-cover"
                    crossOrigin="anonymous"
                  />
                  <div className="px-2.5 py-2 bg-white">
                    <p className="font-medium text-[12px] text-zinc-900 truncate">{card.headline || headline || 'Headline'}</p>
                    <p className="text-[11px] text-zinc-500 truncate">{card.description || ctaLink}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Single Image / Video */
            <div className="rounded-2xl overflow-hidden border border-zinc-200 mb-0.5">
              <div className={`bg-zinc-100 relative overflow-hidden ${adFormat === 'video' ? 'aspect-video' : 'aspect-video'}`}>
                <img src={displayMedia} alt="Ad" className="w-full h-full object-cover" crossOrigin="anonymous" />
                {adFormat === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 bg-black/50 rounded-full flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-6 h-6 text-white ml-0.5" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                  </div>
                )}
              </div>
              {showCta && (
                <div className="px-3 py-2 bg-white">
                  <p className="text-[12px] text-zinc-500">{ctaLink || 'yourbrand.com'}</p>
                  <p className="font-medium text-[13px] text-zinc-900 leading-tight">{headline || 'Ad Headline'}</p>
                </div>
              )}
            </div>
          )}

          <Engagement />
        </div>
      </div>
    </div>
  );
};
