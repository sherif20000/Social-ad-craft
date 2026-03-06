import React from 'react';
import { FaGoogle } from 'react-icons/fa6';

export const GoogleAdsPreview = ({ adData }) => {
  const { brandName, caption, headline, description, ctaText, ctaLink } = adData;
  const displayUrl = ctaLink || 'yourbrand.com';

  return (
    <div data-testid="google-ads-preview" className="bg-white font-sans text-[14px] p-4">
      {/* Google Search Bar */}
      <div className="flex items-center gap-3 border border-zinc-200 rounded-full px-5 py-2.5 mb-6 shadow-sm">
        <FaGoogle className="w-5 h-5 text-zinc-400 flex-shrink-0" />
        <span className="text-[14px] text-zinc-900 truncate">{brandName || 'your brand'}</span>
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-zinc-400 ml-auto flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
        </svg>
      </div>

      {/* Search Ad Result */}
      <div className="mb-6">
        {/* Sponsored tag + URL */}
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[11px] font-bold text-zinc-600 bg-zinc-100 px-1.5 py-0.5 rounded">Sponsored</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center">
            <span className="text-[10px] font-bold text-indigo-600">{brandName?.[0]?.toUpperCase() || 'B'}</span>
          </div>
          <div>
            <p className="text-[13px] text-zinc-900 font-medium">{brandName || 'Brand Name'}</p>
            <p className="text-[11px] text-zinc-600">{displayUrl}</p>
          </div>
        </div>

        {/* Headline */}
        <a href="#" className="block text-[18px] text-[#1a0dab] hover:underline leading-tight mb-1" onClick={(e) => e.preventDefault()}>
          {headline || 'Ad Headline'} - {brandName || 'Brand'} | Official Site
        </a>

        {/* Description */}
        <p className="text-[13px] text-zinc-600 leading-relaxed">
          {description || caption || 'Your ad description here. This is where you convince people to click.'} {ctaText && <span className="font-medium text-zinc-800">{ctaText}.</span>}
        </p>

        {/* Sitelinks */}
        <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1">
          <a href="#" className="text-[13px] text-[#1a0dab] hover:underline" onClick={(e) => e.preventDefault()}>About Us</a>
          <a href="#" className="text-[13px] text-[#1a0dab] hover:underline" onClick={(e) => e.preventDefault()}>Pricing</a>
          <a href="#" className="text-[13px] text-[#1a0dab] hover:underline" onClick={(e) => e.preventDefault()}>Contact</a>
          <a href="#" className="text-[13px] text-[#1a0dab] hover:underline" onClick={(e) => e.preventDefault()}>Free Trial</a>
        </div>
      </div>

      {/* Separator */}
      <hr className="border-zinc-100 mb-4" />

      {/* Organic result placeholder */}
      <div className="opacity-40">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-5 h-5 rounded-full bg-zinc-200" />
          <div className="h-3 w-32 bg-zinc-200 rounded" />
        </div>
        <div className="h-4 w-64 bg-zinc-200 rounded mb-1.5" />
        <div className="h-3 w-full bg-zinc-100 rounded mb-1" />
        <div className="h-3 w-48 bg-zinc-100 rounded" />
      </div>
    </div>
  );
};
