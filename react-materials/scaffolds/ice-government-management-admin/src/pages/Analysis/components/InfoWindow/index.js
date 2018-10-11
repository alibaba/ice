import React, { Component } from 'react';
import { Icon } from '@icedesign/base';

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
      <div style={styles.container}>
        <div style={styles.card}>
          <h4 style={styles.title}>信息窗</h4>
          <ul>
            {mock.map((item, index) => {
              return (
                <li style={styles.list} key={index}>
                  <span style={styles.listLeft}>
                    <span style={styles.circle} />
                    {item.title}
                  </span>
                  <span style={styles.date}>[{item.date}]</span>
                </li>
              );
            })}
          </ul>
          <div style={styles.icon}>
            <Icon type="ellipsis" size="xs" />
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
    padding: '24px',
    color: '#44426e',
    fontSize: '16px',
    backgroundColor: 'white',
    borderRadius: '16px',
    overflow: 'hidden',
    position: 'relative',
  },
  title: {
    marginTop: '0',
    marginBottom: '20px',
    borderLeft: '5px solid #0056f4',
    paddingLeft: '10px',
    lineHeight: '20px',
  },
  list: {
    margin: '16px 0',
    color: '#454973',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  circle: {
    border: '1px solid #0059da',
    borderRadius: '50%',
    width: '7px',
    height: '7px',
    marginRight: '10px',
    display: 'inline-block',
  },
  date: {
    alignSelf: 'flex-end',
    display: 'inline-block',
    textAlign: 'right',
    whiteSpace: 'nowrap',
    flex: '1',
  },
  listLeft: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    cursor: 'pointer',
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
};
