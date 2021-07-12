import { transform } from '@swc/core';

export default async function(source, programmaticOptions) {
  const output = await transform(source, programmaticOptions);
  let { map } = output;
  if (!programmaticOptions.sourceMaps) {
    map = programmaticOptions.inputSourceMap;
  }
  return [output.code, map];
}
