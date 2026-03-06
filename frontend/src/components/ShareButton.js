import React, { useState } from 'react';
import { Link2, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const ShareButton = ({ adData, selectedPlatform }) => {
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${API}/share`, {
        ...adData,
        platform: selectedPlatform,
      });
      const shareUrl = `${window.location.origin}/share/${res.data.id}`;
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success('Shareable link copied to clipboard!', { description: shareUrl });
      setTimeout(() => setCopied(false), 3000);
    } catch {
      toast.error('Failed to generate share link. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      data-testid="share-btn"
      variant="outline"
      onClick={handleShare}
      disabled={loading}
      className="gap-2 rounded-lg border-zinc-200 hover:border-indigo-400 hover:text-indigo-600 transition-all"
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : copied ? (
        <Check className="w-4 h-4 text-emerald-500" />
      ) : (
        <Link2 className="w-4 h-4" />
      )}
      {copied ? 'Copied!' : 'Share'}
    </Button>
  );
};
