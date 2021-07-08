import postcss from 'postcss';
import * as webpack from 'webpack';
import { getOptions } from 'loader-utils';

interface Option {
  plugins: any[]
  parser: Function
}

export default function loader(
  this: webpack.LoaderContext<Option>,
  source: string | Buffer
) {
  const { plugins = [], parser } = getOptions(this) as Option;
  const result = postcss(plugins).process(source, { parser } as any).css;
  return result;
}
