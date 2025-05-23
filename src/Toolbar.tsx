// src/Toolbar.tsx
import React from 'react';

interface ToolbarProps {
  activeTool: 'pen' | 'eraser';
  brushColor: string;
  brushThickness: number;
  onToolChange: (tool: 'pen' | 'eraser') => void;
  onBrushColorChange: (color: string) => void;
  onBrushThicknessChange: (thickness: number) => void;
  onAddDrawing: () => void;
  onAddText: () => void;
  onAddImage: (file: File) => void;
  onAddImageUrl: (url: string) => void; // For adding image by URL
}

const Toolbar: React.FC<ToolbarProps> = ({
  activeTool,
  brushColor,
  brushThickness,
  onToolChange,
  onBrushColorChange,
  onBrushThicknessChange,
  onAddDrawing,
  onAddText,
  onAddImage,
  onAddImageUrl,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onAddImage(e.target.files[0]);
      e.target.value = ''; // Clear the input field after selection
    }
  };

  const handleImageUrlSubmit = () => {
    const url = prompt("Enter image URL:");
    if (url) {
      onAddImageUrl(url);
    }
  };

  return (
    <div style={{
      padding: '10px',
      borderBottom: '1px solid #ccc',
      marginBottom: '10px',
      display: 'flex',
      flexWrap: 'wrap', // Allow items to wrap on smaller screens
      gap: '10px',
      backgroundColor: '#eee', // Light background for toolbar
      borderRadius: '5px',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {/* Tool Selection */}
      <button
        onClick={() => onToolChange('pen')}
        style={{ backgroundColor: activeTool === 'pen' ? '#4CAF50' : '#1a1a1a', color: 'white' }}
      >
        Pen
      </button>
      <button
        onClick={() => onToolChange('eraser')}
        style={{ backgroundColor: activeTool === 'eraser' ? '#f44336' : '#1a1a1a', color: 'white' }}
      >
        Eraser
      </button>

      {/* Brush Color */}
      <label style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#333' }}>
        Color:
        <input
          type="color"
          value={brushColor}
          onChange={(e) => onBrushColorChange(e.target.value)}
          style={{ width: '40px', height: '30px', border: 'none', padding: '0' }}
        />
      </label>

      {/* Brush Thickness */}
      <label style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#333' }}>
        Thickness:
        <input
          type="range"
          min="1"
          max="10"
          value={brushThickness}
          onChange={(e) => onBrushThicknessChange(Number(e.target.value))}
          style={{ width: '80px' }}
        />
        <span>{brushThickness}</span>
      </label>

      {/* Add Content Buttons */}
      <button onClick={onAddDrawing}>Add Drawing Area</button>
      <button onClick={onAddText}>Add Text Box</button>

      <label className="image-upload-button" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <button onClick={() => document.getElementById('image-file-input')?.click()}>Upload Image</button>
        <input
          id="image-file-input"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </label>
      <button onClick={handleImageUrlSubmit}>Add Image by URL</button>
    </div>
  );
};

export default Toolbar;