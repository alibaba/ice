import alignPlugin from './align';
import fontColorPlugin from './fontColor';
import fontBgColorPlugin from './fontBgColor';
import fontSizePlugin from './fontSize';
import lineHeightPlugin from './lineHeight';

const plugins = [
  alignPlugin(),
  fontColorPlugin(),
  fontBgColorPlugin(),
  fontSizePlugin(),
  lineHeightPlugin()
];

export default plugins;
