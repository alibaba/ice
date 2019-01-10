import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Pagination } from '@alifd/next';

const dataSource = [
  {
    title: '消息标题',
    message: '这里是消息的一些详细说明。',
    datetime: '07-07 18:36',
  },
  {
    title: '消息标题',
    message: '这里是消息的一些详细说明。',
    datetime: '07-07 18:36',
  },
  {
    title: '消息标题',
    message: '这里是消息的一些详细说明。',
    datetime: '07-07 18:36',
  },
  {
    title: '消息标题',
    message: '这里是消息的一些详细说明。',
    datetime: '07-07 18:36',
  },
  {
    title: '消息标题',
    message: '这里是消息的一些详细说明。',
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
  item: {
    borderBottom: '1px solid #eee',
    margin: '0 0 20px',
  },
  title: {
    fontSize: '14px',
    color: '#444',
    marginBottom: '10px',
    position: 'relative',
  },
  datetime: {
    position: 'absolute',
    right: '10px',
    paddingTop: '10px',
    fontSize: '12px',
    color: '#999',
  },
  message: {
    fontSize: '12px',
    color: '#999',
    marginBottom: '10px',
  },
  paginationWarp: {
    marginTop: '15px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  messageList: {},
};
