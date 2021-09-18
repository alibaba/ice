import { transform } from '@builder/swc';

export default async function(source, programmaticOptions) {
  const output = await transform(source, programmaticOptions);
  const { map } = output;
  if (programmaticOptions.inputSourceMap) {
    const parsedMap = JSON.parse(map);
    // Add filename to pre compile map sources
    parsedMap.sources[0] = programmaticOptions.filename;
    return [output.code, parsedMap];
  }

  return [output.code, map];
}
