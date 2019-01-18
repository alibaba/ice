import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import timeIcon from './images/time.svg';

const mock = [
  {
    title: '设计部门',
    count: 1,
    backgroundColor: '#5e83fb',
  },
  {
    title: '前端部门',
    count: 3,
    backgroundColor: '#f7da47',
  },
  {
    title: '运营部门',
    count: 6,
    backgroundColor: '#58ca9a',
  },
  {
    title: '客户端部门',
    count: 2,
    backgroundColor: '#ee706d',
  },
  {
    title: 'IOT 部门',
    count: 6,
    backgroundColor: '#447eff',
  },
];

export default class Warning extends Component {
  render() {
    return (
      <IceContainer style={styles.container}>
        <div style={styles.content}>
          {mock.map((item, index) => {
            return (
              <div style={styles.item} key={index}>
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
      </IceContainer>
    );
  }
}

const styles = {
  container: {
    padding: '40px 0',
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  item: {
    width: '20%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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
    margin: '10px 0 0',
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
