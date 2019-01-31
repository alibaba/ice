import React, { Component } from 'react';
import Container from '@icedesign/container';
import SelectBar from './components/SelectBar';
import BatchTable from './components/BatchTable';
import styles from './index.module.scss';

export default class Batch extends Component {
  static displayName = 'Batch';

  render() {
    return (
      <div>
        <div className={styles.nav}>
          <h2 className={styles.breadcrumb}>批量操作</h2>
        </div>
        <Container className={styles.container}>
          <SelectBar />
        </Container>
        <Container className={styles.container}>
          <BatchTable />
        </Container>
      </div>
    );
  }
}
