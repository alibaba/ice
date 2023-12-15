
import { renderToReadableStream } from 'react-server-dom-webpack/server.edge';
import * as React from 'react';
import useFlightResponse from './useFlightResponse.js';

// @ts-ignore
const { use } = React;

export default function createServerComponentRenderer(ComponentToRender, options) {
  const {
    clientReferenceManifest,
    serverComponentsErrorHandler,
    writable,
  } = options;

  let flightStream: ReadableStream<Uint8Array>;
  const createFlightStream = (props) => {
    if (!flightStream) {
      flightStream = renderToReadableStream(
        <ComponentToRender {...(props as any)} />,
        clientReferenceManifest.clientModules,
        {
          onError: serverComponentsErrorHandler,
        },
      );
    }
    return flightStream;
  };

  const flightResponseRef = { current: null };

  return function ServerComponentWrapper(props): JSX.Element {
    const response = useFlightResponse(
      writable,
      createFlightStream(props),
      clientReferenceManifest,
      flightResponseRef,
    );

    return use(response);
  };
}