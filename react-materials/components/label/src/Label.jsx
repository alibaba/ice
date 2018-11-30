import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class IceLabel extends PureComponent {
  static displayName = 'IceLabel';

  static propTypes = {
    /**
     * 当前要表达的状态
     */
    status: PropTypes.oneOf([
      'default',
      'primary',
      'success',
      'info',
      'warning',
      'danger',
    ]),
    className: PropTypes.string,
    style: PropTypes.object,
    /**
     * 是否反转颜色
     */
    inverse: PropTypes.bool,
  };

  static defaultProps = {
    inverse: true,
    status: 'default',
    className: '',
    style: {},
  };

  render() {
    const { style, className, status, children, inverse } = this.props;
    return (
      <span
        style={style}
        className={`ice-label ice-label-${status} ${!inverse
          ? 'ice-label-no-inverse'
          : ''} ${className}`}
      >
        {children}
      </span>
    );
  }
}
