export default function removeBasenameFromPath(pathname: string, basename?: string) {
  if (typeof basename !== 'string') {
    return pathname;
  }
  if (basename[0] !== '/') {
    // compatible with no slash. For example: ice -> /ice
    basename = `/${basename}`;
  }

  if (pathname.startsWith(basename)) {
    pathname = pathname.substring(basename.length);
    if (!pathname.startsWith('/')) {
      pathname = `/${pathname || ''}`;
    }
  }

  return pathname;
}
