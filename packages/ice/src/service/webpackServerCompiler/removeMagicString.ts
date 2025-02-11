export default function (source: string) {
  const result = source.replace(
    /webpackChunkName:\s*["'][^"']+["']/g,
    'webpackMode: "eager"',
  );

  // Return the modified source
  return result;
}
