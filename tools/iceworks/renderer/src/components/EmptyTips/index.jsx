import React, { Component } from 'react';
import Icon from '../Icon';

export default class extends Component {
  render() {
    const { size = 60, style = {} } = this.props;
    return (
      <div
        style={{
          flex: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          minHeight: 140,
          ...style,
        }}
      >
        <div style={{ color: '#aaa', fontSize: 14 }}>
          <Icon type="tip" style={{ color: 'rgb(48, 128, 254)' }} />{' '}
          {this.props.children}
        </div>
      </div>
    );
  }
}
