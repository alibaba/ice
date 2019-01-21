/* eslint react/jsx-no-target-blank: 0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Balloon, Grid, Icon } from '@alifd/next';
import ContainerTitle from '../../../../components/ContainerTitle';

const { Row, Col } = Grid;

export default class BasicIndicator extends Component {
  render() {
    const down = <Icon type="descending" size="xs" style={styles.downIcon} />;
    const up = <Icon type="ascending" size="xs" style={styles.upIcon} />;

    return (
      <IceContainer style={styles.container}>
        <ContainerTitle title="基本指标" />
        <Row wrap>
          <Col xxs="24" s="12" l="6" style={styles.item}>
            <div style={styles.title}>
              昨日 UV
              <span style={styles.extraIcon}>
                <Balloon
                  trigger={<Icon type="help" size="xs" />}
                  triggerType="hover"
                  closable={false}
                >
                  昨日 01-03 访问的用户数
                </Balloon>
              </span>
            </div>
            <div style={styles.count}>6,657</div>
            <div style={styles.desc}>
              <span>较前日 {down} -200</span>
              <span style={{ marginLeft: '15px' }}>近7天 {up} +100</span>
            </div>
          </Col>
          <Col xxs="24" s="12" l="6" style={styles.item}>
            <div style={styles.title}>
              昨日 PV
              <span style={styles.extraIcon}>
                <Balloon
                  trigger={<Icon type="help" size="xs" />}
                  triggerType="hover"
                  closable={false}
                >
                  昨日 01-03 访问的次数
                </Balloon>
              </span>
            </div>
            <div style={styles.count}>30,533</div>
            <div style={styles.desc}>
              <span>较前日 {down} -200</span>
              <span style={{ marginLeft: '15px' }}>近7天 {up} +100</span>
            </div>
          </Col>
          <Col xxs="24" s="12" l="6" style={styles.item}>
            <div style={styles.title}>
              本周截至昨日活跃用户
              <span style={styles.extraIcon}>
                <Balloon
                  trigger={<Icon type="help" size="xs" />}
                  triggerType="hover"
                  closable={false}
                >
                  12-31 ~ 01-03 访问用户数
                </Balloon>
              </span>
            </div>
            <div style={styles.count}>2,233</div>
            <div style={styles.desc}>
              <span>较前日 {down} -200</span>
              <span style={{ marginLeft: '15px' }}>近7天 {up} +100</span>
            </div>
          </Col>
          <Col xxs="24" s="12" l="6" style={styles.item}>
            <div style={styles.title}>
              本月截至昨日活跃用户
              <span style={styles.extraIcon}>
                <Balloon
                  trigger={<Icon type="help" size="xs" />}
                  triggerType="hover"
                  closable={false}
                >
                  01-01 ~ 01-03 访问用户数
                </Balloon>
              </span>
            </div>
            <div style={styles.count}>6,691</div>
            <div style={styles.desc}>
              <span>较前日 {down} -200</span>
              <span style={{ marginLeft: '15px' }}>近7天 {up} +100</span>
            </div>
          </Col>
        </Row>
      </IceContainer>
    );
  }
}

const styles = {
  item: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '10px 20px',
  },
  title: {
    fontSize: '12px',
    marginTop: '10px',
    color: '#666',
  },
  count: {
    color: '#447eff',
    fontSize: '24px',
    margin: '10px 0',
  },
  desc: {
    fontSize: '12px',
    color: '#999',
  },
  extraIcon: {
    marginLeft: '5px',
    position: 'relative',
    top: '1px',
  },
  downIcon: {
    color: 'green',
  },
  upIcon: {
    color: 'red',
  },
};
