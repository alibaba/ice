import React, { Component } from 'react';
import { Grid } from '@alifd/next';

const { Row, Col } = Grid;

class StateItem extends Component {
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
        <Col style={{ margin: '0 0 20px 0' }} l={3} s={4} xxs={24}>
          <div style={styles.cover}>
            <img
              alt={data.title}
              style={{ width: 80, height: 80, display: 'block' }}
              src={data.icon}
            />
          </div>
        </Col>
        <Col style={{ margin: '0 0 20px 0' }} l={17} s={14} xxs={24}>
          <h3 style={styles.title}>{data.title}</h3>
          <div style={styles.desc}>{data.desc}</div>
        </Col>
        <Col style={{ margin: '0 0 20px 0' }} l={4} s={4} xxs={24}>
          <div style={{ textAlign: 'center', color: '#333', fontSize: 14 }}>
            {data.status}
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

export default StateItem;
