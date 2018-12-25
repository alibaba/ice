import React, { Component } from 'react';
import Container from '@icedesign/container';
import SearchBar from './components/SearchBar';
import ListTable from './components/ListTable';

export default class List extends Component {
  static displayName = 'List';

  render() {
    return (
      <div>
        <div style={styles.nav}>
          <h2 style={styles.breadcrumb}>在办案件列表</h2>
        </div>
        <SearchBar />
        <Container style={styles.container}>
          <ListTable />
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
