import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import routerConfig from '../../routerConfig';

export default class BasicLayout extends Component {
  render() {
    return (
      <div style={styles.container}>
        {/* Aside */}
        <div style={styles.aside} />

        {/* Main */}
        <div style={styles.main}>
          {/* Header */}
          <div style={styles.header} />

          {/* Content */}
          <div style={styles.content}>
            {routerConfig.map((item, index) => (
              <Route
                exact
                path={item.path}
                key={index}
                component={item.component}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    background: '#eee',
  },
  aside: {
    width: '240px',
    background: '#06152a',
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1',
  },
  header: {
    width: '100%',
    height: '64px',
    boxShadow: '0 1px 4px rgba(0,21,41,.08)',
    background: '#fff',
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '100vh',
    margin: '20px',
    background: '#fff',
    borderRadius: '4px',
  },
};
