import React, { Component } from 'react';
import { Grid, Icon } from '@alifd/next';
import IceContainer from '@icedesign/container';

const { Row, Col } = Grid;

export default class OverviewCard extends Component {
  static displayName = 'OverviewCard';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Row wrap gutter={20}>
        <Col xxs="24" l="12">
          <IceContainer>
            <div style={styles.iconWrap}>
              <Icon
                size="large"
                type="elipsis"
                style={{ ...styles.icon, left: '0' }}
              />
            </div>
            <Row style={styles.content}>
              <Col l="12" style={styles.line}>
                <div style={{ ...styles.item, ...styles.leftItem }}>
                  <span style={styles.count}>16</span>
                  <span style={styles.label}>所有项目</span>
                </div>
              </Col>
              <Col l="12">
                <div style={{ ...styles.item, ...styles.rightItem }}>
                  <span style={styles.count}>2</span>
                  <span style={styles.label}>活跃项目</span>
                </div>
              </Col>
            </Row>
          </IceContainer>
        </Col>
        <Col xxs="24" l="12">
          <IceContainer>
            <div style={styles.iconWrap}>
              <Icon
                size="large"
                type="account"
                style={{ ...styles.icon, right: '0' }}
              />
            </div>
            <Row style={styles.content}>
              <Col l="12" style={styles.line}>
                <div style={{ ...styles.item, ...styles.leftItem }}>
                  <span style={{ ...styles.count, color: '#35C6D9' }}>
                    63250
                  </span>
                  <span style={styles.label}>注册用户</span>
                </div>
              </Col>
              <Col l="12">
                <div style={{ ...styles.item, ...styles.rightItem }}>
                  <span style={{ ...styles.count, color: '#9DCB6B' }}>97%</span>
                  <span style={styles.label}>活跃用户</span>
                </div>
              </Col>
            </Row>
          </IceContainer>
        </Col>
      </Row>
    );
  }
}

const styles = {
  iconWrap: {
    position: 'relative',
    height: '24px',
  },
  icon: {
    position: 'absolute',
    color: '#999',
  },
  content: {
    textAlign: 'center',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
  },
  leftItem: {
    textAlign: 'right',
    paddingRight: '10px',
  },
  rightItem: {
    textAlign: 'left',
    paddingLeft: '10px',
  },
  count: {
    fontSize: '24px',
    fontWeight: '500',
    marginBottom: '5px',
  },
  label: {
    fontSize: '14px',
    color: '#666',
    fontWeight: 'bold',
  },
  line: {
    borderRight: '1px solid #eee',
  },
};
