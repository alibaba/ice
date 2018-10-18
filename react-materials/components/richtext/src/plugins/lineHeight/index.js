import React, { Component } from 'react';
import { Dropdown, Menu } from '@icedesign/base';
import ToolbarButton from '../../components/ToolbarButton';
import SharedBlockSelectorDecoration from '../shared/blockSelectorDecoration';

@SharedBlockSelectorDecoration('lineHeight')
class LineHeightButton extends Component {
  static defaultProps = {
    options: [1, 1.2, 1.5, 2],
  };

  render() {
    const {
      options,
      defaultValue,
      onChange,
      icon,
      ...rest
    } = this.props;

    const menu = (
      <Menu onClick={(value) => {
        onChange({ value });
      }}
      >
        {options.map((item) => (
          <Menu.Item onMouseDown={(e) => e.preventDefault()} key={item}>
            {item}
          </Menu.Item>
        ))}
      </Menu>
    );

    return (
      <Dropdown triggerType="click"
        trigger={
          <ToolbarButton
            icon="format_line_spacing"
            title="行间距"
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

function LineHeightPlugin() {
  return {
    toolbarButtons: [
      LineHeightButton,
    ],
  };
}

export default LineHeightPlugin;
