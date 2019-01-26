import React, { Component } from 'react';
import { Grid, Icon } from '@alifd/next';
import CountUp from 'react-countup';
import ColumnChart from '../ColumnChart';
import ContainerCard from '../../../../components/ContainerCard';
import styles from './index.module.scss';

const { Row, Col } = Grid;
const MOCK_DATA = [
  {
    title: '累计借款总额',
    amount: '1293',
    percent: '15%',
    increase: true,
    background: '#447eff',
    footer: [
      {
        label: '累计借款笔数',
        value: '2,321',
      },
      {
        label: '借款均额',
        value: '3,432',
      },
    ],
  },
  {
    title: '到期借款总额',
    amount: '758',
    percent: '1.3%',
    increase: false,
    background: '#58ca9a',
    footer: [
      {
        label: '到期笔数',
        value: '384,123',
      },
      {
        label: '净坏账率',
        value: '23.12%',
      },
    ],
  },
  {
    title: '今日还款总额',
    amount: '3659',
    percent: '20%',
    increase: true,
    background: '#f7da47',
    footer: [
      {
        label: '今日还款笔数',
        value: '283,323',
      },
      {
        label: '按时还款率',
        value: '58.69%',
      },
    ],
  },
  {
    title: '逾期未还本金',
    amount: '298',
    percent: '12%',
    increase: false,
    background: '#ee706d',
    footer: [
      {
        label: '逾期笔数',
        value: '239',
      },
      {
        label: '逾期率',
        value: '12.38%',
      },
    ],
  },
  {
    title: 'T-1日新增用户购买转化',
    amount: '29231',
    percent: '87%',
    increase: true,
    background: '#447eff',
  },
];

export default class OverviewSatesChart extends Component {
  render() {
    return (
      <div className={styles.container}>
        <Row wrap gutter={20}>
          {MOCK_DATA.map((item, index) => {
            const col = item.footer ? 4 : 8;
            return (
              <Col xxs="24" l={col} key={index}>
                <ContainerCard>
                  <div className={styles.summary}>
                    <p className={styles.title}>{item.title}</p>
                    <div className={styles.data}>
                      <h2 className={styles.amount}>
                        <CountUp start={0} end={item.amount} />万
                      </h2>
                      <div className={styles.percent}>
                        {item.percent}{' '}
                        <Icon
                          type={`arrow-${
                            item.increase ? 'up' : 'down'
                          }-filling`}
                          size="xs"
                          className={styles.arrowIcon}
                        />
                      </div>
                    </div>
                  </div>
                  {item.footer && Array.isArray(item.footer) ? (
                    <div className={styles.footer}>
                      {item.footer.map((info, idx) => {
                        return (
                          <div className={styles.itemBody} key={idx}>
                            <div className={styles.itemLabel}>{info.label}</div>
                            <div className={styles.itemValue}>{info.value}</div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <ColumnChart color={item.background} />
                  )}
                </ContainerCard>
              </Col>
            );
          })}
        </Row>
      </div>
    );
  }
}
