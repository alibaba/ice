import React, { Component } from 'react';
import Container from '@icedesign/container';
import SearchBar from './components/SearchBar';
import ListTable from './components/ListTable';
import styles from './index.module.scss';

export default class List extends Component {
  static displayName = 'List';

  render() {
    return (
      <div>
        <div className={styles.nav}>
          <h2 className={styles.breadcrumb}>在办案件列表</h2>
        </div>
        <SearchBar />
        <Container className={styles.container}>
          <ListTable />
        </Container>
      </div>
    );
  }
}
