import React, { Component } from 'react';
import { Tab } from '@alifd/next';
import IceContainer from '@icedesign/container';
import './TagMessageList.scss';

const dataSource = [
  { title: '关于淘宝网存储设备商品发布规范的公告', date: '2017/01/06' },
  { title: '加强淘宝网电动四轮车类目准入的公告', date: '2017/01/06' },
  { title: '淘宝网VR头盔商品发布规范的公告', date: '2017/01/06' },
  { title: '加强淘宝网农药类目准入的公告', date: '2017/01/06' },
  { title: '淘宝网2017年春节发货时间及交易超时调整公告', date: '2017/01/06' },
];

export default class TagMessageList extends Component {
  static displayName = 'TagMessageList';

  constructor(props) {
    super(props);
    this.state = {};
  }

  renderItem = (item, idx) => {
    return (
      <div style={styles.item} key={idx}>
        <a href="##" style={styles.title}>
          {item.title}
        </a>
        <div style={styles.date}>{item.date}</div>
      </div>
    );
  };

  render() {
    return (
      <div className="tag-message-list">
        <IceContainer>
          <Tab size="small">
            <Tab.Item key={0} title="我的消息">
              {dataSource.map(this.renderItem)}
              <div style={styles.allMessage}>
                <a href="##">查看全部消息</a>
              </div>
            </Tab.Item>
            <Tab.Item key={1} title="待我处理">
              <p>暂无数据</p>
            </Tab.Item>
          </Tab>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  allMessage: {
    marginTop: '20px',
    textAlign: 'center',
  },
  item: {
    borderBottom: '1px solid #F4F4F4',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '15px 0',
  },
  title: {
    fontSize: '14px',
    color: '#666',
  },
  date: {
    fontSize: '12px',
    color: '#666',
  },
};
