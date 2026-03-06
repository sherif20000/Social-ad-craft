import React, { useState } from 'react';
import { PLACEHOLDER_IMAGE, CAROUSEL_PLACEHOLDERS, OBJECTIVES } from '@/lib/constants';
import { FaRegHeart, FaRegComment, FaRegBookmark, FaEllipsis } from 'react-icons/fa6';
import { Send } from 'lucide-react';
import { AutoPlayVideo } from '@/components/AutoPlayVideo';

export const InstagramPreview = ({ adData }) => {
  const { brandName, brandHandle, caption, ctaText, mediaUrl, mediaType, profileImage, objective, adFormat, carouselCards } = adData;
  const displayMedia = mediaUrl || PLACEHOLDER_IMAGE;
  const initial = brandName?.[0]?.toUpperCase() || 'B';
  const handle = brandHandle?.replace('@', '') || 'yourbrand';
  const showCta = OBJECTIVES.find(o => o.id === objective)?.hasCta !== false;
  const [carouselIndex, setCarouselIndex] = useState(0);

  const ProfileHeader = () => (
    <div className="px-3 py-2.5 flex items-center gap-2.5">
      <div className="w-8 h-8 rounded-full ring-2 ring-pink-500 ring-offset-1 flex items-center justify-center overflow-hidden">
        {profileImage ? (
          <img src={profileImage} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center text-white font-bold text-xs">{initial}</div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-[13px] text-zinc-900 leading-tight">{handle}</p>
        <p className="text-[10px] text-zinc-500">Sponsored</p>
      </div>
      <FaEllipsis className="w-4 h-4 text-zinc-600" />
    </div>
  );

  const ActionRow = () => (
    <div className="px-3 pt-2.5 pb-1 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <FaRegHeart className="w-5 h-5 text-zinc-900" />
        <FaRegComment className="w-5 h-5 text-zinc-900" />
        <Send className="w-5 h-5 text-zinc-900" />
      </div>
      <FaRegBookmark className="w-5 h-5 text-zinc-900" />
    </div>
  );

  // Story / Reel format
  if (adFormat === 'story' || adFormat === 'video') {
    return (
      <div data-testid="instagram-preview" className="bg-black text-white font-sans relative" style={{ aspectRatio: '9/16', minHeight: '560px' }}>
        <div className="absolute inset-0">
          {mediaType === 'video' && mediaUrl ? (
            <AutoPlayVideo src={mediaUrl} className="w-full h-full object-cover" />
          ) : (
            <img src={displayMedia} alt="Ad" className="w-full h-full object-cover" crossOrigin="anonymous" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
        </div>
        {/* Story progress bar */}
        <div className="absolute top-2 left-2 right-2 z-10 flex gap-0.5">
          <div className="flex-1 h-0.5 bg-white/80 rounded-full" />
          <div className="flex-1 h-0.5 bg-white/30 rounded-full" />
        </div>
        <div className="absolute top-5 left-3 right-3 z-10 flex items-center gap-2">
          <div className="w-7 h-7 rounded-full overflow-hidden ring-2 ring-pink-500">
            {profileImage ? (
              <img src={profileImage} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-purple-500 to-orange-400 flex items-center justify-center text-white font-bold text-[10px]">{initial}</div>
            )}
          </div>
          <span className="text-[12px] font-bold drop-shadow-lg">{handle}</span>
          <span className="text-[10px] text-white/70 font-medium">Sponsored</span>
        </div>
        {adFormat === 'video' && (
          <div className="absolute inset-0 flex items-center justify-center z-5">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <svg viewBox="0 0 24 24" className="w-7 h-7 text-white ml-1" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </div>
          </div>
        )}
        <div className="absolute bottom-4 left-3 right-3 z-10 text-center">
          <p className="text-[13px] drop-shadow-lg mb-3 line-clamp-2">{caption}</p>
          {showCta && (
            <button className="w-full bg-white text-zinc-900 text-[13px] font-bold py-2.5 rounded-lg">{ctaText || 'Learn More'}</button>
          )}
        </div>
      </div>
    );
  }

  // Carousel format
  if (adFormat === 'carousel') {
    const cards = carouselCards?.length > 0 ? carouselCards : [{ imageUrl: '' }];
    return (
      <div data-testid="instagram-preview" className="bg-white font-sans text-[14px]">
        <ProfileHeader />
        <div className="relative">
          <img
            src={cards[carouselIndex]?.imageUrl || CAROUSEL_PLACEHOLDERS[carouselIndex % CAROUSEL_PLACEHOLDERS.length]}
            alt=""
            className="w-full aspect-square object-cover"
            crossOrigin="anonymous"
          />
          {/* Navigation arrows */}
          {carouselIndex > 0 && (
            <button onClick={() => setCarouselIndex(carouselIndex - 1)} className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/90 rounded-full shadow flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
          )}
          {carouselIndex < cards.length - 1 && (
            <button onClick={() => setCarouselIndex(carouselIndex + 1)} className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/90 rounded-full shadow flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          )}
          {/* Counter */}
          <div className="absolute top-3 right-3 bg-zinc-900/70 text-white text-[11px] font-medium px-2 py-0.5 rounded-full">
            {carouselIndex + 1}/{cards.length}
          </div>
        </div>
        {/* Dots */}
        <div className="flex justify-center gap-1 py-1.5">
          {cards.map((_, i) => (
            <button key={i} onClick={() => setCarouselIndex(i)} className={`w-1.5 h-1.5 rounded-full transition-colors ${i === carouselIndex ? 'bg-[#0095F6]' : 'bg-zinc-300'}`} />
          ))}
        </div>
        <ActionRow />
        <div className="px-3 pt-1"><p className="font-semibold text-[13px]">1,234 likes</p></div>
        <div className="px-3 pt-1 pb-2">
          <p className="text-[13px] text-zinc-900"><span className="font-semibold">{handle}</span> {cards[carouselIndex]?.headline || caption}</p>
        </div>
        {showCta && (
          <div className="px-3 pb-3">
            <button className="w-full bg-[#0095F6] text-white text-[13px] font-semibold py-2 rounded-lg">{ctaText || 'Shop Now'}</button>
          </div>
        )}
      </div>
    );
  }

  // Single Image (default)
  return (
    <div data-testid="instagram-preview" className="bg-white font-sans text-[14px]">
      <ProfileHeader />
      <div className="w-full aspect-square bg-zinc-100 relative overflow-hidden">
        <img src={displayMedia} alt="Ad" className="w-full h-full object-cover" crossOrigin="anonymous" />
      </div>
      <ActionRow />
      <div className="px-3 pt-1.5"><p className="font-semibold text-[13px] text-zinc-900">1,234 likes</p></div>
      <div className="px-3 pt-1 pb-2">
        <p className="text-[13px] text-zinc-900 leading-snug">
          <span className="font-semibold">{handle}</span>{' '}{caption || 'Your ad caption here...'}
        </p>
      </div>
      {showCta && (
        <div className="px-3 pb-3">
          <button className="w-full bg-[#0095F6] text-white text-[13px] font-semibold py-2 rounded-lg">{ctaText || 'Shop Now'}</button>
        </div>
      )}
    </div>
  );
};
