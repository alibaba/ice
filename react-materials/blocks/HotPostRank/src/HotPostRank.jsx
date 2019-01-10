import Container from '@icedesign/container';
import React, { Component } from 'react';
import { Grid, Pagination } from '@alifd/next';

import HotPostRankItem from './HotPostRankItem';

const { Row, Col } = Grid;

function mockData(page = 1) {
  return Array.from({ length: 15 }).map((n, i) => {
    return {
      index: i + 1 + (page - 1) * 15,
      keyword: [
        '情人节礼物 送女友',
        '感动男朋友的礼物',
        '不规则卫衣女',
        '秋装新款女外套',
      ][i % 4],
      total: 150 * (15 - i),
      percent: 100 - i * 2.8,
      url: '#',
    };
  });
}

export default class HotPostRank extends Component {
  static displayName = 'HotPostRank';

  constructor(props) {
    super(props);
    this.state = {
      dataSource: mockData(1),
    };
  }

  handlePageChange = (page) => {
    this.setState({ dataSource: mockData(page) });
  };

  render() {
    return (
      <Container>
        <div style={styles.header}>
          <h3 style={{ fontSize: 16, color: '#333', margin: 0 }}>
            粉丝最新关注点
          </h3>
          <span style={{ fontSize: 12, color: '#999' }}>
            每日计算分析产出粉丝近期最新关注点
          </span>
        </div>

        <Row wrap>
          <Col style={{ borderRight: '1px solid #eee' }}>
            {this.state.dataSource
              .filter((item, index) => {
                return Math.floor(index / 5) % 3 == 0; // 前10个
              })
              .map((item, index) => {
                return <HotPostRankItem key={index} data={item} />;
              })}
          </Col>
          <Col style={{ borderRight: '1px solid #eee' }}>
            {this.state.dataSource
              .filter((item, index) => {
                return Math.floor(index / 5) % 3 == 1; // 前20个
              })
              .map((item, key) => {
                return <HotPostRankItem key={key} data={item} />;
              })}
          </Col>
          <Col>
            {this.state.dataSource
              .filter((item, index) => {
                return Math.floor(index / 5) % 3 == 2; // 前15个
              })
              .map((item, key) => {
                return <HotPostRankItem key={key} data={item} />;
              })}
          </Col>
        </Row>
        <div style={{ textAlign: 'right', marginTop: 10 }}>
          <Pagination onChange={this.handlePageChange} />
        </div>
      </Container>
    );
  }
}

const styles = {
  header: {
    marginBottom: 20,
  },
  HotPostRankList: {},
};
