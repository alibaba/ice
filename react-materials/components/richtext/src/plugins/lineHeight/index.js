import {Component} from 'react';
import omit from 'lodash.omit';
import { Button, Dropdown, Menu } from '@icedesign/base';
import ToolbarButton from '../../components/ToolbarButton';
import { LINEHEIGHT } from '../../constants/marks';
import SharedBlockSelectorDecoration from '../shared/blockSelectorDecoration';
import commonMark from '../../renderer/commonMark';

const SplitButton = Button.Split;

@SharedBlockSelectorDecoration(LINEHEIGHT)
class LineHeightButton extends Component {
  static defaultProps = {
    options: [1, 1.5, 2, 2.5, 3, 3.5, 4],
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
    const opt = [...options.map(opt => `${opt}`)];

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
          <span>
            <ToolbarButton
              icon="format_line_spacing"
              title="行间距"
              isActive={defaultValue || false}
              {...rest}
            />
          </span>
        }
      >
        {menu}
      </Dropdown>
    );
  }
}

function LineHeightPlugin(opt) {
  return {
    toolbarButtons: [
      LineHeightButton
    ],
  };
}

export default LineHeightPlugin;
