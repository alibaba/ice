/* eslint react/prefer-stateless-function:0 */
import React, { Component } from 'react';

export default class Dev extends Component {
  render() {
    return (
      <div>
        <div
          style={{
            width: '100px',
            padding: '5px 8px',
            borderRadius: '6px',
            background: '#2196F3',
            color: '#fff',
            textAlign: 'center',
          }}
          onClick={this.onDev}
        >
          Start Dev
        </div>
        <div>
          log...
        </div>
      </div>
    );
  }

  onDev() {
    
  }
}
