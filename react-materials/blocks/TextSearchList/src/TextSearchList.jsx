import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Search, Grid } from '@alifd/next';
import ArticleList from './ArticleList';
import Filter from './Filter';

const { Row, Col } = Grid;

const dataSource = [
  {
    title: '越夏越嗨皮-7月官方营销活动-技能提升方向',
    description:
      '商家通过V任务选择主播并达成合作，费用按照商品链接计算，一个商品为一个价格，建议主播在一场直播里最多接60个商品，并提供不少于两个小时的直播服务，每个商品讲解时间不少于5分钟。 ',
    tags: ['直播', '大促', '简介'],
    datetime: '2017年12月12日 18:00',
    star: 130,
    like: 233,
    comment: 123,
  },
  {
    title: '越夏越嗨皮-7月官方营销活动-技能提升方向',
    description:
      '商家通过V任务选择主播并达成合作，费用按照商品链接计算，一个商品为一个价格，建议主播在一场直播里最多接60个商品，并提供不少于两个小时的直播服务，每个商品讲解时间不少于5分钟。 ',
    tags: ['直播', '大促', '简介'],
    datetime: '2017年12月12日 18:00',
    star: 130,
    like: 233,
    comment: 123,
  },
  {
    title: '越夏越嗨皮-7月官方营销活动-技能提升方向',
    description:
      '商家通过V任务选择主播并达成合作，费用按照商品链接计算，一个商品为一个价格，建议主播在一场直播里最多接60个商品，并提供不少于两个小时的直播服务，每个商品讲解时间不少于5分钟。 ',
    tags: ['直播', '大促', '简介'],
    datetime: '2017年12月12日 18:00',
    star: 130,
    like: 233,
    comment: 123,
  },
  {
    title: '越夏越嗨皮-7月官方营销活动-技能提升方向',
    description:
      '商家通过V任务选择主播并达成合作，费用按照商品链接计算，一个商品为一个价格，建议主播在一场直播里最多接60个商品，并提供不少于两个小时的直播服务，每个商品讲解时间不少于5分钟。 ',
    tags: ['直播', '大促', '简介'],
    datetime: '2017年12月12日 18:00',
    star: 130,
    like: 233,
    comment: 123,
  },
  {
    title: '越夏越嗨皮-7月官方营销活动-技能提升方向',
    description:
      '商家通过V任务选择主播并达成合作，费用按照商品链接计算，一个商品为一个价格，建议主播在一场直播里最多接60个商品，并提供不少于两个小时的直播服务，每个商品讲解时间不少于5分钟。 ',
    tags: ['直播', '大促', '简介'],
    datetime: '2017年12月12日 18:00',
    star: 130,
    like: 233,
    comment: 123,
  },
];

export default class TextSearchList extends Component {
  static displayName = 'TextSearchList';

  render() {
    return (
      <div className="text-search-list">
        <IceContainer>
          <Row>
            <Col l="16">
              <Search
                size="large"
                style={{ width: '100%' }}
                searchText="搜索"
                placeholder="请输入要搜索的关键词或商品链接"
              />
            </Col>
          </Row>
        </IceContainer>
        <Filter />
        <ArticleList dataSource={dataSource} />
      </div>
    );
  }
}
