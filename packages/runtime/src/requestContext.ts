import type { ServerContext, RequestContext } from './types.js';

interface Location {
  pathname: string;
  search: string;
}

/**
 * context for getData both in server and client side.
 */
export default function getRequestContext(location: Location, serverContext: ServerContext = {}): RequestContext {
  const { pathname, search } = location;
  const query = parseSearch(search);

  const requestContext: RequestContext = {
    ...serverContext,
    pathname,
    query,
  };

  return requestContext;
}

/**
 * Search string to object
 * URLSearchParams is not compatible with iOS9 and IE.
 */
function parseSearch(search: string) {
  // remove first '?'
  if (search.indexOf('?') === 0) {
    search = search.slice(1);
  }

  const result = {};

  let pairs = search.split('&');

  for (let j = 0; j < pairs.length; j++) {
    const value = pairs[j];
    const index = value.indexOf('=');

    if (index > -1) {
      const k = value.slice(0, index);
      const v = value.slice(index + 1);
      result[k] = v;
    } else if (value) {
      result[value] = '';
    }
  }

  return result;
}
