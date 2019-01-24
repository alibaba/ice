import React, { Component } from 'react';
import Container from '@icedesign/container';
import Form from './components/Form';
import styles from './index.module.scss';

export default class NewCase extends Component {
  render() {
    return (
      <div>
        <div className={styles.nav}>
          <h2 className={styles.breadcrumb}>案件录入</h2>
        </div>
        <Container className={styles.container}>
          <Form />
        </Container>
      </div>
    );
  }
}
