import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class Body extends PureComponent {
  static displayName = 'IcePanel.Body';

  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
  };

  static defaultProps = {
    style: {},
    className: '',
  };

  render() {
    const { style, className } = this.props;
    const cls = classnames(className, 'ice-panel-body');
    return (
      <div style={style} className={cls}>
        {this.props.children}
      </div>
    );
  }
}
