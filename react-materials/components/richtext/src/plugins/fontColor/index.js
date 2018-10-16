import {Component} from 'react';
import omit from 'lodash.omit';
import { Dropdown } from '@icedesign/base';
import { SketchPicker } from 'react-color';
import ToolbarButton from '../../components/ToolbarButton';
import addMarkOverwrite from '../../commands/mark-addoverwrite';
import { haveMarks } from '../../queries/have';
import { getMarkType } from '../../queries/get';
import { FONTCOLOR } from '../../constants/marks';
import commonMark from '../../renderer/commonMark';
import {markAttrs} from '../../utils/getAttrs';

import 'rc-color-picker/assets/index.css';

class FontColorButton extends Component {

  typeName = '';

  constructor(props) {
    super(props);
    this.typeName = this.props.type || FONTCOLOR;
  }

  static defaultProps = {
    colorKey: 'color'
  };

  onChange = (color) => {
    let { editor, colorKey } = this.props;
    const {r, g, b, a} = color.rgb;
    const rgba = `rgba(${r}, ${g}, ${b}, ${a})`;

    editor.change(change => {
      addMarkOverwrite(change, {
        type: this.typeName,
        data: { [colorKey]: rgba }
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

      colorStyle = {
        fill: color
      };
    }

    return (
      <Dropdown triggerType="click"
        trigger={
          <ToolbarButton
            icon="format_color_text"
            title="字体颜色"
            active={isActive}
            iconStyle={colorStyle}
            onClick={e => e.preventDefault()}
          />
        }
      >
        <SketchPicker
          color={colorStyle.color}
          onChangeComplete={this.onChange}
        />
      </Dropdown>
    );
  }

}

function FontColorPlugin() {
  return {
    toolbarButtons: [
      FontColorButton
    ],
    plugins: [
      {
        renderMark: (props, next) => {
          if (props.mark.type === FONTCOLOR) {
            return commonMark('span', {color: markAttrs.color})(
              props
            );
          }
          return next();
        }
      }
    ]
  };
}

export default FontColorPlugin;
