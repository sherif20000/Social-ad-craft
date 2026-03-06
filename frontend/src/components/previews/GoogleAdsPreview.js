import React from 'react';
import { OBJECTIVES } from '@/lib/constants';
import { FaGoogle } from 'react-icons/fa6';

export const GoogleAdsPreview = ({ adData }) => {
  const { brandName, caption, headline, description, ctaText, ctaLink, mediaUrl, objective, adFormat } = adData;
  const displayUrl = ctaLink || 'yourbrand.com';
  const showCta = OBJECTIVES.find(o => o.id === objective)?.hasCta !== false;

  // Display Ad
  if (adFormat === 'display') {
    return (
      <div data-testid="google-ads-preview" className="bg-white font-sans text-[14px] p-0">
        {/* Display Banner */}
        <div className="relative bg-zinc-100 rounded-lg overflow-hidden border border-zinc-200" style={{ aspectRatio: '1.91/1' }}>
          <img src={mediaUrl || "/placeholder.svg"} alt="Ad" className="w-full h-full object-cover" />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-center p-6">
            <p className="text-white text-[18px] font-bold leading-tight mb-1">{headline || 'Ad Headline'}</p>
            <p className="text-white/80 text-[12px] mb-3 max-w-[60%]">{description || 'Your ad description'}</p>
            {showCta && (
              <button className="bg-[#4285F4] text-white text-[12px] font-bold px-4 py-2 rounded self-start">{ctaText || 'Learn More'}</button>
            )}
          </div>
          {/* Ad label */}
          <div className="absolute top-2 right-2 flex items-center gap-1">
            <span className="bg-white/90 text-[10px] font-bold text-zinc-600 px-1.5 py-0.5 rounded flex items-center gap-1">
              <svg viewBox="0 0 15 15" className="w-2.5 h-2.5"><path fill="#FBBC04" d="M7.5 0L9.18 5.74H15L10.16 9.28L11.82 15L7.5 11.16L3.18 15L4.84 9.28L0 5.74H5.82Z"/></svg>
              Ad
            </span>
          </div>
          {/* Brand logo */}
          <div className="absolute bottom-2 left-2 bg-white/90 rounded px-2 py-1">
            <span className="text-[11px] font-bold text-zinc-700">{brandName}</span>
          </div>
        </div>
      </div>
    );
  }

  // Shopping Ad
  if (adFormat === 'shopping') {
    return (
      <div data-testid="google-ads-preview" className="bg-white font-sans text-[14px] p-4">
        <div className="flex items-center gap-3 border border-zinc-200 rounded-full px-5 py-2.5 mb-5 shadow-sm">
          <FaGoogle className="w-5 h-5 text-zinc-400" />
          <span className="text-[14px] text-zinc-900">{brandName || 'product'}</span>
        </div>
        {/* Shopping label */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[11px] font-bold text-zinc-600 bg-zinc-100 px-1.5 py-0.5 rounded">Sponsored</span>
          <span className="text-[13px] text-zinc-500">{brandName}</span>
        </div>
        {/* Shopping cards */}
        <div className="grid grid-cols-2 gap-3">
          {[0, 1, 2, 3].map(i => (
            <div key={i} className={`rounded-lg border border-zinc-200 overflow-hidden ${i === 0 ? 'ring-2 ring-indigo-200' : 'opacity-60'}`}>
              <img src={mediaUrl || "/placeholder.svg"} alt="" className="w-full aspect-square object-cover" />
              <div className="p-2.5">
                <p className="font-bold text-[14px] text-zinc-900">{i === 0 ? '$49.99' : `$${29 + i * 15}.99`}</p>
                <p className="text-[11px] text-zinc-600 mt-0.5 truncate">{i === 0 ? (headline || 'Product Name') : 'Similar Product'}</p>
                <p className="text-[10px] text-zinc-400 mt-0.5">{i === 0 ? brandName : 'Other Brand'}</p>
                <div className="flex items-center gap-0.5 mt-1">
                  {[1,2,3,4,5].map(s => (
                    <svg key={s} className={`w-2.5 h-2.5 ${s <= 4 ? 'text-yellow-400' : 'text-zinc-300'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  ))}
                  <span className="text-[10px] text-zinc-400 ml-0.5">(128)</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Search Ad (default)
  return (
    <div data-testid="google-ads-preview" className="bg-white font-sans text-[14px] p-4">
      <div className="flex items-center gap-3 border border-zinc-200 rounded-full px-5 py-2.5 mb-6 shadow-sm">
        <FaGoogle className="w-5 h-5 text-zinc-400 flex-shrink-0" />
        <span className="text-[14px] text-zinc-900 truncate">{brandName || 'your brand'}</span>
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-zinc-400 ml-auto flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
        </svg>
      </div>
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[11px] font-bold text-zinc-600 bg-zinc-100 px-1.5 py-0.5 rounded">Sponsored</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center">
            <span className="text-[10px] font-bold text-indigo-600">{brandName?.[0]?.toUpperCase() || 'B'}</span>
          </div>
          <div>
            <p className="text-[13px] text-zinc-900 font-medium">{brandName}</p>
            <p className="text-[11px] text-zinc-600">{displayUrl}</p>
          </div>
        </div>
        <a href="#" className="block text-[18px] text-[#1a0dab] hover:underline leading-tight mb-1" onClick={(e) => e.preventDefault()}>
          {headline || 'Ad Headline'} - {brandName} | Official Site
        </a>
        <p className="text-[13px] text-zinc-600 leading-relaxed">
          {description || caption || 'Your ad description here.'}{' '}
          {showCta && ctaText && <span className="font-medium text-zinc-800">{ctaText}.</span>}
        </p>
        <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1">
          <a href="#" className="text-[13px] text-[#1a0dab] hover:underline" onClick={(e) => e.preventDefault()}>About Us</a>
          <a href="#" className="text-[13px] text-[#1a0dab] hover:underline" onClick={(e) => e.preventDefault()}>Pricing</a>
          <a href="#" className="text-[13px] text-[#1a0dab] hover:underline" onClick={(e) => e.preventDefault()}>Contact</a>
          <a href="#" className="text-[13px] text-[#1a0dab] hover:underline" onClick={(e) => e.preventDefault()}>Free Trial</a>
        </div>
      </div>
      <hr className="border-zinc-100 mb-4" />
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
