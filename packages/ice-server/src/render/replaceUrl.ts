export default (url: string): string => {
  return url.replace(/https:\/\/g\.alicdn\.com\//g, 'https://dev.g.alicdn.com/');
};
