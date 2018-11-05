import React, { Component } from 'react';
import { Grid, Icon } from '@icedesign/base';

const { Row, Col } = Grid;

// MOCK 数据，实际业务按需进行替换
const getData = () => {
  return Array.from({ length: 5 }).map((item, index) => {
    return {
      appid: `0000${index + 1}`,
      title: 'NLS',
      desc: '智能语音小助手',
      time: '2018-09-30 14:30:19',
    };
  });
};

export default class Card extends Component {
  static displayName = 'Card';

  render() {
    const data = getData();

    return (
      <Row wrap gutter="20">
        {data.map((item, index) => {
          return (
            <Col l={8} key={index}>
              <div style={styles.card}>
                <div style={styles.body}>
                  <Icon type="set" style={styles.settingIcon} />
                  <Icon type="picture" size="xl" style={styles.pictureIcon} />
                  <p style={styles.appid}>Appid: {item.appid}</p>
                </div>
                <div style={styles.footer}>
                  <div style={styles.title}>{item.title}</div>
                  <div style={styles.desc}>{item.desc}</div>
                  <div style={styles.time}>
                    更新时间：
                    {item.time}
                  </div>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    );
  }
}

const styles = {
  card: {
    background: '#fff',
    border: '1px solid rgb(235, 235, 235)',
    marginBottom: '20px',
  },
  body: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '160px',
    borderBottom: '1px solid rgb(235, 235, 235)',
  },
  appid: {
    margin: '0',
    color: '#999',
  },
  settingIcon: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    cursor: 'pointer',
  },
  pictureIcon: {
    marginBottom: '20px',
  },
  footer: {
    padding: '20px',
  },
  title: {
    fontSize: '16px',
    color: 'rgba(0, 0, 0, 0.85)',
    marginBottom: '10px',
  },
  desc: {
    fontSize: '14px',
    color: 'rgba(0, 0, 0, 0.427)',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    marginTop: '6px',
    overflow: 'hidden',
    marginBottom: '10px',
  },
  time: {
    fontSize: '12px',
    color: 'rgba(0, 0, 0, 0.5)',
  },
};
