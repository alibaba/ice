import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class IcePanel extends PureComponent {
  static displayName = 'IcePanel';

  static propTypes = {
    /**
     * 不同状态
     */
    status: PropTypes.oneOf(['success', 'info', 'warning', 'danger', 'default']),
    style: PropTypes.object,
    className: PropTypes.string,
  };

  static defaultProps = {
    status: 'default',
    className: '',
    style: {},
  };

  render() {
    const { status, style, className } = this.props;
    const cls = classnames(className, 'ice-panel', `ice-panel-${status}`);
    return (
      <div style={style} className={cls}>
        {this.props.children}
      </div>
    );
  }
}
