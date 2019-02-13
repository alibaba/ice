import React, { Component } from 'react';
import { Grid } from '@alifd/next';
import ForgetPasswordIntro from './ForgetPasswordIntro';
import ForgetPasswordForm from './ForgetPasswordForm';

const { Row, Col } = Grid;

export default class CreativeForgetPassword extends Component {
  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <div style={styles.container}>
        <Row wrap>
          <Col l="12">
            <ForgetPasswordIntro />
          </Col>
          <Col l="12">
            <div style={styles.content}>
              <ForgetPasswordForm />
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
