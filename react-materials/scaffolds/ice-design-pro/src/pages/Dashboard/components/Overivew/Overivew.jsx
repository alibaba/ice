/* eslint react/jsx-no-target-blank: 0 */
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import IceContainer from '@icedesign/container';
import { Balloon, Grid, Icon } from '@alifd/next';

const { Row, Col } = Grid;

export default class Overivew extends Component {
  render() {
    const down = (
      <img
        src={require('./images/TB1ReMsh3vD8KJjy0FlXXagBFXa-12-18.png')}
        style={styles.down}
        alt=""
      />
    );

    const up = (
      <img
        src={require('./images/TB1Q1Msh3vD8KJjy0FlXXagBFXa-12-18.png')}
        style={styles.up}
        alt=""
      />
    );

    const yoy = (
      <div style={styles.desc}>
        <span>
          <FormattedMessage id="app.dashboard.overview.week" /> {down} -200
        </span>
        <span style={{ marginLeft: 5 }}>
          <FormattedMessage id="app.dashboard.overview.day" /> {up} +100
        </span>
      </div>
    );

    const extraIcon = (
      <span style={styles.extraIcon}>
        <Balloon
          trigger={
            <Icon
              type="help"
              size="xs"
              style={{
                position: 'relative',
                top: '-2px',
                color: '#666',
              }}
            />
          }
          triggerType="hover"
          closable={false}
        >
          这里是数据说明
        </Balloon>
      </span>
    );

    return (
      <IceContainer style={styles.container}>
        <Row wrap>
          <Col xxs="24" s="12" l="6" style={styles.item}>
            <div style={styles.title}>
              <FormattedMessage id="app.dashboard.overview.day.sales" />
              {extraIcon}
            </div>
            <div style={styles.count}>￥ 146,657</div>
            {yoy}
          </Col>
          <Col xxs="24" s="12" l="6" style={styles.item}>
            <div style={styles.title}>
              <FormattedMessage id="app.dashboard.overview.today.transactions" />
              {extraIcon}
            </div>
            <div style={styles.count}>92%</div>
            {yoy}
          </Col>
          <Col xxs="24" s="12" l="6" style={styles.item}>
            <div style={styles.title}>
              <FormattedMessage id="app.dashboard.overview.second.transactions" />
              {extraIcon}
            </div>
            <div style={styles.count}>￥ 833</div>
            {yoy}
          </Col>
          <Col xxs="24" s="12" l="6" style={styles.item}>
            <div style={styles.title}>
              <FormattedMessage id="app.dashboard.overview.total.sales" />
              {extraIcon}
            </div>
            <div style={styles.count}>￥ 23,333</div>
            {yoy}
          </Col>
        </Row>
      </IceContainer>
    );
  }
}

const styles = {
  container: {
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '10px 0',
  },
  title: {
    fontSize: '12px',
    marginBottom: '5px',
  },
  count: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '10px 0',
  },
  desc: {
    fontSize: '12px',
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
