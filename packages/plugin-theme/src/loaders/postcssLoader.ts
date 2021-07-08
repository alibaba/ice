import postcss from 'postcss';
import * as webpack from 'webpack';
import { getOptions } from 'loader-utils';

interface Option {
  plugins: any[]
  parser: Function
}

export default async function loader(
  this: webpack.LoaderContext<Option>,
  source: string | Buffer
) {
  const { plugins = [], parser } = getOptions(this) as Option;
  const { css } = await postcss(plugins).process(source, { parser, from: undefined } as any);
  return css;
}
