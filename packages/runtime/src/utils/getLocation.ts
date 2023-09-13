/**
 * ref: https://github.com/remix-run/react-router/blob/main/packages/react-router-dom/server.tsx
 */
import { parsePath } from 'history';
import type { Location } from 'history';

const REGEXP_WITH_HOSTNAME = /^https?:\/\/[^/]+/i;

export default function getLocation(url: string) {
  // In case of invalid URL, provide a default base url.
  const locationPath = url.replace(REGEXP_WITH_HOSTNAME, '') || '/';
  const locationProps = parsePath(locationPath);
  const location: Location = {
    pathname: locationProps.pathname || '/',
    search: locationProps.search || '',
    hash: locationProps.hash || '',
    state: null,
    key: 'default',
  };

  return location;
}
