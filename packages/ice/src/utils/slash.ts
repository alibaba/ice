export const addLeadingSlash = (path: string) => {
  return path.charAt(0) === '/' ? path : `/${path}`;
};
