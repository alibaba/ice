import { TextDecoder, TextEncoder } from 'util';
import { createFromReadableStream } from 'react-server-dom-webpack/client.edge';
import type { ClientReferenceManifest } from '../types.js';

// This utility is based on https://github.com/zertosh/htmlescape
// License: https://github.com/zertosh/htmlescape/blob/0527ca7156a524d256101bb310a9f970f63078ad/LICENSE
const ESCAPE_LOOKUP: { [match: string]: string } = {
  '&': '\\u0026',
  '>': '\\u003e',
  '<': '\\u003c',
  '\u2028': '\\u2028',
  '\u2029': '\\u2029',
};

const ESCAPE_REGEX = /[&><\u2028\u2029]/g;

function htmlEscapeJsonString(str: string): string {
  return str.replace(ESCAPE_REGEX, (match) => ESCAPE_LOOKUP[match]);
}

function createDecodeTransformStream(decoder = new TextDecoder()) {
  return new TransformStream<Uint8Array, string>({
    transform(chunk, controller) {
      return controller.enqueue(decoder.decode(chunk, { stream: true }));
    },
    flush(controller) {
      return controller.enqueue(decoder.decode());
    },
  });
}

function createEncodeTransformStream(encoder = new TextEncoder()) {
  return new TransformStream<string, Uint8Array>({
    transform(chunk, controller) {
      return controller.enqueue(encoder.encode(chunk));
    },
  });
}

function createFlightTransformer() {
  let init = false;
  return new TransformStream<string, string>({
    transform(chunk, controller) {
      if (!init) {
        controller.enqueue('<script>self.__rsc_data=self.__rsc_data||[];</script>');
        init = true;
      }
      const scripts = `<script>self.__rsc_data.push(${htmlEscapeJsonString(JSON.stringify([chunk]))})</script>`;
      controller.enqueue(scripts);
    },
  });
}

/**
 * Render Flight stream.
 * This is only used for renderToHTML, the Flight response does not need additional wrappers.
 */
export default function useFlightResponse(
  writable: WritableStream<Uint8Array>,
  flightStream: ReadableStream<Uint8Array>,
  clientReferenceManifest: ClientReferenceManifest,
  flightResponseRef,
): Promise<JSX.Element> {
  if (flightResponseRef.current !== null) {
    return flightResponseRef.current;
  }

  const [renderStream, forwardStream] = flightStream.tee();

  const response = createFromReadableStream(renderStream, {
    ssrManifest: {
      moduleMap: clientReferenceManifest.ssrModuleMapping,
      moduleLoading: clientReferenceManifest.moduleLoading,
    },
  });

  flightResponseRef.current = response;

  forwardStream
    .pipeThrough(createDecodeTransformStream())
    .pipeThrough(createFlightTransformer())
    .pipeThrough(createEncodeTransformStream())
    .pipeTo(writable)
    .finally(() => {
      // Once the last encoding stream has flushed, then unset the flight
      // response ref.
      setTimeout(() => {
        flightResponseRef.current = null;
      }, 0);
    })
    .catch((err) => {
      console.error('Unexpected error while rendering Flight stream', err);
    });

  return response;
}