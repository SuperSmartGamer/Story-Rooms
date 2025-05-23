// src/DraggableResizableWrapper.tsx
import React, { useRef, useState, useEffect } from 'react';

interface DraggableResizableWrapperProps {
  id: string; // ID of the content block it wraps
  initialPosition: { x: number; y: number };
  initialDimensions: { width: number; height: number };
  onPositionChange: (id: string, newPosition: { x: number; y: number }) => void;
  children: React.ReactNode; // The actual content component (DrawingCanvas, TextBlock, ImageBlock)
}

const DraggableResizableWrapper: React.FC<DraggableResizableWrapperProps> = ({
  id,
  initialPosition,
  initialDimensions,
  onPositionChange,
  children,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 }); // Offset from mouse click to element top-left
  const elementRef = useRef<HTMLDivElement>(null);

  // When mouse is pressed down on the element
  const handleMouseDown = (e: React.MouseEvent) => {
    // We only want to drag if it's the main element, not nested buttons/inputs
    if (e.target !== elementRef.current) {
        // This check prevents dragging when clicking inside a text input or a button
        // You might need more sophisticated logic here if you have complex nested elements
        return;
    }

    setIsDragging(true);
    // Calculate the offset from the mouse pointer to the element's top-left corner
    const rect = elementRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
    e.stopPropagation(); // Prevent event from bubbling up to parent elements
  };

  // Effect to handle mouse movements and releases globally
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      // Calculate new position based on mouse position and original offset
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;

      // Update the parent component's position
      onPositionChange(id, { x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    // Add event listeners to the window so we can track drag even if mouse leaves the element
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Clean up event listeners when the component unmounts or dragging stops
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, id, onPositionChange]); // Dependencies for useEffect

  return (
    <div
      ref={elementRef}
      onMouseDown={handleMouseDown}
      style={{
        position: 'absolute',
        left: initialPosition.x,
        top: initialPosition.y,
        width: initialDimensions.width,
        height: initialDimensions.height,
        cursor: isDragging ? 'grabbing' : 'grab', // Change cursor for dragging
        zIndex: isDragging ? 100 : 1, // Bring dragged element to front
      }}
    >
      {children}
    </div>
  );
};

export default DraggableResizableWrapper;