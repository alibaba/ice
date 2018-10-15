import alignPlugin from './align';
import fontColorPlugin from './fontColor';
import fontBgColorPlugin from './fontBgColor';
import fontSizePlugin from './fontSize';
import lineHeightPlugin from './lineHeight';

const plugins = [
  fontColorPlugin(),
  fontBgColorPlugin(),
  fontSizePlugin(),
  lineHeightPlugin(),
  alignPlugin(),
];

export default plugins;
