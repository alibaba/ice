

import React, { Component } from 'react';
import IceCard from '@icedesign/card';
import { Pagination } from '@icedesign/base';
import './SystemNoticeList.scss';

const dataSource = [
  {
    title: '关于淘宝网存储设备商品发布规范的公告',
    tag: 'up',
    href: '',
    time: '2017-11-29',
  },
  {
    title: '加强淘宝网电动四轮车类目准入的公告',
    tag: 'new',
    href: '',
    time: '2017-10-29',
  },
  {
    title: '淘宝网VR头盔商品发布规范的公告',
    tag: 'hot',
    href: '',
    time: '2017-03-11',
  },
  {
    title: '加强淘宝网农药类目准入的公告',
    tag: '',
    href: '',
    time: '2017-02-16',
  },
  {
    title: '淘宝网2017年春节发货时间及交易超时调整公告',
    tag: '',
    href: '',
    time: '2017-11-23',
  },
];

const dict = {
  up: '置顶',
  hot: '新',
  new: '热',
};

export default class SystemNoticeList extends Component {
  static displayName = 'SystemNoticeList';

  constructor(props) {
    super(props);
    this.state = {
      current: 2,
    };
  }

  handleChange = (current) => {
    console.log('current:', current);
    this.setState({ current });
  };

  render() {
    return (
      <div className="system-notice-list">
        <IceCard>
          <div className="notice-list-content">
            <h2 style={styles.title}>系统公告</h2>
            <ul style={styles.noticeList}>
              {dataSource.map((item, index) => {
                return (
                  <li key={index} style={styles.noticeItem}>
                    <a href={item.href} style={styles.noticeTitle}>
                      {item.title}
                    </a>
                    {item.tag && (
                      <span className={`${item.tag}`} style={styles.noticeTag}>
                        {dict[item.tag]}
                      </span>
                    )}
                    <span style={styles.noticeTime}>{item.time}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div style={styles.todo0}>
            <Pagination
              shape="arrow-only"
              current={this.state.current}
              onChange={this.handleChange}
            />
          </div>
        </IceCard>
      </div>
    );
  }
}

const styles = {
  title: {
    margin: '0',
    fontSize: '16px',
  },
  noticeList: {
    margin: 0,
    padding: 0,
  },
  noticeItem: {
    position: 'relative',
    padding: '12px 0',
    listStyle: 'none',
    borderBottom: '1px solid #F4F4F4',
  },
  noticeTitle: {
    fontSize: '14px',
    color: '#333',
    textDecoration: 'none',
  },
  noticeTag: {
    fontSize: '12px',
    padding: '2px 6px',
    borderRadius: '8px',
    marginLeft: '5px',
  },
  noticeTime: {
    position: 'absolute',
    right: '0',
    top: '15px',
    fontSize: '12px',
    color: '#999',
  },
};
