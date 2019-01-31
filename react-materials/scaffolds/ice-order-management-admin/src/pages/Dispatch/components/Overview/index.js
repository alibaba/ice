import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid } from '@alifd/next';

const { Row, Col } = Grid;

export default class Overview extends Component {
  render() {
    const { data = [] } = this.props;
    return (
      <Row wrap gutter="20">
        {data.map((item, index) => {
          return (
            <Col l={8} key={index} style={styles.item}>
              <IceContainer
                style={{
                  background: item.background,
                  textAlign: 'center',
                }}
              >
                <div style={styles.title}>{item.title}</div>
                <div style={styles.value}>{item.value}</div>
              </IceContainer>
            </Col>
          );
        })}
      </Row>
    );
  }
}

const styles = {
  item: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '20px 0',
  },
  title: {
    fontSize: '12px',
    marginBottom: '10px',
    color: '#fff',
  },
  value: {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#fff',
  },
};
