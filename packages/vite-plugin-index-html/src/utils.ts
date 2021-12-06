/**
 * Check if link is absolute url
 * @param url
 */
export const isAbsoluteUrl = (url: string): boolean => {
  return (/^(https?:)?\/\/.+/).test(url);
};

/**
 * Add Trailing slash
 * @param str
 */
export const addTrailingSlash = (str: string): string => {
  return str.substr(-1) === '/' ? str : `${str}/`;
};
