import './index.css';

import React, { useState } from 'react';

function App() {
  const [count, setCount] = useState<number>(0);

  return (
    <div className="App">
      <header className="App-header">
        <p className="header">🚀 Vite + Icejs</p>

        <div className="body">
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            🪂 Click me : {count}
          </button>

          <p> Don&apos;t forgot to install <a href="https://appworks.site/">AppWorks</a> in Your Vscode.</p>
          <p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer">
              Learn React
            </a>
            {' | '}
            <a
              className="App-link"
              href="https://vitejs.dev/guide/features.html"
              target="_blank"
              rel="noopener noreferrer">
              Vite Docs
            </a>
          </p>
        </div>
      </header>
    </div>
  );
}

export default App;
