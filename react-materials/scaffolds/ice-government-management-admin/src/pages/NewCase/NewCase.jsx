import React, { Component } from 'react';
import Container from '@icedesign/container';
import Form from './components/Form';

export default class NewCase extends Component {
  render() {
    return (
      <div>
        <div style={styles.nav}>
          <h2 style={styles.breadcrumb}>案件录入</h2>
        </div>
        <Container style={styles.container}>
          <Form />
        </Container>
      </div>
    );
  }
}

const styles = {
  nav: {
    background: 'white',
    height: '72px',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  breadcrumb: {
    borderLeft: '5px solid #447eff',
    paddingLeft: '16px',
    margin: '0 0 0 20px',
  },
  container: {
    margin: '20px',
  },
};
