import React from 'react';
import { PLATFORMS } from '@/lib/constants';
import { ExportButton } from '@/components/ExportButton';
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
import { Button } from '@/components/ui/button';

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
  const isVertical = ['tiktok', 'snapchat'].includes(selectedPlatform);

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
      </div>

      {/* Platform Tabs */}
      <div className="border-b border-zinc-200 bg-white px-6 flex-shrink-0">
        <div className="platform-tabs-scroll flex gap-1 py-2">
          {PLATFORMS.map((platform) => {
            const Icon = PLATFORM_ICONS[platform.id];
            const isActive = selectedPlatform === platform.id;
            return (
              <button
                key={platform.id}
                data-testid={`platform-tab-${platform.id}`}
                onClick={() => setSelectedPlatform(platform.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-zinc-900 text-white shadow-sm'
                    : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5" style={isActive ? {} : { color: platform.color }} />
                {platform.name}
              </button>
            );
          })}
        </div>
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
