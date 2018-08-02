import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ContextMenu, MenuItem } from 'react-contextmenu';
import './CustomContextMenu.scss';

export default class CustomContextMenu extends Component {
  static displayName = 'CustomContextMenu';

  static propTypes = {
    handleClick: PropTypes.func,
  };

  static defaultProps = {
    handleClick: () => {},
  };

  render() {
    const { handleClick } = this.props;

    const attributes = {
      className: 'custom-context-menu-item',
    };

    return (
      <ContextMenu
        id="contextMenuContainer"
        className="custom-context-menu-container"
      >
        <MenuItem
          attributes={attributes}
          data={{ name: 'edit' }}
          onClick={handleClick}
        >
          编 辑
        </MenuItem>
        <MenuItem
          attributes={attributes}
          data={{ name: 'delete' }}
          onClick={handleClick}
        >
          删 除
        </MenuItem>
        <MenuItem
          attributes={attributes}
          data={{ name: 'view' }}
          onClick={handleClick}
        >
          查 看
        </MenuItem>
      </ContextMenu>
    );
  }
}
