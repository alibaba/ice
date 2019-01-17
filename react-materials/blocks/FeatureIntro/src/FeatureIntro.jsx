import React, { Component } from 'react';
import { Grid } from '@alifd/next';

const { Row, Col } = Grid;

export default class FeatureIntro extends Component {
  static displayName = 'FeatureIntro';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.content}>
          <h2 style={styles.title}>简短的标题简介</h2>
          <p style={styles.desc}>
            这里可以是一段描述，介绍该系统的相关功能和特点
          </p>
          <Row gutter="40">
            <Col l="8">
              <div style={styles.feature}>快 速</div>
              <p style={styles.featrueTitle}>相关的标题简介</p>
            </Col>
            <Col l="8">
              <div style={styles.feature}>简 约</div>
              <p style={styles.featrueTitle}>相关的标题简介</p>
            </Col>
            <Col l="8">
              <div style={styles.feature}>稳 定</div>
              <p style={styles.featrueTitle}>相关的标题简介</p>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    width: '100%',
    padding: '80px 0',
    background: '#fff',
  },
  content: {
    width: '1200px',
    margin: '0 auto',
  },
  title: {
    margin: '0 0 10px',
    color: '#475168',
    fontSize: '30px',
    fontWeight: '300',
    textAlign: 'center',
  },
  desc: {
    margin: '0 0 20px',
    color: '#8a8b8b',
    fontSize: '18px',
    fontWeight: '300',
    textAlign: 'center',
  },
  feature: {
    minHeight: '220px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '22px',
    fontWeight: '400',
    borderRadius: '4px',
    background: '#f4f4f4',
  },
  featrueTitle: {
    marginTop: '20px',
    fontSize: '14px',
    fontWeight: '300',
    color: '#666',
  },
};
