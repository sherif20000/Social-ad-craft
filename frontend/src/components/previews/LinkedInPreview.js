import React from 'react';
import { PLACEHOLDER_IMAGE, CAROUSEL_PLACEHOLDERS, OBJECTIVES } from '@/lib/constants';
import { FaThumbsUp, FaRegComment, FaRetweet, FaEllipsis, FaGlobe } from 'react-icons/fa6';
import { Send, ChevronLeft, ChevronRight } from 'lucide-react';
import { AutoPlayVideo } from '@/components/AutoPlayVideo';

export const LinkedInPreview = ({ adData }) => {
  const { brandName, caption, headline, description, ctaText, ctaLink, mediaUrl, mediaType, profileImage, objective, adFormat, carouselCards } = adData;
  const initial = brandName?.[0]?.toUpperCase() || 'B';
  const showCta = OBJECTIVES.find(o => o.id === objective)?.hasCta !== false;
  const [slideIndex, setSlideIndex] = React.useState(0);

  const ProfileHeader = () => (
    <div className="px-4 pt-3 pb-2 flex items-start gap-2.5">
      {profileImage ? (
        <img src={profileImage} alt="" className="w-12 h-12 rounded-sm object-cover flex-shrink-0" />
      ) : (
        <div className="w-12 h-12 rounded-sm bg-[#0A66C2] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">{initial}</div>
      )}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-[14px] text-zinc-900">{brandName || 'Brand Name'}</p>
        <p className="text-[11px] text-zinc-500 mt-0.5">12,345 followers</p>
        <p className="text-[11px] text-zinc-500 flex items-center gap-1 mt-0.5">Promoted · <FaGlobe className="w-2.5 h-2.5" /></p>
      </div>
      <FaEllipsis className="w-5 h-5 text-zinc-400 flex-shrink-0" />
    </div>
  );

  const EngagementBar = () => (
    <div className="px-2 py-1 flex items-center justify-around text-zinc-600 border-t border-zinc-100">
      <button className="flex items-center gap-1.5 text-[12px] font-medium py-2.5 px-3 rounded hover:bg-zinc-100"><FaThumbsUp className="w-4 h-4" /> Like</button>
      <button className="flex items-center gap-1.5 text-[12px] font-medium py-2.5 px-3 rounded hover:bg-zinc-100"><FaRegComment className="w-4 h-4" /> Comment</button>
      <button className="flex items-center gap-1.5 text-[12px] font-medium py-2.5 px-3 rounded hover:bg-zinc-100"><FaRetweet className="w-4 h-4" /> Repost</button>
      <button className="flex items-center gap-1.5 text-[12px] font-medium py-2.5 px-3 rounded hover:bg-zinc-100"><Send className="w-4 h-4" /> Send</button>
    </div>
  );

  // Carousel (Document style)
  if (adFormat === 'carousel') {
    const cards = carouselCards?.length > 0 ? carouselCards : [{ imageUrl: '' }];
    return (
      <div data-testid="linkedin-preview" className="bg-white font-sans text-[14px] border border-zinc-200 rounded-lg overflow-hidden">
        <ProfileHeader />
        <div className="px-4 pb-2.5">
          <p className="text-[13px] text-zinc-700 leading-snug">{caption}</p>
        </div>
        {/* Document Carousel */}
        <div className="relative bg-zinc-100">
          <img
            src={cards[slideIndex]?.imageUrl || CAROUSEL_PLACEHOLDERS[slideIndex % CAROUSEL_PLACEHOLDERS.length]}
            alt=""
            className="w-full aspect-[1.91/1] object-cover"
           
          />
          {/* Navigation */}
          {slideIndex > 0 && (
            <button onClick={() => setSlideIndex(slideIndex - 1)} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center">
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
          {slideIndex < cards.length - 1 && (
            <button onClick={() => setSlideIndex(slideIndex + 1)} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center">
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
          {/* Slide counter */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-zinc-900/70 text-white text-[11px] font-medium px-2.5 py-0.5 rounded-full">
            {slideIndex + 1} of {cards.length}
          </div>
        </div>
        {/* Card info */}
        <div className="px-4 py-3 bg-zinc-50 flex items-center justify-between border-t border-zinc-100">
          <div className="flex-1 min-w-0 mr-3">
            <p className="font-semibold text-[14px] text-zinc-900 truncate">{cards[slideIndex]?.headline || headline}</p>
            <p className="text-[11px] text-zinc-500 truncate">{cards[slideIndex]?.description || ctaLink}</p>
          </div>
          {showCta && (
            <button className="border border-[#0A66C2] text-[#0A66C2] text-[13px] font-semibold px-4 py-1.5 rounded-full whitespace-nowrap flex-shrink-0">{ctaText || 'Learn More'}</button>
          )}
        </div>
        <div className="px-4 py-1.5 flex items-center gap-1 text-[12px] text-zinc-500 border-t border-zinc-100">
          <span className="flex -space-x-1">
            <span className="w-4 h-4 rounded-full bg-[#0A66C2] flex items-center justify-center text-white text-[8px]">+</span>
            <span className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center text-white text-[8px]">+</span>
          </span>
          <span className="ml-1">128</span><span className="mx-1">·</span><span>24 comments</span>
        </div>
        <EngagementBar />
      </div>
    );
  }

  // Single Image / Video (default)
  return (
    <div data-testid="linkedin-preview" className="bg-white font-sans text-[14px] border border-zinc-200 rounded-lg overflow-hidden">
      <ProfileHeader />
      <div className="px-4 pb-2.5">
        <p className="text-[13px] text-zinc-700 leading-snug">{caption}</p>
      </div>
      <div className="w-full aspect-[1.91/1] bg-zinc-100 relative overflow-hidden">
        {mediaType === 'video' && mediaUrl ? (
          <AutoPlayVideo src={mediaUrl} className="w-full h-full object-cover" />
        ) : (
          <img src={mediaUrl || "/placeholder.svg"} alt="Ad" className="w-full h-full object-cover" />
        )}
        {adFormat === 'video' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 bg-black/50 rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-white ml-0.5" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </div>
          </div>
        )}
      </div>
      {showCta ? (
        <div className="px-4 py-3 bg-zinc-50 flex items-center justify-between border-t border-zinc-100">
          <div className="flex-1 min-w-0 mr-3">
            <p className="font-semibold text-[14px] text-zinc-900 truncate">{headline}</p>
            <p className="text-[11px] text-zinc-500 truncate">{ctaLink}</p>
          </div>
          <button className="border border-[#0A66C2] text-[#0A66C2] text-[13px] font-semibold px-4 py-1.5 rounded-full whitespace-nowrap flex-shrink-0">{ctaText || 'Learn More'}</button>
        </div>
      ) : (
        <div className="px-4 py-2 border-t border-zinc-100">
          {headline && <p className="font-semibold text-[13px] text-zinc-700">{headline}</p>}
        </div>
      )}
      <div className="px-4 py-1.5 flex items-center gap-1 text-[12px] text-zinc-500 border-t border-zinc-100">
        <span className="flex -space-x-1">
          <span className="w-4 h-4 rounded-full bg-[#0A66C2] flex items-center justify-center text-white text-[8px]">+</span>
          <span className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center text-white text-[8px]">+</span>
          <span className="w-4 h-4 rounded-full bg-yellow-500 flex items-center justify-center text-white text-[8px]">+</span>
        </span>
        <span className="ml-1">128</span><span className="mx-1">·</span><span>24 comments</span>
      </div>
      <EngagementBar />
    </div>
  );
};
