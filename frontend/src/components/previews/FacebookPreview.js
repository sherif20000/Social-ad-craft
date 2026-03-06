import React from 'react';
import { PLACEHOLDER_IMAGE } from '@/lib/constants';
import { FaThumbsUp, FaComment, FaShare, FaEllipsis, FaGlobe } from 'react-icons/fa6';

export const FacebookPreview = ({ adData }) => {
  const { brandName, caption, headline, description, ctaText, ctaLink, mediaUrl, mediaType, profileImage } = adData;
  const displayMedia = mediaUrl || PLACEHOLDER_IMAGE;
  const initial = brandName?.[0]?.toUpperCase() || 'B';

  return (
    <div data-testid="facebook-preview" className="bg-white font-sans text-[14px]">
      {/* Header */}
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

      {/* Caption */}
      <div className="px-4 pb-2.5">
        <p className="text-[13px] text-zinc-900 leading-snug">{caption || 'Your ad caption here...'}</p>
      </div>

      {/* Media */}
      <div className="w-full aspect-square bg-zinc-100 relative overflow-hidden">
        {mediaType === 'video' ? (
          <video src={displayMedia} className="w-full h-full object-cover" muted />
        ) : (
          <img src={displayMedia} alt="Ad" className="w-full h-full object-cover" crossOrigin="anonymous" />
        )}
      </div>

      {/* CTA Card */}
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

      {/* Engagement Bar */}
      <div className="px-4 py-2.5 flex items-center justify-around text-zinc-500 border-t border-zinc-100">
        <span className="flex items-center gap-1.5 text-[13px] font-medium"><FaThumbsUp className="w-4 h-4" /> Like</span>
        <span className="flex items-center gap-1.5 text-[13px] font-medium"><FaComment className="w-4 h-4" /> Comment</span>
        <span className="flex items-center gap-1.5 text-[13px] font-medium"><FaShare className="w-4 h-4" /> Share</span>
      </div>
    </div>
  );
};
