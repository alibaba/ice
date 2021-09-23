import { transform } from '@builder/swc';

export default async function(source, programmaticOptions) {
  const output = await transform(source, programmaticOptions);
  const { code, map } = output;

  return [code, map];
}
