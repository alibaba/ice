export default function (source) {
  const result = source.replace(/webpackChunkName:\s*["'][^"']+["']/g, 'webpackIgnore: true');

  // Return the modified source
  return result;
}
