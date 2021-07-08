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
  const { plugins = [], parser } = getOptions(this);
  return postcss(plugins).process(source, { parser }).css;
}
