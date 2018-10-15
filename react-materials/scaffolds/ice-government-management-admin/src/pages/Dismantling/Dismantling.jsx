import React, { Component } from 'react';
import Container from '@icedesign/container';
import SearchBar from './components/SearchBar';
import DismantlingTable from './components/DismantlingTable';

export default class Dismantling extends Component {
  static displayName = 'Dismantling';

  render() {
    return (
      <div>
        <div style={styles.nav}>
          <h2 style={styles.breadcrumb}>拆预收案</h2>
        </div>
        <SearchBar />
        <Container style={styles.container}>
          <DismantlingTable />
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
