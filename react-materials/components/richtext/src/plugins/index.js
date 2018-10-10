import alignPlugin from './align';
import fontColorPlugin from './fontColor';
import fontBgColorPlugin from './fontBgColor';
import fontSizePlugin from './fontSize';
import lineHeightPlugin from './lineHeight';

const plugins = [
  alignPlugin(),
  fontColorPlugin({
    color: mark => mark.data.get('color') && mark.data.get('color').color
  }),
  fontBgColorPlugin({
    backgroundColor: mark =>
      mark.data.get('color') && mark.data.get('color').color
  }),
  fontSizePlugin(),
  lineHeightPlugin()
];

export default plugins;
