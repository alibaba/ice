import AlignPlugin from './align';
import FontColorPlugin from './fontColor';
import FontBgColorPlugin from './fontBgColor';

const plugins = [
  AlignPlugin(),
  FontColorPlugin({
    color: mark => mark.data.get("color") && mark.data.get("color").color
  }),
  FontBgColorPlugin({
    backgroundColor: mark =>
      mark.data.get("color") && mark.data.get("color").color
  }),
];

export default plugins;
