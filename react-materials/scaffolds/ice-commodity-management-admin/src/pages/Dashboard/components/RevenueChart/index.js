import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid, Balloon, Icon } from '@alifd/next';
import DonutChart from './DonutChart';

const { Row, Col } = Grid;

export default class RevenueChart extends Component {
  render() {
    return (
      <IceContainer title="收入概览">
        <Row>
          <Col l="8">
            <DonutChart />
          </Col>
          <Col l="16">
            <div style={styles.profile}>
              <div style={styles.cell}>
                <div style={styles.head}>
                  <span style={{ ...styles.circle, ...styles.purple }} />
                  <div style={styles.cellTitle}>实体店收入</div>
                  <Balloon
                    trigger={<Icon type="prompt" size="small" />}
                    align="t"
                    closable={false}
                    alignEdge
                    triggerType="hover"
                    style={{ width: 300 }}
                  >
                    实体店收入的相关简介
                  </Balloon>
                </div>
                <div style={styles.body}>
                  <span style={styles.costValue}>567.89</span>
                  <span style={styles.costUnit}>万元</span>
                </div>
                <div style={styles.footer}>
                  <span style={styles.footerText}>环比</span>
                  <span style={styles.footerValue}>66.99%</span>
                </div>
              </div>
              <div style={styles.cell}>
                <div style={styles.head}>
                  <span style={{ ...styles.circle, ...styles.green }} />
                  <div style={styles.cellTitle}>网上零售收入</div>
                  <Balloon
                    trigger={<Icon type="prompt" size="small" />}
                    align="t"
                    closable={false}
                    alignEdge
                    triggerType="hover"
                    style={{ width: 300 }}
                  >
                    网上零售收入的相关简介
                  </Balloon>
                </div>
                <div style={styles.body}>
                  <span style={styles.costValue}>123,45</span>
                  <span style={styles.costUnit}>万元</span>
                </div>
                <div style={styles.footer}>
                  <span style={styles.footerText}>环比</span>
                  <span style={styles.footerValue}>18.88%</span>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </IceContainer>
    );
  }
}

const styles = {
  profile: {
    margin: '68px 0',
    display: 'flex',
  },
  head: {
    display: 'flex',
    alignItems: 'center',
  },
  circle: {
    width: '10px',
    height: '10px',
    marginRight: '10px',
    display: 'inline-block',
    borderRadius: '5px',
  },
  purple: {
    background: '#908ce1',
  },
  green: {
    background: '#26c9ad',
  },
  cell: {
    width: '50%',
    padding: '0 10px',
  },
  cellTitle: {
    color: '#666',
    lineHeight: '14px',
    fontSize: '14px',
    marginRight: '5px',
  },
  body: {
    display: 'flex',
    alignItems: 'baseline',
    marginTop: '20px',
  },
  costValue: {
    fontSize: '32px',
    fontWeight: '500',
    lineHeight: '30px',
    height: '30px',
    color: '#333',
  },
  costUnit: {
    marginLeft: '2px',
    fontSize: '12px',
    color: '#333',
  },
  footer: {
    display: 'flex',
    marginTop: '10px',
    fontSize: '12px',
    color: '#999',
  },
  footerText: {
    marginRight: '60px',
  },
};
