import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid } from '@alifd/next';

const { Row, Col } = Grid;

const MOCK_DATA = [
  {
    title: '动态',
    value: '28',
  },
  {
    title: '消息',
    value: '11',
  },
  {
    title: '立项',
    value: '13',
  },
  {
    title: '转正',
    value: '8',
  },
  {
    title: '入职',
    value: '5',
  },
  {
    title: '离职',
    value: '2',
  },
];

export default class Overview extends Component {
  render() {
    return (
      <IceContainer>
        <Row wrap>
          {MOCK_DATA.map((item, index) => {
            return (
              <Col key={index} xxs="12" s="12" l="4">
                <div style={styles.item}>
                  <div style={styles.title}>{item.title}</div>
                  <div style={styles.value}>{item.value}</div>
                </div>
              </Col>
            );
          })}
        </Row>
      </IceContainer>
    );
  }
}

const styles = {
  item: {
    width: '90%',
    height: '90px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto',
    border: '1px solid #eee',
    borderRadius: '4px',
  },
  title: {
    fontSize: '12px',
    marginBottom: '10px',
  },
  value: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
};
