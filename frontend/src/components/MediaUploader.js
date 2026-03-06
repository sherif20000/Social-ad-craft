import React, { useCallback, useState, useRef } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';

export const MediaUploader = ({ onUpload, onClear, isUploading, currentMediaUrl, mediaType }) => {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer?.files?.[0];
    if (file && (file.type.startsWith('image/') || file.type.startsWith('video/'))) {
      onUpload(file);
    }
  }, [onUpload]);

  const handleFileInput = useCallback((e) => {
    const file = e.target?.files?.[0];
    if (file) onUpload(file);
  }, [onUpload]);

  if (currentMediaUrl) {
    return (
      <div data-testid="media-preview" className="relative rounded-xl overflow-hidden border border-zinc-200 group">
        {mediaType === 'video' ? (
          <video src={currentMediaUrl} className="w-full h-44 object-cover" controls={false} muted />
        ) : (
          <img src={currentMediaUrl} alt="Ad creative" className="w-full h-44 object-cover" />
        )}
        <div className="absolute inset-0 bg-zinc-900/0 group-hover:bg-zinc-900/30 transition-colors" />
        <button
          data-testid="clear-media-btn"
          onClick={onClear}
          className="absolute top-2 right-2 bg-zinc-900/80 hover:bg-zinc-900 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div
      data-testid="media-upload-zone"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
        isDragging
          ? 'border-indigo-500 bg-indigo-50/50'
          : 'border-zinc-200 hover:border-zinc-300 bg-zinc-50/50'
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*,video/*"
        onChange={handleFileInput}
        className="hidden"
        data-testid="media-file-input"
      />
      {isUploading ? (
        <Loader2 className="w-8 h-8 mx-auto mb-3 text-indigo-500 animate-spin" />
      ) : (
        <Upload className="w-8 h-8 mx-auto mb-3 text-zinc-400" />
      )}
      <p className="text-sm font-medium text-zinc-600">
        {isUploading ? 'Uploading...' : 'Drop visuals here'}
      </p>
      <p className="text-xs text-zinc-400 mt-1">JPG, PNG, GIF, MP4, WebM</p>
    </div>
  );
};
