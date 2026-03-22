import React, { useState } from 'react';
import { Link2, Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';

const copyToClipboard = async (text) => {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {}
  }
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

// Encode ad state to a URL-safe base64 string.
// Blob URLs (from local file uploads) are excluded since they don't survive outside the current session.
const encodeShareData = (adData, platform) => {
  const shareable = {
    ...adData,
    platform,
    // Strip blob: URLs — they are local to this browser session and cannot be shared
    mediaUrl: adData.mediaUrl?.startsWith('blob:') ? '' : (adData.mediaUrl || ''),
    carouselCards: adData.carouselCards.map(card => ({
      ...card,
      imageUrl: card.imageUrl?.startsWith('blob:') ? '' : (card.imageUrl || ''),
    })),
  };
  return btoa(unescape(encodeURIComponent(JSON.stringify(shareable))));
};

export const ShareButton = ({ adData, selectedPlatform }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      const encoded = encodeShareData(adData, selectedPlatform);
      const shareUrl = `${window.location.origin}/share?d=${encoded}`;
      const didCopy = await copyToClipboard(shareUrl);
      setCopied(true);
      if (didCopy) {
        toast.success('Link copied to clipboard!');
      } else {
        toast.success('Share link ready', { description: `Copy this link: ${shareUrl}` });
      }
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Share error:', err);
      toast.error('Failed to create share link. Please try again.');
    }
  };

  return (
    <Button
      data-testid="share-btn"
      variant="outline"
      onClick={handleShare}
      className="gap-2 rounded-lg border-zinc-200 hover:border-indigo-400 hover:text-indigo-600 transition-all"
    >
      {copied ? (
        <Check className="w-4 h-4 text-emerald-500" />
      ) : (
        <Link2 className="w-4 h-4" />
      )}
      {copied ? 'Copied!' : 'Share'}
    </Button>
  );
};
