import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MediaUploader } from '@/components/MediaUploader';
import { CTA_OPTIONS } from '@/lib/constants';
import { Sparkles } from 'lucide-react';

export const AdSidebar = ({ adData, updateAdData, onMediaUpload, onClearMedia, isUploading }) => {
  return (
    <div data-testid="ad-sidebar" className="p-6 space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-zinc-100">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-zinc-900 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-zinc-900">AdVantage Studio</h1>
            <p className="text-xs text-zinc-400 font-medium">Ad preview & visualization</p>
          </div>
        </div>
      </div>

      {/* Brand Identity */}
      <div className="space-y-3 sidebar-section">
        <h3 className="text-xs font-bold tracking-widest uppercase text-zinc-400">Brand Identity</h3>
        <div className="space-y-3">
          <div>
            <Label data-testid="brand-name-label" className="text-xs font-semibold text-zinc-700 mb-1.5 block">Brand Name</Label>
            <Input
              data-testid="brand-name-input"
              value={adData.brandName}
              onChange={(e) => updateAdData('brandName', e.target.value)}
              placeholder="Your Brand"
              className="h-10 bg-zinc-50 border-zinc-200 focus:border-indigo-500 focus:ring-indigo-500/20"
            />
          </div>
          <div>
            <Label data-testid="brand-handle-label" className="text-xs font-semibold text-zinc-700 mb-1.5 block">Handle</Label>
            <Input
              data-testid="brand-handle-input"
              value={adData.brandHandle}
              onChange={(e) => updateAdData('brandHandle', e.target.value)}
              placeholder="@yourbrand"
              className="h-10 bg-zinc-50 border-zinc-200 focus:border-indigo-500 focus:ring-indigo-500/20"
            />
          </div>
          <div>
            <Label className="text-xs font-semibold text-zinc-700 mb-1.5 block">Profile Image URL</Label>
            <Input
              data-testid="profile-image-input"
              value={adData.profileImage}
              onChange={(e) => updateAdData('profileImage', e.target.value)}
              placeholder="https://example.com/avatar.jpg"
              className="h-10 bg-zinc-50 border-zinc-200 focus:border-indigo-500 focus:ring-indigo-500/20"
            />
          </div>
        </div>
      </div>

      {/* Ad Copy */}
      <div className="space-y-3 sidebar-section">
        <h3 className="text-xs font-bold tracking-widest uppercase text-zinc-400">Ad Copy</h3>
        <div className="space-y-3">
          <div>
            <Label className="text-xs font-semibold text-zinc-700 mb-1.5 block">Caption</Label>
            <Textarea
              data-testid="caption-input"
              value={adData.caption}
              onChange={(e) => updateAdData('caption', e.target.value)}
              placeholder="Write your ad caption..."
              rows={3}
              className="bg-zinc-50 border-zinc-200 focus:border-indigo-500 focus:ring-indigo-500/20 resize-none"
            />
          </div>
          <div>
            <Label className="text-xs font-semibold text-zinc-700 mb-1.5 block">Headline</Label>
            <Input
              data-testid="headline-input"
              value={adData.headline}
              onChange={(e) => updateAdData('headline', e.target.value)}
              placeholder="Ad headline"
              className="h-10 bg-zinc-50 border-zinc-200 focus:border-indigo-500 focus:ring-indigo-500/20"
            />
          </div>
          <div>
            <Label className="text-xs font-semibold text-zinc-700 mb-1.5 block">Description</Label>
            <Textarea
              data-testid="description-input"
              value={adData.description}
              onChange={(e) => updateAdData('description', e.target.value)}
              placeholder="Ad description..."
              rows={2}
              className="bg-zinc-50 border-zinc-200 focus:border-indigo-500 focus:ring-indigo-500/20 resize-none"
            />
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="space-y-3 sidebar-section">
        <h3 className="text-xs font-bold tracking-widest uppercase text-zinc-400">Call to Action</h3>
        <div className="space-y-3">
          <div>
            <Label className="text-xs font-semibold text-zinc-700 mb-1.5 block">CTA Button</Label>
            <Select
              data-testid="cta-select"
              value={adData.ctaText}
              onValueChange={(val) => updateAdData('ctaText', val)}
            >
              <SelectTrigger data-testid="cta-select-trigger" className="h-10 bg-zinc-50 border-zinc-200">
                <SelectValue placeholder="Select CTA" />
              </SelectTrigger>
              <SelectContent>
                {CTA_OPTIONS.map(opt => (
                  <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs font-semibold text-zinc-700 mb-1.5 block">Destination URL</Label>
            <Input
              data-testid="cta-link-input"
              value={adData.ctaLink}
              onChange={(e) => updateAdData('ctaLink', e.target.value)}
              placeholder="yourbrand.com"
              className="h-10 bg-zinc-50 border-zinc-200 focus:border-indigo-500 focus:ring-indigo-500/20"
            />
          </div>
        </div>
      </div>

      {/* Creative */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold tracking-widest uppercase text-zinc-400">Creative</h3>
        <MediaUploader
          onUpload={onMediaUpload}
          onClear={onClearMedia}
          isUploading={isUploading}
          currentMediaUrl={adData.mediaUrl}
          mediaType={adData.mediaType}
        />
      </div>
    </div>
  );
};
