import * as queryString from 'query-string';

function getInitialContext() {
  const { href, origin, pathname, search } = window.location;
  const path = href.replace(origin, '');
  const query = queryString.parse(search);
  const ssrError = (window as any).__ICE_SSR_ERROR__;

  return {
    pathname,
    path,
    query,
    ssrError
  };
}

export default getInitialContext;
