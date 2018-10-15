import {Component} from 'react';
import omit from 'lodash.omit';
import { Button, Dropdown, Menu } from '@icedesign/base';
import ToolbarButton from '../../components/ToolbarButton';
import { FONTSIZE } from '../../constants/marks';
import SharedMarkSelectorDecoration from '../shared/markSelectorDecoration';
import commonMark from '../../renderer/commonMark';
import {markAttrs} from '../../utils/getAttrs';

const SplitButton = Button.Split;

@SharedMarkSelectorDecoration(FONTSIZE)
class FontSizeButton extends Component {
  static defaultProps = {
    options: [12, 14, 16, 18, 20, 24, 28, 32],
    displayType: 'button'
  };

  render() {
    const {
      options,
      defaultValue,
      onChange,
      displayType,
      icon,
      ...rest
    } = this.props;
    const opt = [...options.map(opt => `${opt}px`)];

    const menu = (
      <Menu onClick={(value) => {
        onChange({value});
      }}>
        {opt.map(item => (
          <Menu.Item onMouseDown={e => e.preventDefault()} key={item}>
            {item}
          </Menu.Item>
        ))}
      </Menu>
    );

    // if (displayType === 'button') {
    //   return (
    //     <SplitButton menu={menu}>
    //       <ToolbarButton
    //         icon="format_size"
    //         type="fontSize"
    //         isActive={defaultValue || false}
    //         {...rest}
    //       />
    //     </SplitButton>
    //   );
    // }

    return (
      <Dropdown triggerType="click"
        trigger={
          <ToolbarButton
            icon="format_size"
            title="字体大小"
            isActive={defaultValue || false}
            {...rest}
          />
        }
      >
        {menu}
      </Dropdown>
    );
  }
}

function FontSizePlugin() {
  return {
    toolbarButtons: [
      FontSizeButton
    ],
    plugins: [
      {
        renderMark: props => {
          if (props.mark.type === FONTSIZE)
            return commonMark('span', {fontSize: markAttrs.fontSize})(
              props
            );
        }
      }
    ]
  };
}

export default FontSizePlugin;
