import React, { Component } from 'react';

/**
 * List中每个单元对应组件
 */
class ListItem extends Component {
  render() {
    const {children, width, spacing, style} = this.props;
    return (
      <div style={{
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

export default ListItem;
