import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid, Icon } from '@alifd/next';

const { Row, Col } = Grid;

const mockData = () => {
  return Array.from({ length: 10 }).map((item, index) => {
    return {
      name: '@ice/builder-miniapp',
      value: index + 1,
    };
  });
};

export default class InfiniteCard extends Component {
  static displayName = 'InfiniteCard';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <IceContainer>
        <h4 style={styles.cardTitle}>构建器更新动态</h4>
        <Row gutter="10" style={{ overflow: 'scroll' }}>
          {mockData().map((item, index) => {
            return (
              <Col l="4" key={index} style={{ background: 'red' }}>
                <a href="#">
                  <div style={styles.miniCard}>
                    <div style={styles.label}>{item.name}</div>
                    <div style={styles.value}>
                      在<span style={styles.time}>{item.value} 小时前</span>
                      更新了版本
                    </div>
                    <Icon
                      type="arrow-right"
                      size="xs"
                      style={styles.arrowIcon}
                    />
                  </div>
                </a>
              </Col>
            );
          })}
        </Row>
      </IceContainer>
    );
  }
}

const styles = {
  cardTitle: {
    margin: '0 0 20px',
    fontSize: '18px',
    paddingBottom: '15px',
    fontWeight: 'bold',
    borderBottom: '1px solid #eee',
  },
  miniCard: {
    position: 'relative',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #eee',
    color: '#666',
  },
  label: {
    marginBottom: '8px',
    fontWeight: '600',
    color: '#333',
    fontSize: '14px',
    height: '14px',
    lineHeight: '14px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  time: {
    color: '#0abc3c',
    fontWeight: '600',
    padding: '0 4px',
  },
  arrowIcon: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '22px',
    height: '22px',
    top: '20px',
    right: '10px',
    borderRadius: '50%',
    border: '1px solid #eee',
    color: '#eee',
  },
};
