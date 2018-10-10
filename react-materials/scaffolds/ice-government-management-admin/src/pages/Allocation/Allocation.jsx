import React, { Component } from 'react';
import { Breadcrumb } from '@icedesign/base';
import Container from '@icedesign/container';
import SearchBar from './components/SearchBar';
import AllocationTable from './components/AllocationTable';

export default class Allocation extends Component {
  static displayName = 'Allocation';

  render() {
    return (
      <div>
        <div style={styles.nav}>
          <Breadcrumb style={styles.breadcrumb}>
            <Breadcrumb.Item link="javascript:void(0);">立案管理</Breadcrumb.Item>
            <Breadcrumb.Item link="javascript:void(0);">案款账号分配</Breadcrumb.Item>
          </Breadcrumb>
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
    flexDirection: 'column'
  },
  breadcrumb: {
    borderLeft: '5px solid #0056f4',
    paddingLeft: '16px',
    margin: '0 0 0 20px'
  },
  container: {
    margin: '20px'
  }
};
