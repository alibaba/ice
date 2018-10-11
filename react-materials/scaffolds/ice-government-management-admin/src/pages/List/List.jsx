import React, { Component } from 'react';
import { Breadcrumb } from '@icedesign/base';
import Container from '@icedesign/container';
import SearchBar from './components/SearchBar';
import ListTable from './components/ListTable';

export default class List extends Component {
  static displayName = 'List';

  render() {
    return (
      <div>
        <div style={styles.nav}>
          <Breadcrumb style={styles.breadcrumb}>
            <Breadcrumb.Item link="javascript:void(0);">立案管理</Breadcrumb.Item>
            <Breadcrumb.Item link="javascript:void(0);">在办案件列表</Breadcrumb.Item>
          </Breadcrumb>
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
