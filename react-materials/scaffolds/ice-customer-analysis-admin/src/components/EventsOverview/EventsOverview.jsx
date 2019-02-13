/* eslint react/jsx-no-target-blank: 0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Balloon, Grid } from '@alifd/next';
import Icon from '@icedesign/foundation-symbol';
import styles from './index.module.scss';

const { Row, Col } = Grid;

const mockData = [
  {
    icon: 'shop',
    title: '到店用户数',
    desc: '这里是一些说明',
    count: '3,341',
    total: '232,434',
    period: '26%',
  },
  {
    icon: 'coupons',
    title: '新增会员卡用户数',
    desc: '这里是一些说明',
    count: '882',
    total: '32,349',
    period: '45%',
  },
  {
    icon: 'person',
    title: '新增用户数',
    desc: '这里是一些说明',
    count: '2,823',
    total: '483,475',
    period: '87%',
  },
];

export default class EventsOverview extends Component {
  render() {
    return (
      <IceContainer className={styles.container}>
        <Row wrap>
          {mockData.map((item, index) => {
            return (
              <Col key={index} l="8" className={styles.item}>
                <div className={styles.itemIcon}>
                  <Icon size="xl" type={item.icon} />
                </div>
                <div className={styles.body}>
                  <div className={styles.title}>
                    {item.title}
                    <span className={styles.extraIcon}>
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
                  <div className={styles.count}>{item.count}</div>
                  <div className={styles.data}>
                    <span>累计 {item.total}</span>
                    <span className={styles.period}>周同比 {item.period}</span>
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
