import React, { Component } from 'react';
import { Grid } from '@alifd/next';

const { Row, Col } = Grid;

class FeatureItem extends Component {
  render() {
    const { data } = this.props;
    return (
      <Row
        wrap
        style={{
          paddingTop: 20,
          alignItems: 'center',
          borderBottom: '1px solid #f4f4f4',
        }}
      >
        <Col l={3} s={4} xxs={24} style={{ margin: '0 0 20px 0' }}>
          <div style={styles.cover}>
            <img
              alt={data.title}
              style={{ width: 80, height: 80, display: 'block' }}
              src={data.icon}
            />
          </div>
        </Col>
        <Col l={11} s={10} xxs={24} style={{ margin: '0 0 20px 0' }}>
          <h3 style={styles.title}>{data.title}</h3>
          <div style={styles.desc}>{data.desc}</div>
        </Col>
        <Col l={4} s={4} xxs={24} style={{ margin: '0 0 20px 0' }}>
          <div style={{ textAlign: 'center', color: '#999', fontSize: 12 }}>
            {data.status}
          </div>
        </Col>
        <Col l={6} s={6} xxs={24} style={{ margin: '0 0 20px 0' }}>
          <div style={styles.desc}>{data.detail}</div>
          <div>
            <a href={data.url} style={{ fontSize: 12 }}>
              了解详情
            </a>
          </div>
        </Col>
      </Row>
    );
  }
}

const styles = {
  title: {
    margin: 0,
    fontSize: 16,
  },
  desc: {
    fontSize: 12,
    color: '#999',
    lineHeight: '20px',
  },
};

export default FeatureItem;
