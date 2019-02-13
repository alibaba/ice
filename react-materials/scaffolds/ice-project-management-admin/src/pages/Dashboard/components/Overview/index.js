/* eslint global-require: 0 */
import React, { Component } from 'react';
import { Grid } from '@alifd/next';
import IceContainer from '@icedesign/container';

const { Row, Col } = Grid;

const navigation = [
  {
    title: '今日工作',
    color: '#58ca9a',
    count: '160',
  },
  {
    title: '今日任务',
    color: '#ee706d',
    count: '30',
  },
  {
    title: '已完成任务',
    color: '#f7da47',
    count: '120',
  },
  {
    title: '已归档任务',
    color: '#447eff',
    count: '69',
  },
];

export default class Overview extends Component {
  render() {
    return (
      <Row wrap gutter={20}>
        {navigation.map((item, index) => {
          return (
            <Col xxs="12" l="6" key={index}>
              <IceContainer
                style={{ background: item.color, padding: '30px 0' }}
              >
                <div style={styles.navItem}>
                  <p style={styles.count}>{item.count}</p>
                  <h5 style={styles.title}>{item.title}</h5>
                </div>
              </IceContainer>
            </Col>
          );
        })}
      </Row>
    );
  }
}

const styles = {
  navItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    color: '#fff',
  },
  count: {
    fontWeight: 'bold',
    fontSize: '36px',
    margin: '0 0 10px',
  },
  title: {
    margin: '2px 0',
  },
};
