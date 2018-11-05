import React, { Component } from 'react';

class ColorBlock extends Component {
  render() {
    const { backgroundColor } = this.props;
    return (
      <div
        style={{
          border: '3px solid #fff',
          borderRadius: 2,
          height: 20,
          width: 50,
          backgroundColor,
          boxShadow: '0 0 1px rgba(0,0,0,0.5)',
        }}
      />
    );
  }
}

export default ColorBlock;
