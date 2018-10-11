import React, { Component } from 'react';
import { Breadcrumb } from '@icedesign/base';
import Container from '@icedesign/container';
import SelectBar from './components/SelectBar';
import BatchTable from './components/BatchTable';

export default class Batch extends Component {
  static displayName = 'Batch';

  render() {
    return (
      <div>
        <div style={styles.nav}>
          <Breadcrumb style={styles.breadcrumb}>
            <Breadcrumb.Item link="javascript:void(0);">立案管理</Breadcrumb.Item>
            <Breadcrumb.Item link="javascript:void(0);">批量操作</Breadcrumb.Item>
          </Breadcrumb>
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
