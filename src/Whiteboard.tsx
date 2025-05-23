// src/Whiteboard.tsx
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
<<<<<<< HEAD

=======
import Toolbar from './Toolbar';
import DrawingCanvas from './DrawingCanvas';
import TextBlock from './TextBlock';
import ImageBlock from './ImageBlock';
import DraggableResizableWrapper from './DraggableResizableWrapper'; // NEW IMPORT

// --- TYPE DEFINITIONS (Essential for TypeScript) ---
// Define a single stroke
>>>>>>> 7b5bbd5 (Initial project files)
interface StrokeObject {
  id: string;
  points: { x: number; y: number }[];
  color: string;
  thickness: number;
  tool: 'pen' | 'eraser';
}

<<<<<<< HEAD
=======
// Define the shape of a drawing block
>>>>>>> 7b5bbd5 (Initial project files)
interface DrawingBlock {
  id: string;
  type: 'drawing';
  position: { x: number; y: number };
<<<<<<< HEAD
  dimensions: { width: number; height: number};
=======
  dimensions: { width: number; height: number };
>>>>>>> 7b5bbd5 (Initial project files)
  drawingData: {
    strokes: StrokeObject[];
  };
}

<<<<<<< HEAD
interface TextBlock {
  id: string; 
  type: 'text'; 
  position: { x: number; y: number }; 
=======
// Define the shape of a text block
interface TextBlockData { // Renamed from TextBlock to avoid conflict with component name
  id: string;
  type: 'text';
  position: { x: number; y: number };
>>>>>>> 7b5bbd5 (Initial project files)
  dimensions: { width: number; height: number };
  value: string;
}

<<<<<<< HEAD
interface ImageBlock {
=======
// Define the shape of an image block
interface ImageBlockData { // Renamed from ImageBlock to avoid conflict with component name
>>>>>>> 7b5bbd5 (Initial project files)
  id: string;
  type: 'image';
  position: { x: number; y: number };
  dimensions: { width: number; height: number };
<<<<<<< HEAD
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
=======
  url: string; // Base64 string or URL
}

// A Union Type: A ContentBlock can be any of these specific block types
type ContentBlock = DrawingBlock | TextBlockData | ImageBlockData;

// --- END TYPE DEFINITIONS ---


function Whiteboard() {
  // State to hold ALL content blocks on the whiteboard
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([]); 

  // State for the currently active tool (used by DrawingCanvas)
  const [activeTool, setActiveTool] = useState<'pen' | 'eraser'>('pen');
  // State for current drawing properties (used by DrawingCanvas)
  const [brushColor, setBrushColor] = useState('black');
  const [brushThickness, setBrushThickness] = useState(2);

  // --- useEffect Hook for initial canvas setup and loading from localStorage ---
  // This effect runs only ONCE when the component first appears on the screen (empty dependency array [])
  useEffect(() => {
    const saved = localStorage.getItem('whiteboardContent');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // Add basic validation for loaded blocks to ensure they match our types
          const validatedBlocks: ContentBlock[] = parsed.filter((block: any) =>
            block.id && block.type && block.position && block.dimensions
          ) as ContentBlock[]; // Assert to ContentBlock[]
          setContentBlocks(validatedBlocks);
>>>>>>> 7b5bbd5 (Initial project files)
        } else {
          console.warn("Loaded data from localStorage is not an array, initializing empty whiteboard.");
        }
      } catch (error) {
        console.error("Error parsing localStorage data:", error);
      }
    }
<<<<<<< HEAD
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

=======
  }, []); 

  // --- useEffect Hook for auto-saving content to localStorage ---
  // This effect runs whenever the 'contentBlocks' state changes
  useEffect(() => {
    const jsonToSave = JSON.stringify(contentBlocks);
    localStorage.setItem('whiteboardContent', jsonToSave);
  }, [contentBlocks]); // This dependency array means the effect runs when contentBlocks changes


  // --- HANDLER FUNCTIONS ---

  // Generic handler for updating any content block's properties
  const handleContentBlockChange = (id: string, updatedProps: Partial<ContentBlock>) => {
    setContentBlocks(prevBlocks => 
      prevBlocks.map(block => {
        if (block.id === id) {
          // This type assertion helps TypeScript understand the merge result
          return { ...block, ...updatedProps } as ContentBlock; 
        }
        return block;
      })
    );
  };

  // Handler for adding a new drawing block
  const handleAddDrawingBlock = () => {
    const newDrawingBlock: DrawingBlock = {
      id: uuidv4(),
      type: 'drawing',
      position: { x: 50, y: 50 }, // Default starting position
      dimensions: { width: 600, height: 400 }, // Default size
      drawingData: {
        strokes: [], // Start with an empty array of strokes
      },
    };
    setContentBlocks(prevBlocks => [...prevBlocks, newDrawingBlock]);
  };

  // Handler for adding a new text block
  const handleAddTextBlock = () => {
    const newTextBlock: TextBlockData = {
      id: uuidv4(),
      type: 'text',
      position: { x: 100, y: 100 }, // Default starting position
      dimensions: { width: 250, height: 40 }, // Default size
      value: 'Double click to edit text',
    };
    setContentBlocks(prevBlocks => [...prevBlocks, newTextBlock]);
  };

  // Handler for adding an image from a file upload (converts to Base64)
  const handleAddImage = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const newImageBlock: ImageBlockData = {
        id: uuidv4(),
        type: 'image',
        position: { x: 150, y: 150 }, // Default starting position
        dimensions: { width: 300, height: 200 }, // Default size
        url: reader.result as string, // Base64 string
      };
      setContentBlocks(prevBlocks => [...prevBlocks, newImageBlock]);
    };
    reader.readAsDataURL(file); // Read the file as a data URL (Base64)
  };

  // Handler for adding an image by URL
  const handleAddImageUrl = (url: string) => {
    const newImageBlock: ImageBlockData = {
      id: uuidv4(),
      type: 'image',
      position: { x: 150, y: 150 }, // Default starting position
      dimensions: { width: 300, height: 200 }, // Default size
      url: url,
    };
    setContentBlocks(prevBlocks => [...prevBlocks, newImageBlock]);
  };

  // Handler for tool changes (Pen/Eraser)
  const handleToolChange = (tool: 'pen' | 'eraser') => {
    setActiveTool(tool);
  };

  // Handler for brush color changes
  const handleBrushColorChange = (color: string) => {
    setBrushColor(color);
  };

  // Handler for brush thickness changes
  const handleBrushThicknessChange = (thickness: number) => {
    setBrushThickness(thickness);
  };


  return (
    <div>
      {/* Render the Toolbar at the top of the whiteboard */}
      <Toolbar
        activeTool={activeTool}
        brushColor={brushColor}
        brushThickness={brushThickness}
        onToolChange={handleToolChange}
        onBrushColorChange={handleBrushColorChange}
        onBrushThicknessChange={handleBrushThicknessChange}
        onAddDrawing={handleAddDrawingBlock}
        onAddText={handleAddTextBlock}
        onAddImage={handleAddImage}
        onAddImageUrl={handleAddImageUrl}
      />

      {/* The main whiteboard drawing surface */}
      <div 
        className="whiteboard-surface" 
        style={{
          position: 'relative', 
          width: '100%', 
          height: '80vh', 
          border: '1px solid gray', 
          overflow: 'hidden', // Crucial to contain absolute positioned children
          background: '#f8f8f8', // Light background for whiteboard surface
        }}
      >
        {/* Loop through contentBlocks and render each one */}
        {contentBlocks.map(block => {
          // Use DraggableResizableWrapper for common drag functionality
          return (
            <DraggableResizableWrapper
              key={block.id}
              id={block.id}
              initialPosition={block.position}
              initialDimensions={block.dimensions}
              onPositionChange={(id, newPos) => handleContentBlockChange(id, { position: newPos })}
              // onDimensionsChange (not implemented in this basic wrapper)
            >
              {block.type === "drawing" && (
                <DrawingCanvas
                  blockId={block.id}
                  drawingData={(block as DrawingBlock).drawingData} // Type assertion
                  activeTool={activeTool}
                  brushColor={brushColor}
                  brushThickness={brushThickness}
                  position={block.position}
                  dimensions={block.dimensions}
                  onDrawingChange={handleContentBlockChange}
                />
              )}
              {block.type === "text" && (
                <TextBlock
                  blockId={block.id}
                  value={(block as TextBlockData).value} // Type assertion
                  position={block.position}
                  dimensions={block.dimensions}
                  onContentChange={handleContentBlockChange}
                />
              )}
              {block.type === "image" && (
                <ImageBlock
                  blockId={block.id}
                  url={(block as ImageBlockData).url} // Type assertion
                  position={block.position}
                  dimensions={block.dimensions}
                  // onContentChange not used for images yet
                />
              )}
            </DraggableResizableWrapper>
          );
        })}
      </div>
    </div>
  );
}

export default Whiteboard;
>>>>>>> 7b5bbd5 (Initial project files)
