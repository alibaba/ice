import { Head } from 'ice';
import { useState } from 'react';
import store from './store';
import './index.css';

function App() {
  const [count, setCount] = useState<number>(0);
  const [titleState] = store.useModel('title');

  return (
    <div className="App">
      <Head>
        <meta charSet="utf-8" />
        <title>Home title</title>
        <meta name="keywords" content="About Keywords" />
        <meta name="description" content="About Description" />
      </Head>
      <header className="App-header">
        <p x-if={titleState.title} className="header">{titleState.title}</p>

        <div className="body">
          <button type="button" onClick={() => setCount((e) => e + 1)}>
            🪂 Click me : {count}
          </button>

          <p> Don&apos;t forget to install <a href="https://appworks.site/">AppWorks</a> in Your Vscode.</p>
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
