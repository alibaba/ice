import React from 'react';
import { Grid } from '@icedesign/base';

const { Row, Col } = Grid;

export default () => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <Row wrap>
          <Col l="18">
            <p style={styles.title}>关于云栖大会</p>
            <p style={styles.desc}>
              关于云栖－云栖大会是由阿里巴巴集团主办的全球顶级科技大会，汇聚时代最强大脑，描绘新技术发展趋势和蓝图，展现云计算、大数据、人工智能等蓬勃发展的科技生态全景。从2015年到2017年，云栖大会系列活动已经累计吸引超过十万人现场参与，数千万人在线参与。2018年云栖大会将在深圳（
              <a href="#" style={styles.link}>
                <b>精彩回顾</b>
              </a>
              ）、南京（
              <a href="#" style={styles.link}>
                <b>精彩回顾</b>
              </a>
              ）、上海（
              <a href="#" style={styles.link}>
                <b>精彩回顾</b>
              </a>
              ）、武汉（
              <a href="#" style={styles.link}>
                <b>精彩回顾</b>
              </a>
              ）、重庆（
              <a href="#" style={styles.link}>
                <b>8.24同步直播中</b>
              </a>
              ）、杭州（
              <a href="#" style={styles.link}>
                <b>9.19-9.22，立即抢购</b>
              </a>
              ）、广州、北京等地陆续举办，邀您一起驱动数字中国。
            </p>
          </Col>
          <Col l="6">
            <div style={styles.rightContent}>
              <img
                src={require('./images/TB1fQ48QFXXXXc7XVXXXXXXXXXX-94-94.png')}
                alt=""
                style={styles.qrcode}
              />
              <div style={styles.textBox}>
                <p style={styles.subtit}>下载 App</p>
                <p style={styles.text}>
                  随时了解最新大会议程获取大会温馨提醒和参会二维码
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

const styles = {
  container: {
    background: '#0e0e0e',
    padding: '54px 0 70px',
  },
  content: {
    maxWidth: '1200px',
    margin: ' 0 auto',
  },
  title: {
    fontSize: '18px',
    lineHeight: '26px',
    color: '#fff',
  },
  desc: {
    fontSize: '12px',
    lineHeight: '20px',
    color: '#fff',
    textAlign: 'justify',
    marginTop: '14px',
    maxWidth: '830px',
  },
  link: {
    color: '#00b7d3',
  },
  rightContent: {
    position: 'relative',
  },
  textBox: {
    paddingLeft: '100px',
  },
  qrcode: {
    width: '82px',
    height: '82px',
    position: 'absolute',
    top: '0',
    left: '0',
  },
  subtit: {
    fontWeight: '400',
    fontSize: '16px',
    color: '#fff',
    lineHeight: '22px',
  },
  text: {
    fontSize: '12px',
    color: '#666',
    lineHeight: '18px',
    marginTop: '6px',
  },
};
