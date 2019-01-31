import React, { PureComponent } from 'react';
import { Grid, Message } from '@alifd/next';

const { Row, Col } = Grid;

class BadgeItem extends PureComponent {
  handleClick = (info) => {
    Message.prompt(`您暂无权限${info}，请先申请权限`);
  };

  render() {
    const { data } = this.props;
    return (
      <Row wrap style={styles.wrap}>
        <Col style={styles.col} l={3} s={4} xxs={24}>
          <div style={styles.cover}>
            <img style={styles.img} src={data.icon} alt="" />
          </div>
        </Col>
        <Col style={styles.col} l={11} s={10} xxs={24}>
          <h3 style={styles.title}>{data.title}</h3>
          <div style={styles.desc}>{data.desc}</div>
        </Col>
        <Col style={styles.col} l={4} s={4} xxs={24}>
          <div style={styles.status}>{data.status}</div>
        </Col>
        <Col style={styles.col} l={6} s={6} xxs={24}>
          <div style={styles.desc}>{data.detail}</div>
          <div>
            <a onClick={() => this.handleClick('查看详情')} style={styles.link}>
              查看详情
            </a>
            <a
              onClick={() => this.handleClick('查看历史记录')}
              style={styles.link}
            >
              历史记录
            </a>
          </div>
        </Col>
      </Row>
    );
  }
}

const styles = {
  wrap: {
    paddingTop: '20px',
    alignItems: 'center',
    borderBottom: '1px solid #f4f4f4',
  },
  col: {
    margin: '0 0 20px 0',
  },
  img: {
    width: '80px',
    height: '80px',
    display: 'block',
  },
  status: {
    textAlign: 'center',
    color: '#999',
    fontSize: '12px',
  },
  title: {
    margin: '0px',
    fontSize: '16px',
  },
  desc: {
    fontSize: '12px',
    color: '#999',
    lineHeight: '20px',
  },
  link: {
    fontSize: '12px',
    cursor: 'pointer',
    marginRight: '20px',
    color: '#5e83fb',
  },
};

export default BadgeItem;
