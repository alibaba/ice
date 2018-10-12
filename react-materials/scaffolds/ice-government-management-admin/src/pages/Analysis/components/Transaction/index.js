import React, { Component } from 'react';
import { Icon } from '@icedesign/base';
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
    backgroundColor: '#ff3544',
  },
  {
    img: linkIcon,
    title: '登记立案待立案',
    count: 1,
    backgroundColor: '#0088ff',
  },
  {
    img: recoveryIcon,
    title: '待恢复立案',
    count: 3,
    backgroundColor: '#ff9500',
  },
  {
    img: refuseIcon,
    title: '本案立案庭拒签',
    count: 0,
    backgroundColor: '#00aae6',
  },
  {
    img: checkIcon,
    title: '已收案待立案',
    count: 1,
    backgroundColor: '#0088ff',
  },
  {
    img: sendIcon,
    title: '已收案待发送',
    count: 2,
    backgroundColor: '#ff9500',
  },
  {
    img: checkinIcon,
    title: '已申请保全待立案',
    count: 0,
    backgroundColor: '#00aae6',
  },
  {
    img: sendMailIcon,
    title: '执保已立案待发送',
    count: 1,
    backgroundColor: '#ff3544',
  },
];

export default class Transaction extends Component {
  static dispalyName = 'Transaction';

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h4 style={styles.title}>任务区</h4>
          <div style={styles.content}>
            {mockData.map((item, index) => {
              return (
                <div style={styles.item} key={index}>
                  <div
                    style={{
                      ...styles.image,
                      background: `linear-gradient(45deg, ${
                        item.backgroundColor
                      } 50%, #fff 150%)`,
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
          <div style={styles.actionBar}>
            <Icon type="arrow-left" style={styles.actionArrow} />
            <Icon type="arrow-right" style={styles.actionArrow} />
          </div>
          <div style={styles.icon}>
            <Icon type="set" size="medium" />
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
    borderLeft: '5px solid #0056f4',
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
  icon: {
    position: 'absolute',
    top: '0',
    right: '0',
    backgroundColor: '#dae7ff',
    width: '40px',
    height: '40px',
    lineHeight: '40px',
    textAlign: 'center',
    cursor: 'pointer',
    color: '#004cf8',
  },
  actionBar: {
    position: 'absolute',
    top: '4px',
    right: '50px',
    lineHeight: '40px',
    color: '#004cf8',
  },
  actionArrow: {
    cursor: 'pointer',
  },
};
