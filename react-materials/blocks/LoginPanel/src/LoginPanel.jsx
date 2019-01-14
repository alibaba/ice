import React, { Component } from 'react';
import { Grid } from '@alifd/next';
import LoginIntro from './LoginIntro';
import LoginForm from './LoginForm';

const { Row, Col } = Grid;

export default class LoginPanel extends Component {
  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <div style={styles.container}>
        <Row wrap style={styles.row}>
          <Col l="16" style={styles.col}>
            <LoginIntro />
          </Col>
          <Col l="8" style={styles.col}>
            <div style={styles.content}>
              <LoginForm />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

const styles = {
  container: {
    position: 'relative',
    width: '100wh',
    minWidth: '1200px',
    height: '100vh',
  },
  row: {
    padding: '0',
  },
  col: {
    padding: '0',
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    background: '#fff',
  },
};
