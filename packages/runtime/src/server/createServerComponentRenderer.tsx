
import { renderToReadableStream } from 'react-server-dom-webpack/server.edge';
import * as React from 'react';
import type { ClientReferenceManifest } from '../types.js';
import useFlightResponse from './useFlightResponse.js';

// @ts-ignore
const { use } = React;

export type RendererOptions = {
  clientReferenceManifest: ClientReferenceManifest;
  serverComponentsErrorHandler: Function;
  writable: WritableStream;
};

export default function createServerComponentRenderer<Props>(ComponentToRender: (props: Props) => any, options: RendererOptions): (props: Props) => JSX.Element {
  const {
    clientReferenceManifest,
    serverComponentsErrorHandler,
    writable,
  } = options;

  let flightStream: ReadableStream<Uint8Array>;
  const createFlightStream = (props: Props) => {
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

  return function ServerComponentWrapper(props: Props): JSX.Element {
    const response = useFlightResponse(
      writable,
      createFlightStream(props),
      clientReferenceManifest,
      flightResponseRef,
    );

    return use(response);
  };
}