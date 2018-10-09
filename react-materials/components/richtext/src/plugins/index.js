import AlignPlugin from './align';
import FontColorPlugin from './fontColor';

const plugins = [
  AlignPlugin(),
  FontColorPlugin({
    color: mark => mark.data.get("color") && mark.data.get("color").color
  })
];

export default plugins;
