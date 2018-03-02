import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import ArticleList from './ArticleList';

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

const ICON = {
  active: 'https://gw.alicdn.com/tfs/TB1bQQ4ihrI8KJjy0FpXXb5hVXa-20-24.png',
  inactive: 'https://gw.alicdn.com/tfs/TB1PwspilfH8KJjy1XbXXbLdXXa-20-24.png',
};

export default class TabArticle extends Component {
  static displayName = 'TabArticle';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="tab-article">
        <IceContainer style={styles.tabList}>
          <div
            style={{
              ...styles.tab,
              ...styles.active,
            }}
          >
            最新 <img src={ICON.active} style={styles.icon} alt="最新" />
          </div>
          <div style={styles.tab}>
            最热 <img src={ICON.inactive} style={styles.icon} alt="最热" />
          </div>
          <div style={styles.tab}>
            距离截稿日期最近{' '}
            <img
              src={ICON.inactive}
              style={styles.icon}
              alt="距离截稿日期最近"
            />
          </div>
        </IceContainer>
        <ArticleList dataSource={dataSource} />
      </div>
    );
  }
}

const styles = {
  tabList: {
    display: 'flex',
    flexDirection: 'row',
  },
  icon: {
    width: '10px',
    height: '12px',
  },
  tab: {
    cursor: 'pointer',
    marginRight: '20px',
  },
  tabActive: {
    color: '#3080FE',
  },
};
