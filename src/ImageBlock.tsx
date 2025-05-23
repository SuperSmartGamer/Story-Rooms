// src/ImageBlock.tsx
import React from 'react';

interface ImageBlockProps {
  blockId: string;
  url: string;
  position: { x: number; y: number };
  dimensions: { width: number; height: number };
  // onContentChange is not strictly needed for image URL unless editing is allowed later
}

const ImageBlock: React.FC<ImageBlockProps> = ({ url }) => {
  return (
    <img
      src={url}
      alt="Whiteboard Image"
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'contain', // Scales image to fit without cropping
        display: 'block', // Remove extra space below image
        border: '1px solid #ccc',
        boxSizing: 'border-box',
      }}
    />
  );
};

export default ImageBlock;