/* eslint react/jsx-no-target-blank: 0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Balloon, Grid, Icon } from '@alifd/next';

const { Row, Col } = Grid;

const mockData = [
  {
    icon: 'atm',
    title: '最新发布活动数',
    desc: '这里是一些说明',
    count: '3,341',
    total: '232,434',
    period: '26%',
  },
  {
    icon: 'upload',
    title: '新增会员数',
    desc: '这里是一些说明',
    count: '882',
    total: '232,349',
    period: '45%',
  },
  {
    icon: 'account',
    title: '新增用户数',
    desc: '这里是一些说明',
    count: '2,823',
    total: '483,475',
    period: '87%',
  },
];

export default class extends Component {
  render() {
    return (
      <IceContainer style={styles.container}>
        <Row wrap>
          {mockData.map((item, index) => {
            return (
              <Col key={index} l="8" style={styles.item}>
                <div style={styles.itemIcon}>
                  <Icon size="xl" type={item.icon} />
                </div>
                <div style={styles.body}>
                  <div style={styles.title}>
                    {item.title}
                    <span style={styles.extraIcon}>
                      <Balloon
                        trigger={<Icon type="help" size="xs" />}
                        triggerType="hover"
                        closable={false}
                        align="t"
                      >
                        {item.desc}
                      </Balloon>
                    </span>
                  </div>
                  <div style={styles.count}>{item.count}</div>
                  <div style={styles.data}>
                    <span>累计 {item.total}</span>
                    <span style={styles.period}>周同比 {item.period}</span>
                  </div>
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
    display: 'flex',
    justifyContent: 'center',
    padding: '10px 0',
  },
  itemIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '20px',
    color: '#4A90E2',
  },
  title: {
    fontSize: '12px',
    marginBottom: '5px',
    color: '#9b9b9b',
  },
  count: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '10px 0',
    color: '#4A90E2',
  },
  data: {
    fontSize: '12px',
    color: '#9b9b9b',
  },
  period: {
    marginLeft: '10px',
  },
  down: {
    width: '6px',
    height: '9px',
  },
  up: {
    width: '6px',
    height: '9px',
  },
  extraIcon: {
    marginLeft: '5px',
    position: 'relative',
    top: '1px',
  },
};
