// src/DrawingCanvas.tsx
import React, { useRef, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface StrokeObject {
  id: string;
  points: { x: number; y: number }[];
  color: string;
  thickness: number;
  tool: 'pen' | 'eraser';
}

interface DrawingCanvasProps {
  blockId: string;
  drawingData: { strokes: StrokeObject[] };
  activeTool: 'pen' | 'eraser';
  brushColor: string;
  brushThickness: number;
  position: { x: number; y: number }; // Relative to Whiteboard
  dimensions: { width: number; height: number };
  onDrawingChange: (id: string, updatedProps: Partial<DrawingBlock>) => void;
}

interface DrawingBlock { // Define DrawingBlock here for onDrawingChange type
  id: string;
  type: 'drawing';
  position: { x: number; y: number };
  dimensions: { width: number; height: number };
  drawingData: {
    strokes: StrokeObject[];
  };
}


const DrawingCanvas: React.FC<DrawingCanvasProps> = ({
  blockId,
  drawingData,
  activeTool,
  brushColor,
  brushThickness,
  position,
  dimensions,
  onDrawingChange,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentStroke, setCurrentStroke] = useState<StrokeObject | null>(null);

  // Effect to set up canvas context and redraw all strokes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    // Clear the canvas before redrawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Redraw all existing strokes
    drawingData.strokes.forEach(stroke => {
      ctx.beginPath();
      // Set properties for each stroke
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = stroke.thickness;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      // Apply eraser effect if tool was eraser
      ctx.globalCompositeOperation = stroke.tool === 'eraser' ? 'destination-out' : 'source-over';

      // Move to the first point of the stroke
      if (stroke.points.length > 0) {
        ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
        // Draw lines to subsequent points
        stroke.points.forEach(point => {
          ctx.lineTo(point.x, point.y);
        });
      }
      ctx.stroke(); // Render the stroke
    });

    // Reset global composite operation to default after drawing existing strokes
    // so new drawing doesn't erase everything
    ctx.globalCompositeOperation = 'source-over'; 

  }, [drawingData, dimensions.width, dimensions.height]); // Re-run when drawingData or dimensions change

  // Mouse event handlers for drawing
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect(); // Get canvas position on screen
    const x = e.clientX - rect.left; // Mouse X relative to canvas
    const y = e.clientY - rect.top; // Mouse Y relative to canvas

    const newStroke: StrokeObject = {
      id: uuidv4(),
      points: [{ x, y }],
      color: brushColor,
      thickness: brushThickness,
      tool: activeTool,
    };
    setCurrentStroke(newStroke);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushThickness;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    // Set composite operation for eraser
    ctx.globalCompositeOperation = activeTool === 'eraser' ? 'destination-out' : 'source-over';
    ctx.lineTo(x,y); // Draw a dot for single clicks
    ctx.stroke();
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !currentStroke) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCurrentStroke(prevStroke => {
      if (!prevStroke) return null;
      const updatedPoints = [...prevStroke.points, { x, y }];
      return { ...prevStroke, points: updatedPoints };
    });

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    if (currentStroke) {
      // Add the completed stroke to the existing drawing data
      const newStrokes = [...drawingData.strokes, currentStroke];
      onDrawingChange(blockId, { drawingData: { strokes: newStrokes } });
      setCurrentStroke(null); // Clear current stroke
    }
    // Reset global composite operation to default after drawing/erasing session
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) ctx.globalCompositeOperation = 'source-over';
  };

  const handleMouseLeave = () => {
    // If mouse leaves while drawing, treat it as mouse up
    if (isDrawing) {
      handleMouseUp();
    }
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      // Styles for the canvas element itself within the draggable wrapper
      style={{
        display: 'block', // Ensures no extra space below canvas
        width: '100%',
        height: '100%',
        border: '1px solid #aaa', // Border for the drawing area
        backgroundColor: 'white', // White background for the drawing area
        boxSizing: 'border-box', // Include border in width/height
      }}
    />
  );
};

export default DrawingCanvas;