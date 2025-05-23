// src/TextBlock.tsx
import React, { useState, useRef, useEffect } from 'react';

interface TextBlockProps {
  blockId: string;
  value: string;
  position: { x: number; y: number };
  dimensions: { width: number; height: number };
  onContentChange: (id: string, updatedProps: Partial<TextBlockData>) => void;
}

interface TextBlockData { // For onContentChange type
  id: string;
  type: 'text';
  position: { x: number; y: number };
  dimensions: { width: number; height: number };
  value: string;
}

const TextBlock: React.FC<TextBlockProps> = ({
  blockId,
  value,
  onContentChange,
  dimensions,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  // Set initial text when the component mounts or value prop changes
  useEffect(() => {
    if (textRef.current && !isEditing) {
      textRef.current.innerText = value;
    }
  }, [value, isEditing]);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (textRef.current) {
      const newText = textRef.current.innerText;
      // Only update if text has actually changed to avoid unnecessary re-renders
      if (newText !== value) {
        onContentChange(blockId, { value: newText });
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // Prevent default 'Enter' key behavior (usually adds a new line)
    // We want 'Enter' to exit editing if not holding Shift
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      textRef.current?.blur(); // Force blur to trigger handleBlur
    }
  };

  return (
    <div
      ref={textRef}
      contentEditable={isEditing}
      onDoubleClick={handleDoubleClick}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      suppressContentEditableWarning={true} // Suppress React warning for contentEditable
      style={{
        width: '100%',
        height: '100%',
        border: isEditing ? '1px dashed blue' : '1px solid transparent',
        padding: '5px',
        minHeight: '20px', // Ensure it has some height even if empty
        overflow: 'hidden',
        resize: 'none', // Prevent native resizing for textareas if this were one
        whiteSpace: 'pre-wrap', // Preserve whitespace and enable wrapping
        wordBreak: 'break-word', // Break long words
        backgroundColor: isEditing ? 'rgba(255,255,255,0.9)' : 'transparent',
        color: '#333', // Default text color
        boxSizing: 'border-box',
        cursor: isEditing ? 'text' : 'grab', // Cursor for editing vs dragging
      }}
    >
      {/* Text content is managed by innerText via ref, not children */}
    </div>
  );
};

export default TextBlock;