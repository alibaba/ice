import React from 'react';

/**
 * List中每个单元对应组件
 */
const Item = ({ children, width, spacing, style }) => {
  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        marginRight: `${spacing}px`,
        marginBottom: `${spacing}px`,
      }}
    >
      <div
        style={{
          ...style,
          width,
        }}
      >
        {children}
      </div>
    </div>
  );
};
export default Item;
