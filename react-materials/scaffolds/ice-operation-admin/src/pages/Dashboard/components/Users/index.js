import React, { Component } from 'react';
import IceContainer from '@icedesign/container';

const TOP_USERS = [
  {
    name: '淘小宝',
    title: '高级客户销售',
    avatar:
      'https://img.alicdn.com/tfs/TB19Erpw4TpK1RjSZFKXXa2wXXa-150-150.jpg',
  },
  {
    name: '张明',
    title: '资深客户经理',
    avatar:
      'https://img.alicdn.com/tfs/TB1w5jvw4TpK1RjSZFMXXbG_VXa-200-200.png',
  },
  {
    name: '李四',
    title: '客户销售专家',
    avatar:
      'https://img.alicdn.com/tfs/TB1zenmwYPpK1RjSZFFXXa5PpXa-200-200.png',
  },
  {
    name: '张三',
    title: '高级客户销售庄家',
    avatar:
      'https://img.alicdn.com/tfs/TB1n4rxwZfpK1RjSZFOXXa6nFXa-200-200.png',
  },
  {
    name: '淘小宝',
    title: '高级客户销售',
    avatar:
      'https://img.alicdn.com/tfs/TB19Erpw4TpK1RjSZFKXXa2wXXa-150-150.jpg',
  },
];

export default class Users extends Component {
  render() {
    return (
      <IceContainer style={styles.container}>
        <h3 style={styles.title}>销售排名</h3>
        <ul>
          {TOP_USERS.map((user, index) => {
            return (
              <li style={styles.userItem} key={index}>
                <img src={user.avatar} alt="" style={styles.userAvatar} />
                <div style={styles.userInfo}>
                  <h6 style={styles.userName}>{user.name}</h6>
                  <p style={styles.userTitle}>{user.title}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </IceContainer>
    );
  }
}

const styles = {
  container: {
    height: '384px',
    overflowY: 'scroll',
  },
  title: {
    margin: '0',
    paddingBottom: '3px',
    fontSize: '14px',
    borderBottom: '1px solid #DCDEE3',
  },
  userItem: {
    display: 'flex',
    width: '100%',
    padding: '10px 10px 10px 0',
  },
  userAvatar: {
    width: '40px',
    height: '40px',
    marginRight: '10px',
    borderRadius: '50%',
  },
  userName: {
    margin: '0',
    color: '#333',
    fontWeight: 'bold',
  },
  userTitle: {
    margin: '0',
    color: '#999',
    fontSize: '12px',
  },
};
