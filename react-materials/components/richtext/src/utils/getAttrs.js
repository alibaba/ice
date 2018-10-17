import { FONTSIZE } from '../constants/marks';

export const nodeAttrs = {
  textAlign: node => node.data.get('align'),
  paddingLeft: node =>
    node.data.get('indent') ? `${3 * node.data.get('indent')}em` : undefined,
  lineHeight: node => node.data.get('lineHeight'),
  width: node => node.data.get('width'),
  height: node => node.data.get('height')
};

export const markAttrs = {
  backgroundColor: mark => mark.data.get('backgroundColor'),
  color: mark => mark.data.get('color'),
  fontSize: mark => mark.data.get(FONTSIZE),
};
