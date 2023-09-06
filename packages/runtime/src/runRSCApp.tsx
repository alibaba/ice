import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import pkg from 'react-server-dom-webpack/client';
const { createFromFetch } = pkg;
// @ts-ignore
const { Suspense, use } = React;

export default async function runRSCApp() {
  function Message({ response }) {
    const body = use(response);
    return <div>{body}</div>;
  }

  function App({ response }) {
    return (
      <Suspense fallback={<h1>Loading...</h1>}>
        <Message response={response} />
      </Suspense>
    );
  }

  const response = createFromFetch(
    fetch('/?body'),
  );

  const container = document.getElementById('app');
  const root = ReactDOM.createRoot(container);
  root.render(<App response={response} />);
}
