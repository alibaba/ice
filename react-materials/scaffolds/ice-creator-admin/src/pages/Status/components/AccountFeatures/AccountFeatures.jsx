import React, { Component } from 'react';
import Container from '@icedesign/container';
import FeatureItem from './FeatureItem';

export default class AccountFeatures extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [
        {
          icon: require('./images/fly.png'),
          title: '微淘推送',
          desc:
            '微淘是达人的粉丝回访主阵地。推送到微淘的内容，可以通过微淘内容流展现给粉丝，粉丝喜爱的内容将获得平台推荐',
          status: '10条/天',
          detail:
            '各等级可推送条数不同，L0、L1达人每日可发布1条，L2及以上达人每日可发布10条（具体规则详见达人成长-等级权益）；注：账号升级后，约一至两天内微淘条数生效',
          url: '#',
        },
        {
          icon: require('./images/v.png'),
          title: '阿里V任务',
          desc:
            '阿里V任务是阿里官方内容推广平台。无缝连接达人与商家，达人可以通过营销推广任务与商家进行合作，实现内容变现',
          status: '已开通',
          detail:
            '阿里V任务是阿里官方内容推广平台。无缝连接达人与商家，达人可以通过营销推广任务与商家进行合作，实现内容变现',
          url: '#',
        },
        {
          icon: require('./images/cps.png'),
          title: 'CPS结算权限',
          desc:
            'CPS为按成交付费的商业化模式。获得CPS结算权限的达人，其内容中推荐商品引导成交，即可获得商家设置的淘宝客佣金收入；注：账号升级后，约一至两天内结算权限生效',
          status: '已开通',
          detail: '面对L2及以上等级达人，以及有部分频道权限的达人开放',
          url: '#',
        },
        {
          icon: require('./images/post.png'),
          title: '内容号推送',
          desc:
            '内容号是达人专属的粉丝强回访阵地。通过内容号推送的内容，可以精准推送给粉丝，粉丝在手机淘宝-消息-内容号中查看消息',
          status: '10条/天',
          detail: '面对L4及以上的非店铺达人开放',
          url: '#',
        },
      ],
    };
  }

  render() {
    return (
      <Container>
        <div style={styles.header}>
          <h2 style={{ margin: 0, fontSize: 16 }}>功能状态</h2>
        </div>
        <div style={styles.body}>
          {this.state.dataSource.map((item, index) => {
            return <FeatureItem data={item} key={index} />;
          })}
        </div>
      </Container>
    );
  }
}

const styles = {
  header: {
    fontSize: 16,
  },
};
