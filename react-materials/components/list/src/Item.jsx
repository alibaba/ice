import React, { Component } from 'react';
 /**
 * List中每个单元对应组件
 */
export default class ListItem extends Component {
  render() {
    const {children, width, spacing, style, ...others} = this.props;
    return (
      <div {...others} style={{
        position: 'relative',
        overflow: 'hidden',
        marginRight: `${spacing}px`,
        marginBottom: `${spacing}px`
      }}>
        <div style={{
          ...style,
          width
        }}>
          {children}
        </div>
      </div>
    );
  }
}
