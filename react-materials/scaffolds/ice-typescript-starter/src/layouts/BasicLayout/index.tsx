import React, { Component } from 'react';
import MainRoutes from './MainRoutes';

export default class BasicLayout extends Component {
  render() {
    return (
      <div style={{ paddingTop: '100px' }}>
        <MainRoutes />
      </div>
    );
  }
}
