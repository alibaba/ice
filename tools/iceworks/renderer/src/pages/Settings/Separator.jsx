import React, { Component } from 'react';

import './separator.scss';

class Separator extends Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          padding: '0 20px',
          lineHeight: '36px',
        }}
      >
        <div
          style={{
            fontSize: 16,
            fontWeight: 400,
            color: '#444',
            paddingRight: 10,
          }}
        >
          {this.props.title}
        </div>
        <div className="separator-line" style={{ flex: 'auto' }} />
        {this.props.additional && (
          <div className="separator-additional" style={{ paddingLeft: 10 }}>
            {this.props.additional}
          </div>
        )}
      </div>
    );
  }
}

export default Separator;
