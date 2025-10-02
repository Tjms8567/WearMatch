'use client';
import { motion } from 'framer-motion';
import React, { useMemo } from 'react';

export interface ProductPreviewProps {
  imageUrl: string;
  overlayColor?: string;
  designSvg?: string;
  grayscale?: boolean;
  height?: number;
}

export default function ProductPreview({ imageUrl, overlayColor, designSvg, grayscale = false, height = 192 }: ProductPreviewProps) {
  const overlayStyle = useMemo(() => ({ background: overlayColor || 'transparent' }), [overlayColor]);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative w-full overflow-hidden rounded-lg bg-gray-50"
      style={{ height }}
    >
      <img
        src={imageUrl}
        loading="lazy"
        alt="preview"
        className={`absolute inset-0 w-full h-full object-cover ${grayscale ? 'grayscale' : ''}`}
      />
      {overlayColor && (
        <div className="absolute inset-0 mix-blend-multiply opacity-50" style={overlayStyle} />
      )}
      {designSvg && (
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          dangerouslySetInnerHTML={{ __html: designSvg }}
        />
      )}
    </motion.div>
  );
}
