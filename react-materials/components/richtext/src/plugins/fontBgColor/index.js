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
    colorKey: 'backgroundColor'
  };

  onChange = (color) => {
    let { editor, colorKey } = this.props;
    let rgba = hexRgb(color.color, { format: 'array' });
    rgba.pop();
    rgba.push(color.alpha / 100);
    color.rgba = `rgba(${rgba.join(',')})`;

    editor.change(change => {
      addMarkOverwrite(change, {
        type: this.typeName,
        data: { [colorKey]: color.rgba }
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
      const backgroundColor = first.get('backgroundColor');

      colorStyle = {
        color: backgroundColor
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
      backgroundColor: mark => mark.data.get('backgroundColor')
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
