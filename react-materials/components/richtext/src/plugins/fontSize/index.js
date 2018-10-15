import {Component} from 'react';
import omit from 'lodash.omit';
import { Button, Dropdown, Menu } from '@icedesign/base';
import ToolbarButton from '../../components/ToolbarButton';
import { FONTSIZE } from '../../constants/marks';
import SharedMarkSelectorDecoration from '../shared/markSelectorDecoration';
import commonMark from '../../renderer/commonMark';

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
          <span>
            <ToolbarButton
              icon="format_size"
              title="字体大小"
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

function FontSizePlugin(opt) {
  const options = Object.assign(
    {
      type: FONTSIZE,
      tagName: 'span',
      fontSize: mark => mark.data.get(FONTSIZE)
    },
    opt
  );

  return {
    toolbarButtons: [
      FontSizeButton
    ],
    plugins: [
      {
        renderMark: props => {
          if (props.mark.type === options.type)
            return commonMark(options.tagName, omit(options, ['type', 'tagName']))(
              props
            );
        }
      }
    ]
  };
}

export default FontSizePlugin;
