import React from 'react';
import { PLATFORMS, PLATFORM_FORMATS } from '@/lib/constants';
import { ExportButton } from '@/components/ExportButton';
import { ShareButton } from '@/components/ShareButton';
import { FacebookPreview } from '@/components/previews/FacebookPreview';
import { InstagramPreview } from '@/components/previews/InstagramPreview';
import { TwitterPreview } from '@/components/previews/TwitterPreview';
import { LinkedInPreview } from '@/components/previews/LinkedInPreview';
import { TikTokPreview } from '@/components/previews/TikTokPreview';
import { YouTubePreview } from '@/components/previews/YouTubePreview';
import { PinterestPreview } from '@/components/previews/PinterestPreview';
import { SnapchatPreview } from '@/components/previews/SnapchatPreview';
import { GoogleAdsPreview } from '@/components/previews/GoogleAdsPreview';
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaYoutube, FaPinterest, FaSnapchat, FaGoogle } from 'react-icons/fa6';
import { FaXTwitter } from 'react-icons/fa6';
import { Monitor, Smartphone } from 'lucide-react';

const PLATFORM_ICONS = {
  facebook: FaFacebook,
  instagram: FaInstagram,
  twitter: FaXTwitter,
  linkedin: FaLinkedin,
  tiktok: FaTiktok,
  youtube: FaYoutube,
  pinterest: FaPinterest,
  snapchat: FaSnapchat,
  google: FaGoogle,
};

const PREVIEW_COMPONENTS = {
  facebook: FacebookPreview,
  instagram: InstagramPreview,
  twitter: TwitterPreview,
  linkedin: LinkedInPreview,
  tiktok: TikTokPreview,
  youtube: YouTubePreview,
  pinterest: PinterestPreview,
  snapchat: SnapchatPreview,
  google: GoogleAdsPreview,
};

const PhoneFrame = ({ children, platform }) => (
  <div className="phone-frame">
    <div className="phone-frame-outer">
      <div className="phone-notch" />
      <div className="phone-frame-inner">
        <div className="phone-status-bar">
          <span>9:41</span>
          <div className="flex items-center gap-1">
            <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor"><rect x="0" y="7" width="3" height="5" rx="0.5"/><rect x="4.5" y="4.5" width="3" height="7.5" rx="0.5"/><rect x="9" y="2" width="3" height="10" rx="0.5"/><rect x="13.5" y="0" width="2.5" height="12" rx="0.5"/></svg>
          </div>
        </div>
        <div className="phone-content">{children}</div>
        <div className="phone-home-bar">
          <div className="phone-home-bar-indicator" />
        </div>
      </div>
    </div>
  </div>
);

const BrowserFrame = ({ children, platform }) => {
  const platformData = PLATFORMS.find(p => p.id === platform);
  return (
    <div className="browser-frame">
      <div className="browser-bar">
        <div className="browser-dots">
          <div className="browser-dot" style={{ background: '#EF4444' }} />
          <div className="browser-dot" style={{ background: '#F59E0B' }} />
          <div className="browser-dot" style={{ background: '#22C55E' }} />
        </div>
        <div className="browser-url">{platformData?.name?.toLowerCase()}.com</div>
      </div>
      <div className="browser-content">{children}</div>
    </div>
  );
};

export const PreviewCanvas = ({ adData, selectedPlatform, setSelectedPlatform, deviceMode, setDeviceMode, previewRef }) => {
  const PreviewComponent = PREVIEW_COMPONENTS[selectedPlatform];
  const isVertical = ['tiktok', 'snapchat'].includes(selectedPlatform) ||
    (adData.adFormat === 'story' && ['facebook', 'instagram'].includes(selectedPlatform));
  const currentFormats = PLATFORM_FORMATS[selectedPlatform] || [];
  const currentFormatName = currentFormats.find(f => f.id === adData.adFormat)?.name || adData.adFormat;

  return (
    <div data-testid="preview-canvas" className="flex flex-col h-full">
      {/* Top Bar */}
      <div className="border-b border-zinc-200 bg-white px-6 py-4 flex items-center justify-between gap-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          {/* Device Toggle */}
          <div data-testid="device-toggle" className="flex items-center bg-zinc-100 rounded-lg p-0.5">
            <button
              data-testid="mobile-toggle"
              onClick={() => setDeviceMode('mobile')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                deviceMode === 'mobile'
                  ? 'bg-white text-zinc-900 shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-700'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              Mobile
            </button>
            <button
              data-testid="desktop-toggle"
              onClick={() => setDeviceMode('desktop')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                deviceMode === 'desktop'
                  ? 'bg-white text-zinc-900 shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-700'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              Desktop
            </button>
          </div>
        </div>

        <ExportButton previewRef={previewRef} platform={selectedPlatform} />
        <ShareButton adData={adData} selectedPlatform={selectedPlatform} />
      </div>

      {/* Platform Tabs */}
      <div className="border-b border-zinc-200 bg-white px-6 flex-shrink-0">
        <div className="platform-tabs-scroll flex gap-1 py-2">
          {PLATFORMS.map((platform) => {
            const Icon = PLATFORM_ICONS[platform.id];
            const isActive = selectedPlatform === platform.id;
            // Some brand colors (e.g. Snapchat yellow, TikTok black) are invisible on white → use safe contrast color
            const iconBg = platform.id === 'snapchat' ? '#F59E0B' : platform.color;
            return (
              <button
                key={platform.id}
                data-testid={`platform-tab-${platform.id}`}
                onClick={() => setSelectedPlatform(platform.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-zinc-900 text-white shadow-sm'
                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                }`}
              >
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    backgroundColor: isActive ? 'rgba(255,255,255,0.15)' : iconBg + '20',
                    color: isActive ? 'white' : iconBg,
                  }}
                >
                  <Icon className="w-3 h-3" />
                </span>
                {platform.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Format + Objective Indicator + Platform Logo */}
      <div className="px-6 py-2 bg-white border-b border-zinc-100 flex items-center justify-between gap-2 flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">Preview:</span>
          <span data-testid="format-badge" className="text-[11px] font-bold bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded">{currentFormatName}</span>
          {adData.objective && (
            <span data-testid="objective-badge" className={`text-[11px] font-bold px-2 py-0.5 rounded ${
              ['awareness', 'engagement'].includes(adData.objective)
                ? 'bg-amber-50 text-amber-700'
                : 'bg-indigo-50 text-indigo-700'
            }`}>
              {adData.objective.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </span>
          )}
        </div>
        {/* Platform Logo Badge */}
        {(() => {
          const platformData = PLATFORMS.find(p => p.id === selectedPlatform);
          const Icon = PLATFORM_ICONS[selectedPlatform];
          return platformData && Icon ? (
            <div
              data-testid="platform-logo-badge"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-white text-[11px] font-bold shadow-sm"
              style={{ backgroundColor: platformData.color === '#FFFC00' ? '#FFC300' : platformData.color }}
            >
              <Icon className="w-3 h-3" />
              {platformData.name}
            </div>
          ) : null;
        })()}
      </div>

      {/* Preview Area */}
      <div className="flex-1 flex items-start justify-center p-8 overflow-y-auto">
        <div ref={previewRef} className="preview-transition animate-fade-in-up" key={`${selectedPlatform}-${deviceMode}`}>
          {deviceMode === 'mobile' ? (
            <PhoneFrame platform={selectedPlatform}>
              <PreviewComponent adData={adData} isMobile={true} />
            </PhoneFrame>
          ) : (
            <BrowserFrame platform={selectedPlatform}>
              <PreviewComponent adData={adData} isMobile={false} />
            </BrowserFrame>
          )}
        </div>
      </div>
    </div>
  );
};
