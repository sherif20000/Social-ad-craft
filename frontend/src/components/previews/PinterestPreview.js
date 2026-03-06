import React from 'react';
import { PLACEHOLDER_IMAGE } from '@/lib/constants';
import { FaEllipsis, FaArrowUpFromBracket } from 'react-icons/fa6';

export const PinterestPreview = ({ adData }) => {
  const { brandName, headline, description, ctaText, ctaLink, mediaUrl, mediaType, profileImage } = adData;
  const displayMedia = mediaUrl || PLACEHOLDER_IMAGE;
  const initial = brandName?.[0]?.toUpperCase() || 'B';

  return (
    <div data-testid="pinterest-preview" className="bg-white font-sans text-[14px] max-w-[300px] mx-auto">
      {/* Pin Card */}
      <div className="rounded-2xl overflow-hidden shadow-sm border border-zinc-100">
        {/* Image */}
        <div className="relative" style={{ aspectRatio: '2/3' }}>
          {mediaType === 'video' ? (
            <video src={displayMedia} className="w-full h-full object-cover" muted />
          ) : (
            <img src={displayMedia} alt="Pin" className="w-full h-full object-cover" crossOrigin="anonymous" />
          )}

          {/* Promoted badge */}
          <div className="absolute top-3 left-3">
            <span className="bg-white/90 text-zinc-700 text-[10px] font-semibold px-2 py-1 rounded-full">Promoted</span>
          </div>

          {/* Save button overlay */}
          <div className="absolute top-3 right-3">
            <button className="bg-[#E60023] text-white text-[13px] font-bold px-4 py-2 rounded-full shadow-lg">
              Save
            </button>
          </div>

          {/* Bottom overlay actions */}
          <div className="absolute bottom-3 right-3 flex items-center gap-2">
            <button className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-sm">
              <FaArrowUpFromBracket className="w-3.5 h-3.5 text-zinc-700" />
            </button>
            <button className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-sm">
              <FaEllipsis className="w-3.5 h-3.5 text-zinc-700" />
            </button>
          </div>

          {/* CTA overlay */}
          {ctaText && (
            <div className="absolute bottom-3 left-3">
              <button className="bg-white text-zinc-900 text-[12px] font-semibold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
                <svg viewBox="0 0 24 24" className="w-3 h-3" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14v-4H7l5-7v4h4l-5 7z"/></svg>
                {ctaLink || 'yourbrand.com'}
              </button>
            </div>
          )}
        </div>

        {/* Pin Info */}
        <div className="p-3">
          <p className="font-semibold text-[14px] text-zinc-900 leading-tight">{headline || 'Pin Title'}</p>
          {description && (
            <p className="text-[12px] text-zinc-500 mt-1 line-clamp-2">{description}</p>
          )}

          {/* Brand */}
          <div className="flex items-center gap-2 mt-2.5">
            {profileImage ? (
              <img src={profileImage} alt="" className="w-6 h-6 rounded-full object-cover" />
            ) : (
              <div className="w-6 h-6 rounded-full bg-[#E60023] flex items-center justify-center text-white font-bold text-[10px]">{initial}</div>
            )}
            <span className="text-[12px] font-medium text-zinc-700">{brandName || 'Brand Name'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
