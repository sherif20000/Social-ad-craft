import React from 'react';
import { PLACEHOLDER_IMAGE } from '@/lib/constants';
import { FaThumbsUp, FaRegComment, FaRetweet, FaEllipsis, FaGlobe } from 'react-icons/fa6';
import { Send } from 'lucide-react';

export const LinkedInPreview = ({ adData }) => {
  const { brandName, caption, headline, description, ctaText, ctaLink, mediaUrl, mediaType, profileImage } = adData;
  const displayMedia = mediaUrl || PLACEHOLDER_IMAGE;
  const initial = brandName?.[0]?.toUpperCase() || 'B';

  return (
    <div data-testid="linkedin-preview" className="bg-white font-sans text-[14px] border border-zinc-200 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-4 pt-3 pb-2 flex items-start gap-2.5">
        {profileImage ? (
          <img src={profileImage} alt="" className="w-12 h-12 rounded-sm object-cover flex-shrink-0" />
        ) : (
          <div className="w-12 h-12 rounded-sm bg-[#0A66C2] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">{initial}</div>
        )}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-[14px] text-zinc-900 leading-tight">{brandName || 'Brand Name'}</p>
          <p className="text-[11px] text-zinc-500 leading-tight mt-0.5">12,345 followers</p>
          <p className="text-[11px] text-zinc-500 flex items-center gap-1 mt-0.5">
            Promoted <span>·</span> <FaGlobe className="w-2.5 h-2.5" />
          </p>
        </div>
        <FaEllipsis className="w-5 h-5 text-zinc-400 flex-shrink-0" />
      </div>

      {/* Post text */}
      <div className="px-4 pb-2.5">
        <p className="text-[13px] text-zinc-700 leading-snug">{caption || 'Your ad caption here...'}</p>
      </div>

      {/* Media */}
      <div className="w-full aspect-[1.91/1] bg-zinc-100 relative overflow-hidden">
        {mediaType === 'video' ? (
          <video src={displayMedia} className="w-full h-full object-cover" muted />
        ) : (
          <img src={displayMedia} alt="Ad" className="w-full h-full object-cover" crossOrigin="anonymous" />
        )}
      </div>

      {/* CTA Card */}
      <div className="px-4 py-3 bg-zinc-50 flex items-center justify-between border-t border-zinc-100">
        <div className="flex-1 min-w-0 mr-3">
          <p className="font-semibold text-[14px] text-zinc-900 leading-tight truncate">{headline || 'Ad Headline'}</p>
          <p className="text-[11px] text-zinc-500 truncate">{ctaLink || 'yourbrand.com'}</p>
        </div>
        <button className="border border-[#0A66C2] text-[#0A66C2] text-[13px] font-semibold px-4 py-1.5 rounded-full whitespace-nowrap flex-shrink-0 hover:bg-blue-50 transition-colors">
          {ctaText || 'Learn More'}
        </button>
      </div>

      {/* Reactions */}
      <div className="px-4 py-1.5 flex items-center gap-1 text-[12px] text-zinc-500 border-t border-zinc-100">
        <span className="flex -space-x-1">
          <span className="w-4 h-4 rounded-full bg-[#0A66C2] flex items-center justify-center text-white text-[8px]">+</span>
          <span className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center text-white text-[8px]">+</span>
          <span className="w-4 h-4 rounded-full bg-yellow-500 flex items-center justify-center text-white text-[8px]">+</span>
        </span>
        <span className="ml-1">128</span>
        <span className="mx-1">·</span>
        <span>24 comments</span>
      </div>

      {/* Engagement */}
      <div className="px-2 py-1 flex items-center justify-around text-zinc-600 border-t border-zinc-100">
        <button className="flex items-center gap-1.5 text-[12px] font-medium py-2.5 px-3 rounded hover:bg-zinc-100 transition-colors">
          <FaThumbsUp className="w-4 h-4" /> Like
        </button>
        <button className="flex items-center gap-1.5 text-[12px] font-medium py-2.5 px-3 rounded hover:bg-zinc-100 transition-colors">
          <FaRegComment className="w-4 h-4" /> Comment
        </button>
        <button className="flex items-center gap-1.5 text-[12px] font-medium py-2.5 px-3 rounded hover:bg-zinc-100 transition-colors">
          <FaRetweet className="w-4 h-4" /> Repost
        </button>
        <button className="flex items-center gap-1.5 text-[12px] font-medium py-2.5 px-3 rounded hover:bg-zinc-100 transition-colors">
          <Send className="w-4 h-4" /> Send
        </button>
      </div>
    </div>
  );
};
