import React, { Component } from 'react';
import { Message } from '@alifd/next';
import goalIcon from './images/goal.svg';
import linkIcon from './images/link.svg';
import recoveryIcon from './images/recovery.svg';
import refuseIcon from './images/refuse.svg';
import checkIcon from './images/check.svg';
import sendIcon from './images/send.svg';
import checkinIcon from './images/checkin.svg';
import sendMailIcon from './images/send-mail.svg';

const mockData = [
  {
    img: goalIcon,
    title: '终本案件',
    count: 0,
    backgroundColor: '#ee706d',
  },
  {
    img: linkIcon,
    title: '登记立案待立案',
    count: 1,
    backgroundColor: '#5e83fb',
  },
  {
    img: recoveryIcon,
    title: '待恢复立案',
    count: 3,
    backgroundColor: '#f7da47',
  },
  {
    img: refuseIcon,
    title: '本案立案庭拒签',
    count: 0,
    backgroundColor: '#58ca9a',
  },
  {
    img: checkIcon,
    title: '已收案待立案',
    count: 1,
    backgroundColor: '#5e83fb',
  },
  {
    img: sendIcon,
    title: '已收案待发送',
    count: 2,
    backgroundColor: '#f7da47',
  },
  {
    img: checkinIcon,
    title: '已申请保全待立案',
    count: 0,
    backgroundColor: '#58ca9a',
  },
  {
    img: sendMailIcon,
    title: '执保已立案待发送',
    count: 1,
    backgroundColor: '#ee706d',
  },
];

export default class Transaction extends Component {
  handleClick = () => {
    Message.success('可以使用 Iceworks 按需添加页面');
  };

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h4 style={styles.title}>任务区</h4>
          <div style={styles.content}>
            {mockData.map((item, index) => {
              return (
                <div style={styles.item} key={index} onClick={this.handleClick}>
                  <div
                    style={{
                      ...styles.image,
                      background: `${item.backgroundColor}`,
                    }}
                  >
                    <img src={item.img} style={styles.iconImage} alt="" />
                  </div>
                  <p style={styles.itemTitle}>
                    {item.title} <span style={styles.count}>{item.count}</span>
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    width: '50%',
    boxSizing: 'border-box',
    padding: '10px',
  },
  card: {
    width: '100%',
    padding: '20px',
    color: '#42436b',
    backgroundColor: 'white',
    borderRadius: '16px',
    overflow: 'hidden',
    position: 'relative',
    height: '286px',
  },
  title: {
    marginTop: '0',
    marginBottom: '20px',
    borderLeft: '5px solid #447eff',
    paddingLeft: '10px',
    lineHeight: '20px',
  },
  content: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    height: '200px',
    paddingTop: '20px',
  },
  item: {
    width: '25%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  itemTitle: {
    fontSize: '12px',
    textAlign: 'center',
  },
  image: {
    height: '40px',
    width: '40px',
    textAlign: 'center',
    padding: '8px 0',
    borderRadius: '8px',
  },
  iconImage: {
    width: '24px',
    height: '24px',
  },
  count: {
    color: '#ff363b',
  },
};
