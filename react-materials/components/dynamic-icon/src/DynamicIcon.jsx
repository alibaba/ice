import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const linkTagCache = {};

export default class DynamicIcon extends Component {
  static displayName = 'DynamicIcon';

  static propTypes = {
    /**
     * 指定显示哪种图标
     */
    type: PropTypes.string,
    /**
     * 指定图标大小
     */
    size: PropTypes.oneOf([
      'xxs',
      'xs',
      'small',
      'medium',
      'large',
      'xl',
      'xxl',
      'xxxl',
    ]),
  };

  static defaultProps = {
    size: 'medium',
  };

  static create = ({ fontFamily, prefix: uniquePrefix, css }) => {
    if (!fontFamily) {
      throw new TypeError('fontfamily is not specified!');
    }
    if (!uniquePrefix) {
      throw new TypeError('prefix is not specified!');
    }
    if (!css) {
      throw new TypeError('css path is not specified!');
    }

    const render = ({ className, type, size = 'medium', ...other }) => {
      const classes = cx({
        [`${uniquePrefix}-${size}`]: !!size,
        [`${fontFamily}`]: true,
        [`${uniquePrefix}-${type}`]: !!type,
        [className]: !!className,
      });
      return <i {...other} className={classes} />;
    };

    if (linkTagCache[fontFamily]) {
      // use cache
      render.loaded = true;
    } else {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = css;
      linkTagCache[fontFamily] = link;
      link.onload = link.onreadystatechange = () => {
        render.loaded = true;
      };
      document.body.appendChild(link);

      const style = document.createElement('style');
      style.innerHTML = `
      .${uniquePrefix}-xxs {
        font-size: 8px;
        line-height: 1;
      }
      .${uniquePrefix}-xs {
        font-size: 12px;
        line-height: 1;
      }
      .${uniquePrefix}-small {
        font-size: 16px;
        line-height: 1;
      }
      .${uniquePrefix}-medium {
        font-size: 20px;
        line-height: 1;
      }
      .${uniquePrefix}-large {
        font-size: 24px;
        line-height: 1;
      }
      .${uniquePrefix}-xl {
        font-size: 32px;
        line-height: 1;
      }
      .${uniquePrefix}-xxl {
        font-size: 48px;
        line-height: 1;
      }
      .${uniquePrefix}-xxxl {
        font-size: 64px;
        line-height: 1;
      }
      `;
      document.body.appendChild(style);
    }

    return render;
  };

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return null;
  }
}
