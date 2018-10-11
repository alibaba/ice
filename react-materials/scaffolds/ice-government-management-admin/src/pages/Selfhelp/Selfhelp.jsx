import React, { Component } from 'react';
import { Breadcrumb } from '@icedesign/base';
import Container from '@icedesign/container';
import CountBar from './components/CountBar';
import SelfhelpTable from './components/SelfhelpTable';

export default class Selfhelp extends Component {
  static displayName = 'Selfhelp';

  render() {
    return (
      <div>
        <div style={styles.nav}>
          <Breadcrumb style={styles.breadcrumb}>
            <Breadcrumb.Item link="javascript:void(0);">立案管理</Breadcrumb.Item>
            <Breadcrumb.Item link="javascript:void(0);">当事人自助收案</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Container style={styles.container}>
          <CountBar />
        </Container>
        <Container style={styles.container}>
          <SelfhelpTable />
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
