import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class FormError extends Component {
  static displayName = 'FormError';

  static propTypes = {
    /**
     * 自定义渲染报错的组件和处理逻辑
     */
    render: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.object,
  };

  static defaultProps = {
    render: undefined,
    className: '',
    style: {},
  };

  static contextTypes = {
    getError: PropTypes.func,
  };

  render() {
    const path = this.props.name;
    const errors = this.context.getError(path);
    if (errors.length === 0) return null;

    const render = this.props.render;
    if (render && typeof render === 'function') {
      return render(errors);
    }

    const { className, style } = this.props;

    return (
      <span
        className={className}
        style={{ fontSize: 12, color: 'red', ...style }}
      >
        {errors.map((error) => error.message).join('，')}
      </span>
    );
  }
}
