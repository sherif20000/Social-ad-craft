import React, { useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { MediaUploader } from '@/components/MediaUploader';
import { CTA_OPTIONS, OBJECTIVES, PLATFORM_FORMATS } from '@/lib/constants';
import { Sparkles, Plus, Trash2, Upload, Image as ImageIcon } from 'lucide-react';

const CarouselCardEditor = ({ card, index, onUpdate, onRemove, onImageUpload }) => {
  const inputRef = useRef(null);
  return (
    <div data-testid={`carousel-card-${index}`} className="p-3 bg-zinc-50 rounded-lg border border-zinc-200 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Card {index + 1}</span>
        <button
          data-testid={`remove-card-${index}`}
          onClick={() => onRemove(index)}
          className="text-zinc-400 hover:text-red-500 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
      {/* Image */}
      {card.imageUrl ? (
        <div className="relative rounded-md overflow-hidden h-24 group">
          <img src={card.imageUrl} alt="" className="w-full h-full object-cover" />
          <button
            onClick={() => onUpdate(index, 'imageUrl', '')}
            className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
          >
            <span className="text-white text-[11px] font-medium">Change</span>
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <Input
            value={card.imageUrl}
            onChange={(e) => onUpdate(index, 'imageUrl', e.target.value)}
            placeholder="Paste image URL..."
            className="h-8 text-[12px] bg-white"
          />
          <button
            onClick={() => inputRef.current?.click()}
            className="flex-shrink-0 h-8 w-8 flex items-center justify-center bg-white border border-zinc-200 rounded-md hover:bg-zinc-50 transition-colors"
          >
            <Upload className="w-3.5 h-3.5 text-zinc-500" />
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target?.files?.[0];
              if (file) onImageUpload(file, index);
            }}
          />
        </div>
      )}
      <Input
        value={card.headline}
        onChange={(e) => onUpdate(index, 'headline', e.target.value)}
        placeholder="Card headline"
        className="h-8 text-[12px] bg-white"
      />
      <Input
        value={card.description}
        onChange={(e) => onUpdate(index, 'description', e.target.value)}
        placeholder="Card description"
        className="h-8 text-[12px] bg-white"
      />
    </div>
  );
};

export const AdSidebar = ({
  adData, updateAdData, onMediaUpload, onClearMedia, isUploading,
  selectedPlatform, onObjectiveChange,
  updateCarouselCard, addCarouselCard, removeCarouselCard, onCarouselImageUpload,
}) => {
  const currentObjective = OBJECTIVES.find(o => o.id === adData.objective);
  const showCta = currentObjective?.hasCta !== false;
  const formats = PLATFORM_FORMATS[selectedPlatform] || [];
  const isCarousel = adData.adFormat === 'carousel';

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

      {/* Campaign Objective */}
      <div className="space-y-3 sidebar-section">
        <h3 className="text-xs font-bold tracking-widest uppercase text-zinc-400">Campaign Objective</h3>
        <Select
          data-testid="objective-select"
          value={adData.objective}
          onValueChange={onObjectiveChange}
        >
          <SelectTrigger data-testid="objective-select-trigger" className="h-10 bg-zinc-50 border-zinc-200">
            <SelectValue placeholder="Select objective" />
          </SelectTrigger>
          <SelectContent>
            {OBJECTIVES.map(obj => (
              <SelectItem key={obj.id} value={obj.id}>
                <div className="flex items-center gap-2">
                  <span>{obj.name}</span>
                  {!obj.hasCta && <span className="text-[10px] text-zinc-400 ml-1">No CTA</span>}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {!showCta && (
          <p className="text-[11px] text-amber-600 bg-amber-50 border border-amber-100 rounded-md px-2.5 py-1.5 font-medium">
            {adData.objective === 'awareness' ? 'Reach ads typically don\'t show a CTA button' : 'Engagement ads focus on interactions, CTA is hidden'}
          </p>
        )}
      </div>

      {/* Ad Format */}
      <div className="space-y-3 sidebar-section">
        <h3 className="text-xs font-bold tracking-widest uppercase text-zinc-400">Ad Format</h3>
        <div className="flex flex-wrap gap-1.5">
          {formats.map(fmt => (
            <button
              key={fmt.id}
              data-testid={`format-${fmt.id}`}
              onClick={() => updateAdData('adFormat', fmt.id)}
              className={`px-3 py-1.5 rounded-md text-[12px] font-semibold transition-all ${
                adData.adFormat === fmt.id
                  ? 'bg-zinc-900 text-white shadow-sm'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
              }`}
            >
              {fmt.name}
            </button>
          ))}
        </div>
      </div>

      {/* Brand Identity */}
      <div className="space-y-3 sidebar-section">
        <h3 className="text-xs font-bold tracking-widest uppercase text-zinc-400">Brand Identity</h3>
        <div className="space-y-3">
          <div>
            <Label className="text-xs font-semibold text-zinc-700 mb-1.5 block">Brand Name</Label>
            <Input
              data-testid="brand-name-input"
              value={adData.brandName}
              onChange={(e) => updateAdData('brandName', e.target.value)}
              placeholder="Your Brand"
              className="h-10 bg-zinc-50 border-zinc-200 focus:border-indigo-500 focus:ring-indigo-500/20"
            />
          </div>
          <div>
            <Label className="text-xs font-semibold text-zinc-700 mb-1.5 block">Handle</Label>
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

      {/* Call to Action - only if objective supports it */}
      {showCta && (
        <div className="space-y-3 sidebar-section">
          <h3 className="text-xs font-bold tracking-widest uppercase text-zinc-400">Call to Action</h3>
          <div className="space-y-3">
            <div>
              <Label className="text-xs font-semibold text-zinc-700 mb-1.5 block">CTA Button</Label>
              <Select value={adData.ctaText} onValueChange={(val) => updateAdData('ctaText', val)}>
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
      )}

      {/* Creative - Single Image/Video */}
      {!isCarousel && (
        <div className="space-y-3 sidebar-section">
          <h3 className="text-xs font-bold tracking-widest uppercase text-zinc-400">Creative</h3>
          <MediaUploader
            onUpload={onMediaUpload}
            onClear={onClearMedia}
            isUploading={isUploading}
            currentMediaUrl={adData.mediaUrl}
            mediaType={adData.mediaType}
          />
        </div>
      )}

      {/* Carousel Cards */}
      {isCarousel && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold tracking-widest uppercase text-zinc-400">Carousel Cards</h3>
            <Button
              data-testid="add-carousel-card-btn"
              variant="ghost"
              size="sm"
              onClick={addCarouselCard}
              className="h-7 text-xs text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 gap-1 px-2"
              disabled={adData.carouselCards.length >= 10}
            >
              <Plus className="w-3 h-3" /> Add Card
            </Button>
          </div>
          <div className="space-y-2.5">
            {adData.carouselCards.map((card, i) => (
              <CarouselCardEditor
                key={i}
                card={card}
                index={i}
                onUpdate={updateCarouselCard}
                onRemove={removeCarouselCard}
                onImageUpload={onCarouselImageUpload}
              />
            ))}
          </div>
          {adData.carouselCards.length < 2 && (
            <p className="text-[11px] text-amber-600 bg-amber-50 border border-amber-100 rounded-md px-2.5 py-1.5 font-medium">
              Carousel requires at least 2 cards
            </p>
          )}
        </div>
      )}
    </div>
  );
};
