import React from 'react';
import { PLACEHOLDER_IMAGE } from '@/lib/constants';
import { FaRegHeart, FaRegComment, FaRegBookmark, FaEllipsis } from 'react-icons/fa6';
import { Send } from 'lucide-react';

export const InstagramPreview = ({ adData }) => {
  const { brandName, brandHandle, caption, ctaText, mediaUrl, mediaType, profileImage } = adData;
  const displayMedia = mediaUrl || PLACEHOLDER_IMAGE;
  const initial = brandName?.[0]?.toUpperCase() || 'B';
  const handle = brandHandle?.replace('@', '') || 'yourbrand';

  return (
    <div data-testid="instagram-preview" className="bg-white font-sans text-[14px]">
      {/* Header */}
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

      {/* Media */}
      <div className="w-full aspect-square bg-zinc-100 relative overflow-hidden">
        {mediaType === 'video' ? (
          <video src={displayMedia} className="w-full h-full object-cover" muted />
        ) : (
          <img src={displayMedia} alt="Ad" className="w-full h-full object-cover" crossOrigin="anonymous" />
        )}
      </div>

      {/* Action Row */}
      <div className="px-3 pt-2.5 pb-1 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <FaRegHeart className="w-5 h-5 text-zinc-900 cursor-pointer hover:text-zinc-500 transition-colors" />
          <FaRegComment className="w-5 h-5 text-zinc-900 cursor-pointer hover:text-zinc-500 transition-colors" />
          <Send className="w-5 h-5 text-zinc-900 cursor-pointer hover:text-zinc-500 transition-colors" />
        </div>
        <FaRegBookmark className="w-5 h-5 text-zinc-900 cursor-pointer hover:text-zinc-500 transition-colors" />
      </div>

      {/* Likes */}
      <div className="px-3 pt-1.5">
        <p className="font-semibold text-[13px] text-zinc-900">1,234 likes</p>
      </div>

      {/* Caption */}
      <div className="px-3 pt-1 pb-2">
        <p className="text-[13px] text-zinc-900 leading-snug">
          <span className="font-semibold">{handle}</span>{' '}
          {caption || 'Your ad caption here...'}
        </p>
      </div>

      {/* CTA */}
      <div className="px-3 pb-3">
        <button className="w-full bg-[#0095F6] text-white text-[13px] font-semibold py-2 rounded-lg">
          {ctaText || 'Shop Now'}
        </button>
      </div>
    </div>
  );
};
