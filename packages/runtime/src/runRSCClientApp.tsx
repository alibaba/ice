import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import pkg from 'react-server-dom-webpack/client';

// @ts-ignore
const { Suspense, use } = React;
const { createFromFetch } = pkg;

export async function runRSCClientApp() {
  function App({ response }) {
    return (
      <Suspense fallback={<h1>Loading...</h1>}>
        {use(response)}
      </Suspense>
    );
  }

  const rscPath = location.href + (location.href.indexOf('?') ? '?rsc' : '&rsc');
  const response = createFromFetch(
    fetch(rscPath),
  );

  const container = document.getElementById('app');
  const root = ReactDOM.createRoot(container);
  root.render(<App response={response} />);
}