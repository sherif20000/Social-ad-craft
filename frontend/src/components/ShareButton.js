import React, { useState } from 'react';
import { Link2, Check, Loader2, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const copyToClipboard = async (text) => {
  // Try modern clipboard API first
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {}
  }
  // Fallback: textarea + execCommand
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0';
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  const ok = document.execCommand('copy');
  document.body.removeChild(ta);
  return ok;
};

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
      const didCopy = await copyToClipboard(shareUrl);
      setCopied(true);
      if (didCopy) {
        toast.success('Link copied to clipboard!', { description: shareUrl });
      } else {
        toast.success('Share link created!', { description: `Copy this link: ${shareUrl}` });
      }
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Share error:', err);
      toast.error('Failed to create share link. Please try again.');
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
