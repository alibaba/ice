export default function (source) {
  const result = source.replace(/webpackChunkName:\s*["'][^"']+["']/g, 'webpackMode: "eager"');

  // Return the modified source
  return result;
}
