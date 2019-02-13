import React, { Component } from 'react';
import Container from '@icedesign/container';
import CountBar from './components/CountBar';
import SelfhelpTable from './components/SelfhelpTable';
import styles from './index.module.scss';

export default class Selfhelp extends Component {
  static displayName = 'Selfhelp';

  render() {
    return (
      <div>
        <div className={styles.nav}>
          <h2 className={styles.breadcrumb}>当事人自助收案</h2>
        </div>
        <Container className={styles.container}>
          <CountBar />
        </Container>
        <Container className={styles.container}>
          <SelfhelpTable />
        </Container>
      </div>
    );
  }
}
