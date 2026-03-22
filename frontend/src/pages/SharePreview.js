import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PreviewCanvas } from '@/components/PreviewCanvas';
import { PLATFORM_FORMATS } from '@/lib/constants';
import { AlertCircle } from 'lucide-react';

const decodeShareData = (encoded) => {
  try {
    return JSON.parse(decodeURIComponent(escape(atob(encoded))));
  } catch {
    return null;
  }
};

export default function SharePreview() {
  const [searchParams] = useSearchParams();
  const [adData, setAdData] = useState(null);
  const [platform, setPlatform] = useState('facebook');
  const [deviceMode, setDeviceMode] = useState('mobile');
  const [error, setError] = useState(null);
  const previewRef = React.useRef(null);

  useEffect(() => {
    const encoded = searchParams.get('d');
    if (!encoded) {
      setError('This preview link is invalid or has expired.');
      return;
    }
    const data = decodeShareData(encoded);
    if (!data) {
      setError('This preview link is invalid or has expired.');
      return;
    }
    const { platform: savedPlatform, ...rest } = data;
    setAdData(rest);
    if (savedPlatform) setPlatform(savedPlatform);
  }, [searchParams]);

  const handlePlatformChange = (p) => {
    setPlatform(p);
    const formats = PLATFORM_FORMATS[p] || [];
    setAdData(prev => {
      const formatExists = formats.some(f => f.id === prev.adFormat);
      return { ...prev, adFormat: formatExists ? prev.adFormat : formats[0]?.id || 'single_image' };
    });
  };

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-zinc-50">
        <div className="flex flex-col items-center gap-3 text-zinc-500 max-w-sm text-center">
          <AlertCircle className="w-10 h-10 text-red-400" />
          <p className="text-base font-semibold text-zinc-700">Preview Not Found</p>
          <p className="text-sm">{error}</p>
          <a href="/" className="mt-2 text-sm text-indigo-600 hover:underline font-medium">Create your own ad preview</a>
        </div>
      </div>
    );
  }

  if (!adData) {
    return null;
  }

  return (
    <div data-testid="share-preview-page" className="h-screen overflow-hidden bg-zinc-50 flex flex-col">
      <div className="bg-zinc-900 text-white text-center py-2.5 px-4 flex items-center justify-center gap-3 text-sm flex-shrink-0">
        <span className="font-semibold">AdVantage Studio</span>
        <span className="text-zinc-400">—</span>
        <span className="text-zinc-300">Shared Ad Preview</span>
        <a href="/" className="ml-4 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-3 py-1 rounded-md transition-colors">
          Create Your Own
        </a>
      </div>
      <div className="flex-1 overflow-hidden">
        <PreviewCanvas
          adData={adData}
          selectedPlatform={platform}
          setSelectedPlatform={handlePlatformChange}
          deviceMode={deviceMode}
          setDeviceMode={setDeviceMode}
          previewRef={previewRef}
        />
      </div>
    </div>
  );
}
