import React, { Component } from 'react';
import { Message } from '@alifd/next';
import timeIcon from './images/time.svg';
import styles from './index.module.scss';

const mock = [
  {
    title: '已经到期未办理',
    count: 1,
    backgroundColor: '#5e83fb',
  },
  {
    title: '距离到期还有1天',
    count: 13,
    backgroundColor: '#f7da47',
  },
  {
    title: '距离到期还有5天',
    count: 1,
    backgroundColor: '#58ca9a',
  },
  {
    title: '距离到期还有15天',
    count: 2,
    backgroundColor: '#ee706d',
  },
  {
    title: '距离到期还有30天',
    count: 0,
    backgroundColor: '#447eff',
  },
];

export default class Warning extends Component {
  handleClick = () => {
    Message.success('可以使用 Iceworks 按需添加页面');
  };

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <h4 className={styles.title}>预警区</h4>
          <div className={styles.content}>
            {mock.map((item, index) => {
              return (
                <div
                  className={styles.item}
                  key={index}
                  onClick={this.handleClick}
                >
                  <div
                    className={styles.image}
                    style={{ background: `${item.backgroundColor}` }}
                  >
                    <img
                      alt=""
                      src={timeIcon}
                      className={styles.iconImage}
                      style={{ transform: `rotate(${index * 72}deg)` }}
                    />
                    <div className={styles.count}>{item.count}</div>
                  </div>
                  <p className={styles.itemTitle}>{item.title}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
