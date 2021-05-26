import * as postcss from 'postCSS';
import { getOptions } from 'loader-utils';
import { declVarPlugin } from './plugin';

interface Option {
  themeVars: Record<string, string>
  type: 'sass' | 'less'
}

/**
 * Less eg:  @color-bg: #fff; -> @color-bg: var(--color-bg, ${default});
 * 
 * Sass eg:  $color-bg: #fff; -> $color-bg: var(--color-bg, ${default});
 */
export default function loader(
  this: any,
  source: string | Buffer
) {
  const { themeVars, type } = getOptions(this) as any as Option;
  return postcss([declVarPlugin(themeVars, type)]).process(source).css;
}
