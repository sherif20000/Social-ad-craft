import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { PreviewCanvas } from '@/components/PreviewCanvas';
import { PLATFORM_FORMATS } from '@/lib/constants';
import { Loader2, AlertCircle } from 'lucide-react';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function SharePreview() {
  const { shareId } = useParams();
  const [adData, setAdData] = useState(null);
  const [platform, setPlatform] = useState('facebook');
  const [deviceMode, setDeviceMode] = useState('mobile');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const previewRef = React.useRef(null);

  useEffect(() => {
    axios.get(`${API}/share/${shareId}`)
      .then(res => {
        const { ad_data } = res.data;
        setAdData(ad_data);
        // Platform is stored inside ad_data (not at top level of share doc)
        const savedPlatform = ad_data?.platform || res.data.platform;
        if (savedPlatform) setPlatform(savedPlatform);
      })
      .catch(() => setError('This preview link is invalid or has expired.'))
      .finally(() => setLoading(false));
  }, [shareId]);

  const handlePlatformChange = (p) => {
    setPlatform(p);
    const formats = PLATFORM_FORMATS[p] || [];
    setAdData(prev => {
      const formatExists = formats.some(f => f.id === prev.adFormat);
      return { ...prev, adFormat: formatExists ? prev.adFormat : formats[0]?.id || 'single_image' };
    });
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-zinc-50">
        <div className="flex flex-col items-center gap-3 text-zinc-500">
          <Loader2 className="w-8 h-8 animate-spin" />
          <p className="text-sm font-medium">Loading preview...</p>
        </div>
      </div>
    );
  }

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

  return (
    <div data-testid="share-preview-page" className="h-screen overflow-hidden bg-zinc-50 flex flex-col">
      {/* Banner */}
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
