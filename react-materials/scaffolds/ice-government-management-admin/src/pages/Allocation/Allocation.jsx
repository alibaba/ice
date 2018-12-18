import React, { Component } from 'react';
import Container from '@icedesign/container';
import SearchBar from './components/SearchBar';
import AllocationTable from './components/AllocationTable';

export default class Allocation extends Component {
  static displayName = 'Allocation';

  render() {
    return (
      <div>
        <div style={styles.nav}>
          <h2 style={styles.breadcrumb}>案款账号分配</h2>
        </div>
        <SearchBar />
        <Container style={styles.container}>
          <AllocationTable />
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
