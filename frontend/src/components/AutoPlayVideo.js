import React, { useRef, useEffect } from 'react';

export const AutoPlayVideo = ({ src, className }) => {
  const ref = useRef(null);
  useEffect(() => {
    const video = ref.current;
    if (video) {
      video.muted = true;
      video.play().catch(() => {});
    }
  }, [src]);
  return <video ref={ref} src={src} className={className} autoPlay loop playsInline muted />;
};
