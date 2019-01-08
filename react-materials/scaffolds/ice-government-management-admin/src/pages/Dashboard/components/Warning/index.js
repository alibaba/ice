import React, { Component } from 'react';
import { Message } from '@alifd/next';
import timeIcon from './images/time.svg';

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
    Feedback.toast.success('可以使用 Iceworks 按需添加页面');
  };

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h4 style={styles.title}>预警区</h4>
          <div style={styles.content}>
            {mock.map((item, index) => {
              return (
                <div style={styles.item} key={index} onClick={this.handleClick}>
                  <div
                    style={{
                      ...styles.image,
                      background: `${item.backgroundColor}`,
                    }}
                  >
                    <img
                      alt=""
                      src={timeIcon}
                      style={{
                        ...styles.iconImage,
                        transform: `rotate(${index * 72}deg)`,
                      }}
                    />
                    <div style={styles.count}>{item.count}</div>
                  </div>
                  <p style={styles.itemTitle}>{item.title}</p>
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
    margin: '0 -10px',
    paddingTop: '56px',
  },
  item: {
    width: '20%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  image: {
    height: '50px',
    width: '50px',
    textAlign: 'center',
    padding: '10px 0',
    borderRadius: '8px',
    position: 'relative',
  },
  itemTitle: {
    fontSize: '12px',
    textAlign: 'center',
  },
  iconImage: {
    width: '30px',
    height: '30px',
  },
  count: {
    color: 'white',
    backgroundColor: '#ff382f',
    borderRadius: '50%',
    fontSize: '12px',
    height: '18px',
    width: '18px',
    lineHeight: '18px',
    textAlign: 'center',
    position: 'absolute',
    right: '-6px',
    top: '-6px',
  },
};
