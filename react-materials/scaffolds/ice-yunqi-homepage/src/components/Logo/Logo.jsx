import React, { Component } from 'react';

export default class Logo extends Component {
  render() {
    return (
      <div style={styles.container}>
        <img
          src={require('./images/logo.png')}
          style={styles.logo}
          alt="logo"
        />
        <img
          src={require('./images/logo2.png')}
          style={styles.logo2}
          alt="logo"
        />
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '20px',
  },
  logo: {
    width: '44px',
    marginRight: '16px',
  },
  logo2: {
    width: '152px',
    marginTop: '5px',
  },
};
