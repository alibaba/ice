import React, { Component } from 'react';
import Container from '@icedesign/container';
import SelectBar from './components/SelectBar';
import BatchTable from './components/BatchTable';

export default class Batch extends Component {
  static displayName = 'Batch';

  render() {
    return (
      <div>
        <div style={styles.nav}>
          <h2 style={styles.breadcrumb}>批量操作</h2>
        </div>
        <Container style={styles.container}>
          <SelectBar />
        </Container>
        <Container style={styles.container}>
          <BatchTable />
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
    borderLeft: '5px solid #0056f4',
    paddingLeft: '16px',
    margin: '0 0 0 20px',
  },
  container: {
    margin: '20px',
  },
};
