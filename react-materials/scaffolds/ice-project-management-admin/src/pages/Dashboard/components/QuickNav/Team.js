import React, { Component } from 'react';
import IceContainer from '@icedesign/container';

const MEMBERS = [
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

export default class Team extends Component {
  render() {
    return (
      <IceContainer style={styles.container}>
        <ul>
          {MEMBERS.map((member, index) => {
            return (
              <li style={styles.memberItem} key={index}>
                <img src={member.avatar} alt="" style={styles.memberAvatar} />
                <div style={styles.memberInfo}>
                  <h6 style={styles.memberName}>{member.name}</h6>
                  <p style={styles.memberTitle}>{member.title}</p>
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
    height: '370px',
    overflowY: 'scroll',
  },
  memberItem: {
    display: 'flex',
    width: '100%',
    padding: '10px 10px 10px 0',
  },
  memberAvatar: {
    width: '40px',
    height: '40px',
    marginRight: '10px',
    borderRadius: '50%',
  },
  memberName: {
    margin: '0',
    color: '#333',
    fontWeight: 'bold',
  },
  memberTitle: {
    margin: '0',
    color: '#999',
    fontSize: '12px',
  },
};
