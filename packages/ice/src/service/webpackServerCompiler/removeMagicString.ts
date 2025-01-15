export default function (source) {
  const result = source.replace(/webpackChunkName:\s*["'][^"']+["']/g, '');

  // Return the modified source
  return result;
}
