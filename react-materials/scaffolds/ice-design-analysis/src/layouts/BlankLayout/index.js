import React, { Component } from 'react';
import MainRoutes from './MainRoutes';

export default class BlankLayout extends Component {
  render() {
    return (
      <div style={styles.container}>
        <MainRoutes />
      </div>
    );
  }
}

const styles = {
  container: {
    minHeight: '100vh',
    minWidth: '1200px',
  },
};
