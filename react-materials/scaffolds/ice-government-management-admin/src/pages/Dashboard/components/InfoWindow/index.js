import React, { Component } from 'react';
import styles from './index.module.scss';

const mock = [
  {
    title: '习近平主持召开中央财经委员会第三次会议',
    date: '03-13',
  },
  {
    title: '17种抗癌药纳入医保支付范围',
    date: '03-13',
  },
  {
    title: '新闻办介绍《乡村振兴战略规划（2018—2022年）》有关情况',
    date: '03-13',
  },
  {
    title:
      '民生问题无小事——2018年国务院大督查赴部门实地督查盯紧民生痛点督促整改',
    date: '03-02',
  },
  {
    title: '商务部通报2018年电子商务进农村综合示范工作有关情况',
    date: '03-02',
  },
  {
    title: '中国国际矿业大会准备就绪',
    date: '02-23',
  },
];

export default class InfoWindow extends Component {
  static displayName = 'InfoWindow';

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <h4 className={styles.title}>信息窗</h4>
          <ul>
            {mock.map((item, index) => {
              return (
                <li className={styles.list} key={index}>
                  <span className={styles.listLeft}>
                    <span className={styles.circle} />
                    {item.title}
                  </span>
                  <span className={styles.date}>[{item.date}]</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}
