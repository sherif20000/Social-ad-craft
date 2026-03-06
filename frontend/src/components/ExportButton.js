import React, { useState } from 'react';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';
import { Download, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from '@/components/ui/sonner';

const captureElement = async (node) => {
  const options = { quality: 0.95, pixelRatio: 2 };
  // First call warms up the image cache (may fail silently on CORS images)
  try { await toPng(node, options); } catch {}
  // Second call uses the warmed cache and produces clean output
  return toPng(node, options);
};

export const ExportButton = ({ previewRef, platform }) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPng = async () => {
    if (!previewRef?.current) {
      toast.error('Preview not ready. Please wait a moment and try again.');
      return;
    }
    setIsExporting(true);
    try {
      const dataUrl = await captureElement(previewRef.current);
      const link = document.createElement('a');
      link.download = `ad-preview-${platform}.png`;
      link.href = dataUrl;
      link.click();
      toast.success('PNG downloaded');
    } catch (err) {
      console.error('PNG export failed:', err);
      toast.error('Export failed. Try switching to a different platform and back, then retry.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportPdf = async () => {
    if (!previewRef?.current) {
      toast.error('Preview not ready. Please wait a moment and try again.');
      return;
    }
    setIsExporting(true);
    try {
      const dataUrl = await captureElement(previewRef.current);
      const img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        const pxToMm = 0.264583;
        const width = img.width * pxToMm;
        const height = img.height * pxToMm;
        const pdf = new jsPDF({
          orientation: width > height ? 'landscape' : 'portrait',
          unit: 'mm',
          format: [width, height],
        });
        pdf.addImage(dataUrl, 'PNG', 0, 0, width, height);
        pdf.save(`ad-preview-${platform}.pdf`);
        toast.success('PDF downloaded');
        setIsExporting(false);
      };
      img.onerror = () => {
        toast.error('PDF export failed');
        setIsExporting(false);
      };
    } catch (err) {
      console.error('PDF export failed:', err);
      toast.error('Export failed. Try again.');
      setIsExporting(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          data-testid="export-btn"
          className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2 rounded-lg px-5 shadow-lg shadow-indigo-600/20"
          disabled={isExporting}
        >
          {isExporting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Download className="w-4 h-4" />
          )}
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem data-testid="export-png-btn" onClick={handleExportPng}>
          Download as PNG
        </DropdownMenuItem>
        <DropdownMenuItem data-testid="export-pdf-btn" onClick={handleExportPdf}>
          Download as PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
