import React, { Component } from 'react';
import { Grid } from '@alifd/next';
import LoginIntro from './LoginIntro';
import LoginForm from './LoginForm';

const { Row, Col } = Grid;

export default class CreativeLogin extends Component {
  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <div style={styles.container}>
        <Row wrap>
          <Col l="12">
            <LoginIntro />
          </Col>
          <Col l="12">
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
    backgroundImage: `url(${require('./images/bg.jpg')})`,
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
};
