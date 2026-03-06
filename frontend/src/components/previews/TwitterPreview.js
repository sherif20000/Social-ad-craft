import React from 'react';
import { PLACEHOLDER_IMAGE } from '@/lib/constants';
import { FaRegComment, FaRetweet, FaRegHeart, FaChartSimple, FaArrowUpFromBracket, FaEllipsis } from 'react-icons/fa6';

export const TwitterPreview = ({ adData }) => {
  const { brandName, brandHandle, caption, headline, ctaLink, mediaUrl, mediaType, profileImage } = adData;
  const displayMedia = mediaUrl || PLACEHOLDER_IMAGE;
  const initial = brandName?.[0]?.toUpperCase() || 'B';
  const handle = brandHandle || '@yourbrand';

  return (
    <div data-testid="twitter-preview" className="bg-white font-sans text-[15px] px-4 py-3">
      {/* Promoted tag */}
      <div className="flex items-center gap-1.5 text-zinc-400 text-[12px] mb-1.5 pl-12">
        <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current"><path d="M19.498 3h-15c-1.381 0-2.5 1.12-2.5 2.5v13c0 1.38 1.119 2.5 2.5 2.5h15c1.381 0 2.5-1.12 2.5-2.5v-13c0-1.38-1.119-2.5-2.5-2.5zm-3.502 12h-2v-3.59l-5.293 5.3-1.414-1.42L12.581 10H8.998V8h7v7z"/></svg>
        Promoted
      </div>

      <div className="flex gap-2.5">
        {/* Avatar */}
        {profileImage ? (
          <img src={profileImage} alt="" className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
        ) : (
          <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">{initial}</div>
        )}

        <div className="flex-1 min-w-0">
          {/* Name row */}
          <div className="flex items-center gap-1 mb-0.5">
            <span className="font-bold text-[14px] text-zinc-900 truncate">{brandName || 'Brand Name'}</span>
            <svg viewBox="0 0 22 22" className="w-4 h-4 text-[#1D9BF0] flex-shrink-0"><path fill="currentColor" d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.853-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.69-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.636.433 1.221.878 1.69.47.446 1.055.752 1.69.883.635.13 1.294.083 1.902-.143.271.586.702 1.084 1.24 1.438.54.354 1.167.551 1.813.568.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.225 1.261.272 1.893.143.636-.13 1.22-.436 1.69-.882.445-.47.75-1.055.88-1.691.131-.634.084-1.292-.139-1.9.584-.272 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816z"/><path fill="white" d="M9.585 14.929l-3.28-3.28 1.168-1.168 2.112 2.112 5.156-5.156 1.168 1.168z"/></svg>
            <span className="text-zinc-500 text-[13px] truncate">{handle}</span>
            <span className="text-zinc-400 text-[13px]">·</span>
            <span className="text-zinc-500 text-[13px]">1h</span>
            <FaEllipsis className="w-4 h-4 text-zinc-400 ml-auto flex-shrink-0" />
          </div>

          {/* Tweet text */}
          <p className="text-[14px] text-zinc-900 leading-snug mb-2.5">{caption || 'Your ad caption here...'}</p>

          {/* Media Card */}
          <div className="rounded-2xl overflow-hidden border border-zinc-200 mb-2.5">
            <div className="aspect-video bg-zinc-100 relative overflow-hidden">
              {mediaType === 'video' ? (
                <video src={displayMedia} className="w-full h-full object-cover" muted />
              ) : (
                <img src={displayMedia} alt="Ad" className="w-full h-full object-cover" crossOrigin="anonymous" />
              )}
            </div>
            <div className="px-3 py-2 bg-white">
              <p className="text-[12px] text-zinc-500">{ctaLink || 'yourbrand.com'}</p>
              <p className="font-medium text-[13px] text-zinc-900 leading-tight">{headline || 'Ad Headline'}</p>
            </div>
          </div>

          {/* Engagement */}
          <div className="flex items-center justify-between text-zinc-500 pr-6">
            <span className="flex items-center gap-1.5 text-[12px] hover:text-[#1D9BF0] cursor-pointer transition-colors"><FaRegComment className="w-4 h-4" /> 12</span>
            <span className="flex items-center gap-1.5 text-[12px] hover:text-green-500 cursor-pointer transition-colors"><FaRetweet className="w-4.5 h-4.5" /> 48</span>
            <span className="flex items-center gap-1.5 text-[12px] hover:text-pink-500 cursor-pointer transition-colors"><FaRegHeart className="w-4 h-4" /> 256</span>
            <span className="flex items-center gap-1.5 text-[12px] hover:text-[#1D9BF0] cursor-pointer transition-colors"><FaChartSimple className="w-4 h-4" /> 12K</span>
            <FaArrowUpFromBracket className="w-3.5 h-3.5 hover:text-[#1D9BF0] cursor-pointer transition-colors" />
          </div>
        </div>
      </div>
    </div>
  );
};
