import React, { Component } from 'react';
import Tooltip from 'rc-tooltip';
import classnames from 'classnames';

import './index.scss';

class ExtraButton extends Component {
  render() {
    const {
      tipContent,
      tipText,
      onClick,
      disabled = false,
      style = {},
      placement = 'bottomRight',
      active,
      ...other
    } = this.props;
    const btn = (
      <a
        {...other}
        className={classnames({
          'extra-button': true,
          active: active,
        })}
        onClick={disabled ? () => {} : onClick}
        style={disabled ? styles.disabled : style}
      >
        {this.props.children}
      </a>
    );
    if (tipContent || tipText) {
      return (
        <Tooltip
          placement={placement}
          overlay={tipContent || <div style={{ maxWidth: 120 }}>{tipText}</div>}
        >
          {btn}
        </Tooltip>
      );
    }
    return btn;
  }
}

const styles = {
  disabled: {
    color: '#999',
  },
};

export default ExtraButton;
