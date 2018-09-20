import React, { cloneElement, Children } from 'react';
import omit from 'lodash.omit';

/**
 * List容器组件
 */
const List = (props) => {
  const { column, spacing = 10, style, children } = props;
  const { width } = style;
  return (
    <div
      {...omit(props, ['column', 'spacing'])}
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
};

export default List;
