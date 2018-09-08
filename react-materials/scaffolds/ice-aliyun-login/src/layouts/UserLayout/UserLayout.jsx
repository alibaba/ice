import React, { Component } from 'react';
import { Grid } from '@icedesign/base';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginIntro from '../../components/LoginIntro';

const { Row, Col } = Grid;

export default class UserLayout extends Component {
  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <div style={styles.container}>
        <Header />
        <Row wrap style={styles.content}>
          <Col l="12">
            <LoginIntro />
          </Col>
          <Col l="12">
            <div style={styles.content}>{this.props.children}</div>
          </Col>
        </Row>
        <Footer />
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
    backgroundSize: 'cover',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
