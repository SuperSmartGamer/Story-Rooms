// src/App.tsx
<<<<<<< HEAD
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Whiteboard from './Whiteboard.tsx'; // <--- Import your new Whiteboard component

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          I've been clicked {count} times!
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR!
        </p>
      </div>

      {/* --- RENDER YOUR WHITEBOARD HERE --- */}
      <h2>My Interactive Whiteboard</h2>
      <Whiteboard /> {/* <--- This will render your canvas */}
      {/* ----------------------------------- */}

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more.
      </p>
    </>
  )
}

// (Keep your Button component here if you want, or remove it for simplicity)
// function Button(props) {
//   return <button>'{props.buttonName}'</button>;
// }

export default App
=======
import React from 'react';
import './App.css'; // Keep basic styling
import Whiteboard from './Whiteboard'; // Import your Whiteboard component

function App() {
  return (
    <div className="App">
      <h1>My Interactive Whiteboard</h1>
      <Whiteboard />
      <p className="read-the-docs" style={{ marginTop: '20px', color: '#666' }}>
        Click 'Add Drawing Area', 'Add Text', or 'Add Image' to start!
      </p>
    </div>
  );
}

export default App;
>>>>>>> 7b5bbd5 (Initial project files)
