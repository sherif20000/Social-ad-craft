import React, { useState } from 'react';
import html2canvas from 'html2canvas';
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
  return html2canvas(node, {
    scale: 2,
    useCORS: true,
    allowTaint: false,
    backgroundColor: null,
    logging: false,
  });
};

export const ExportButton = ({ previewRef, platform }) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPng = async () => {
    if (!previewRef?.current) {
      toast.error('Preview not ready. Please wait and try again.');
      return;
    }
    setIsExporting(true);
    try {
      const canvas = await captureElement(previewRef.current);
      const link = document.createElement('a');
      link.download = `ad-preview-${platform}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      toast.success('PNG downloaded successfully');
    } catch (err) {
      console.error('PNG export failed:', err);
      toast.error('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportPdf = async () => {
    if (!previewRef?.current) {
      toast.error('Preview not ready. Please wait and try again.');
      return;
    }
    setIsExporting(true);
    try {
      const canvas = await captureElement(previewRef.current);
      const imgData = canvas.toDataURL('image/png');
      const pxToMm = 0.264583;
      const width = canvas.width * pxToMm;
      const height = canvas.height * pxToMm;
      const pdf = new jsPDF({
        orientation: width > height ? 'landscape' : 'portrait',
        unit: 'mm',
        format: [width, height],
      });
      pdf.addImage(imgData, 'PNG', 0, 0, width, height);
      pdf.save(`ad-preview-${platform}.pdf`);
      toast.success('PDF downloaded successfully');
    } catch (err) {
      console.error('PDF export failed:', err);
      toast.error('PDF export failed. Please try again.');
    } finally {
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
