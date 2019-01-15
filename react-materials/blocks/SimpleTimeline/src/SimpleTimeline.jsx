import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Timeline } from '@alifd/next';

const { Item: TimelineItem } = Timeline;

export default class SimpleTimeline extends Component {
  static displayName = 'SimpleTimeline';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <IceContainer title="物流信息">
        <Timeline
          fold={[
            { foldArea: [1, 2], foldShow: false },
            { foldArea: [5], foldShow: false },
          ]}
        >
          <TimelineItem
            title="签收"
            content="【杭州市】已签收,签收人是阿里巴巴小邮局，感谢使用申通快递，期待再次为您服务"
            time="2016-06-10 10:30:00"
            state="process"
          />
          <TimelineItem
            title="派送"
            content="【杭州市】快件已到达 浙江杭州滨江公司"
            time="2016-06-10 09:30:00"
          />
          <TimelineItem
            title="派送"
            content="【杭州市】浙江杭州滨江公司派件员正在为您派件"
            time="2016-06-10 09:03:00"
          />
          <TimelineItem
            title="运输"
            content="【杭州市】浙江杭州转运中心 已发出"
            time="2016-06-10 06:10:00"
          />
          <TimelineItem
            title="运输"
            content="【东莞市】广东东莞转运中心 已发出"
            time="2016-06-09 18:00:00"
          />
          <TimelineItem
            title="揽件"
            content="【东莞市】申通快递 广东东莞凤岗分部收件员 已揽件"
            time="2016-06-09 16:12:00"
          />
          <TimelineItem
            title="揽件"
            content="【东莞市】商家正通知快递公司揽件"
            time="2016-06-09 14:00:00"
          />
          <TimelineItem
            title="揽件"
            content="【东莞市】您的订单待配货"
            time="2016-06-09 10:12:19"
          />
          <TimelineItem
            title="揽件"
            content="【东莞市】您的订单开始处理"
            time="2016-06-09 10:01:09"
          />
        </Timeline>
      </IceContainer>
    );
  }
}
