// src/Whiteboard.tsx
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface StrokeObject {
  id: string;
  points: { x: number; y: number }[];
  color: string;
  thickness: number;
  tool: 'pen' | 'eraser';
}

interface DrawingBlock {
  id: string;
  type: 'drawing';
  position: { x: number; y: number };
  dimensions: { width: number; height: number};
  drawingData: {
    strokes: StrokeObject[];
  };
}

interface TextBlock {
  id: string; 
  type: 'text'; 
  position: { x: number; y: number }; 
  dimensions: { width: number; height: number };
  value: string;
}

interface ImageBlock {
  id: string;
  type: 'image';
  position: { x: number; y: number };
  dimensions: { width: number; height: number };
  url: string;
}

type ContentBlock = DrawingBlock | TextBlock | ImageBlock;



function Whiteboard() {
  const [contentBlocks, setContentBlocks] = useState([]);
  const [activeTool, setActiveTool] = useState('pen');
  const [brushColor, setBrushColor] = useState('black');
  const [brushThickness, setBrushThickness] = useState(2);

  useEffect(() => {
    const saved = localStorage.getItem('whiteboardContent');
    if (saved) {
      try{
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
        setContentBlocks(parsed);
        } else {
          console.warn("Loaded data from localStorage is not an array, initializing empty whiteboard.");
        }
      } catch (error) {
        console.error("Error parsing localStorage data:", error);
      }
    }
  }, []);

  useEffect(() => {
    const jsonToSave = JSON.stringify(contentBlocks);

    localStorage.setItem('whiteboardContent', jsonToSave)
  }, [contentBlocks]);

    return(
      <div className="whiteboard-surface" style={{position: 'relative', width: '100%', height: '80vh', border: '1px solid gray', overflow: 'hidden'}}>
        {contentBlocks.map(block => {
          if (block.type === "drawing") {
            return <div key={block.id}>Drawing Block Placeholder</div>;
          } else if (block.type === "text") {
            return <div key={block.id}>Text Block Placeholder</div>;
          } else if (block.type === "image") {
            return <div key = {block.id}>Image Block Placeholder</div>;
          }
            return null;
        })}
      </div>
    );
  }
 

export default Whiteboard;

