import React, { useState, useRef, useCallback, useEffect } from 'react';
import { AdSidebar } from '@/components/AdSidebar';
import { PreviewCanvas } from '@/components/PreviewCanvas';
import { DEFAULT_AD_DATA, PLATFORM_FORMATS, OBJECTIVES } from '@/lib/constants';
import { Toaster, toast } from '@/components/ui/sonner';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Dashboard() {
  const [adData, setAdData] = useState(DEFAULT_AD_DATA);
  const [selectedPlatform, setSelectedPlatform] = useState('facebook');
  const [deviceMode, setDeviceMode] = useState('mobile');
  const [isUploading, setIsUploading] = useState(false);
  const previewRef = useRef(null);

  const updateAdData = useCallback((field, value) => {
    setAdData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handlePlatformChange = useCallback((platform) => {
    setSelectedPlatform(platform);
    const formats = PLATFORM_FORMATS[platform] || [];
    setAdData(prev => {
      const currentFormat = prev.adFormat;
      const formatExists = formats.some(f => f.id === currentFormat);
      return { ...prev, adFormat: formatExists ? currentFormat : formats[0]?.id || 'single_image' };
    });
  }, []);

  const handleObjectiveChange = useCallback((objective) => {
    const obj = OBJECTIVES.find(o => o.id === objective);
    setAdData(prev => ({
      ...prev,
      objective,
      ctaText: obj?.hasCta ? (obj.defaultCta || prev.ctaText) : prev.ctaText,
    }));
  }, []);

  const updateCarouselCard = useCallback((index, field, value) => {
    setAdData(prev => {
      const cards = [...prev.carouselCards];
      cards[index] = { ...cards[index], [field]: value };
      return { ...prev, carouselCards: cards };
    });
  }, []);

  const addCarouselCard = useCallback(() => {
    setAdData(prev => ({
      ...prev,
      carouselCards: [...prev.carouselCards, { imageUrl: '', headline: '', description: '' }],
    }));
  }, []);

  const removeCarouselCard = useCallback((index) => {
    setAdData(prev => ({
      ...prev,
      carouselCards: prev.carouselCards.filter((_, i) => i !== index),
    }));
  }, []);

  const handleMediaUpload = useCallback(async (file) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await axios.post(`${API}/upload`, formData);
      const mediaUrl = `${API}/files/${response.data.storage_path}`;
      setAdData(prev => ({
        ...prev,
        mediaUrl,
        mediaType: file.type.startsWith('video') ? 'video' : 'image',
      }));
      toast.success('Media uploaded successfully');
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error('Failed to upload media');
    } finally {
      setIsUploading(false);
    }
  }, []);

  const handleCarouselImageUpload = useCallback(async (file, cardIndex) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await axios.post(`${API}/upload`, formData);
      const mediaUrl = `${API}/files/${response.data.storage_path}`;
      updateCarouselCard(cardIndex, 'imageUrl', mediaUrl);
      toast.success(`Card ${cardIndex + 1} image uploaded`);
    } catch (error) {
      toast.error('Upload failed');
    }
  }, [updateCarouselCard]);

  const handleClearMedia = useCallback(() => {
    setAdData(prev => ({ ...prev, mediaUrl: '', mediaType: 'image' }));
  }, []);

  return (
    <div data-testid="dashboard" className="h-screen overflow-hidden bg-white">
      <Toaster position="top-right" />
      <div className="grid grid-cols-1 lg:grid-cols-12 h-full">
        <div className="lg:col-span-4 xl:col-span-3 border-r border-zinc-200 bg-white h-full overflow-y-auto sidebar-scroll">
          <AdSidebar
            adData={adData}
            updateAdData={updateAdData}
            onMediaUpload={handleMediaUpload}
            onClearMedia={handleClearMedia}
            isUploading={isUploading}
            selectedPlatform={selectedPlatform}
            onObjectiveChange={handleObjectiveChange}
            updateCarouselCard={updateCarouselCard}
            addCarouselCard={addCarouselCard}
            removeCarouselCard={removeCarouselCard}
            onCarouselImageUpload={handleCarouselImageUpload}
          />
        </div>
        <div className="lg:col-span-8 xl:col-span-9 bg-zinc-50/50 h-full overflow-y-auto">
          <PreviewCanvas
            adData={adData}
            selectedPlatform={selectedPlatform}
            setSelectedPlatform={handlePlatformChange}
            deviceMode={deviceMode}
            setDeviceMode={setDeviceMode}
            previewRef={previewRef}
          />
        </div>
      </div>
    </div>
  );
}
