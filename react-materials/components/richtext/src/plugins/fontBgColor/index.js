import {Component} from 'react';
import ColorPicker from 'rc-color-picker';
import hexRgb from 'hex-rgb';
import omit from 'lodash.omit';
import ToolbarButton from '../../components/ToolbarButton';
import addMarkOverwrite from '../../commands/mark-addoverwrite';
import { haveMarks } from '../../queries/have';
import { getMarkType } from '../../queries/get';
import { FONTBGCOLOR } from '../../constants/marks';
import commonMark from '../../renderer/commonMark';

import 'rc-color-picker/assets/index.css';

class FontBgColorButton extends Component {

  typeName = '';

  constructor(props) {
    super(props);
    this.typeName = this.props.type || FONTBGCOLOR;
  }

  static defaultProps = {
    colorKey: 'color'
  };

  onChange = (color) => {
    let { editor, colorKey } = this.props;

    color.rgba = `rgba(${hexRgb(color.color, { format: 'array' }).join(
      ','
    )}, ${color.alpha / 100})`;

    editor.change(change => {
      addMarkOverwrite(change, {
        type: this.typeName,
        data: { [colorKey]: color }
      });
    });
  };

  render() {
    const { icon, value, ...rest } = this.props;
    const isActive = haveMarks({value}, this.typeName);
    let colorStyle = {};

    if (isActive) {
      const first = getMarkType({value}, this.typeName)
        .first()
        .get('data');
      const color = first.get('color');
      const alpha = first.get('alpha');

      colorStyle = {
        color: color.color
      };
    }

    return (
      <ColorPicker
        onChange={this.onChange}
        placement="bottomRight"
      >
        <ToolbarButton
          icon="format_color_fill"
          title="背景颜色"
          active={isActive}
          iconStyle={colorStyle}
          onClick={e => e.preventDefault()}
        />
      </ColorPicker>
    );
  }

}

function FontBgColorPlugin(opt) {
  const options = Object.assign(
    {
      type: FONTBGCOLOR,
      tagName: 'span',
      backgroundColor: mark => mark.data.getIn(['color', 'color'])
    },
    opt
  );

  return {
    toolbarButtons: [
      FontBgColorButton
    ],
    plugins: [
      {
        renderMark: (props, next) => {
          if (props.mark.type === options.type) {
            return commonMark(options.tagName, omit(options, ['type', 'tagName']))(
              props
            );
          }
          return next();
        }
      }
    ]
  };
}

export default FontBgColorPlugin;
