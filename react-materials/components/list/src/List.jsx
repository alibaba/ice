import React, {Component, cloneElement, Children} from 'react';
import omit from 'lodash.omit';

/**
 * List容器组件
 */
export default class List extends Component {
  render() {
    const {column, spacing = 10, style, children} = this.props;
    const {width} = style;

    return (
      <div {...omit(this.props, ['column', 'spacing'])}
        style={{
          display: 'flex',
          flexFlow: 'row wrap',
          justifyContent: 'flex-start',
          border: '1px solid #fff',
          paddingTop: `${spacing}px`,
          paddingLeft: `${spacing}px`,
          ...style
        }}
      >
        {Children.map(children, (child, index) => {
          const cloneChildren = cloneElement(child, {
            width: (width - spacing * (column + 1) - 2) / column,
            spacing
          });
          return cloneChildren;
        })}
      </div>
    );
  }
}
