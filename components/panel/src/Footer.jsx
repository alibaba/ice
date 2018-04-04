import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class Footer extends PureComponent {
  static displayName = 'IcePanel.Footer';

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
    const cls = classnames(className, 'ice-panel-footer');
    return (
      <div style={style} className={`ice-panel-footer ${cls}`}>
        {this.props.children}
      </div>
    );
  }
}
