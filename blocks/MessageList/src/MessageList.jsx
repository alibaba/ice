import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Pagination } from '@icedesign/base';
import './MessageList.scss';

const dataSource = [
  {
    title: '消息标题',
    message: '这里是一条消息提醒详细说明。',
    datetime: '07-07 18:36',
  },
  {
    title: '消息标题',
    message:
      '这里是一条比较长的消息提醒详细说明。这里是一条比较长的消息提醒详细说明。这里是一条比较长的消息提醒详细说明。这里是一条比较长的消息提醒详细说明。这里是一条比较长的消息提醒详细说明。这里是一条比较长的消息提醒详细说明。这里是一条比较长的消息提醒详细说明。这里是一条比较长的消息提醒详细说明。这里是一条比较长的消息提醒详细说明。',
    datetime: '07-07 18:36',
  },
  {
    title: '消息标题',
    message:
      '这里是一条比较长的消息提醒详细说明。这里是一条比较长的消息提醒详细说明。这里是一条比较长的消息提醒详细说明。这里是一条比较长的消息提醒详细说明。这里是一条比较长的消息提醒详细说明。这里是一条比较长的消息提醒详细说明。这里是一条比较长的消息提醒详细说明。这里是一条比较长的消息提醒详细说明。这里是一条比较长的消息提醒详细说明。',
    datetime: '07-07 18:36',
  },
  {
    title: '消息标题',
    message: '这里是一条比较长的消息提醒详细说明。',
    datetime: '07-07 18:36',
  },
  {
    title: '消息标题',
    message: '这里是一条比较长的消息提醒详细说明。',
    datetime: '07-07 18:36',
  },
];

export default class MessageList extends Component {
  static displayName = 'MessageList';

  constructor(props) {
    super(props);
    this.state = {};
  }

  renderItem = (item, idx) => {
    return (
      <div style={styles.item} key={idx}>
        <div style={styles.title}>
          {item.title}
          <span style={styles.datetime}>{item.datetime}</span>
        </div>
        <div style={styles.message}>{item.message}</div>
      </div>
    );
  };

  render() {
    return (
      <div className="message-list" style={styles.messageList}>
        <IceContainer>
          {dataSource.map(this.renderItem)}
          <div style={styles.paginationWarp}>
            <Pagination />
          </div>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  item: { borderBottom: '1px solid #eee', margin: '0 15px 20px' },
  title: {
    fontSize: '16px',
    color: '#444',
    marginBottom: '15px',
    position: 'relative',
  },
  datetime: {
    position: 'absolute',
    right: '10px',
    paddingTop: '10px',
    fontSize: '12px',
    color: '#666',
  },
  message: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '20px',
    width: '790px',
  },
  paginationWarp: {
    marginTop: '15px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  messageList: {},
};
