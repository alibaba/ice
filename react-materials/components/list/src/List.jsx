import React, { Component, cloneElement, Children } from 'react';

/**
 * List容器组件
 */
export default class List extends Component {
  render() {
    const { column, spacing = 10, style, children, ...others } = this.props;
    const { width } = style;
    return (
      <div
        {...others}
        style={{
          display: 'flex',
          flexFlow: 'row wrap',
          justifyContent: 'flex-start',
          border: '1px solid transparent',
          paddingTop: `${spacing}px`,
          paddingLeft: `${spacing}px`,
          ...style,
        }}
      >
        {Children.map(children, (child, index) => {
          const cloneChildren = cloneElement(child, {
            width: (width - spacing * (column + 1) - 2) / column,
            spacing,
          });
          return cloneChildren;
        })}
      </div>
    );
  }
};
