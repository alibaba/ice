import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class IceTitle extends PureComponent {
  static displayName = 'IceTitle';

  static propTypes = {
    /**
    * 标题
    */
    text: PropTypes.string,
    /**
    * 是否有左边竖线
    */
    decoration: PropTypes.bool,
    /**
    * 副标题
    */
    subtitle: PropTypes.any,
  };

  static defaultProps = {
    text: '',
    decoration: true,
    subtitle: '',
  };

  render() {
    const {
      className,
      style,
      text,
      subtitle,
      decoration,
    } = this.props;

    let styles = style;

    if (decoration) {
      styles = {
        borderLeftWidth: 4,
        borderLeftStyle: 'solid',
        ...style,
      };
    } else {
      styles = {
        paddingLeft: 0,
        ...style,
      };
    }

    let children;

    if (!text || text === '') {
      children = this.props.children;
    } else {
      children = (
        <div>
          {text}
          {
            subtitle
              ? <div className="ice-title-subtitle">{subtitle}</div>
              : null
          }
        </div>
      );
    }

    const cls = classNames('ice-title', className);

    return (
      <div className={cls} style={styles}>{children}</div>
    );
  }
}
