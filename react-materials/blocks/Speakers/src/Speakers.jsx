import React, { Component } from 'react';
import { Grid } from '@icedesign/base';

const { Row, Col } = Grid;

const data = [
  {
    avatar:
      'https://img.alicdn.com/tfs/TB1jPyNrWmWBuNjy1XaXXXCbXXa-300-380.png',
    name: '马云',
    job: '阿里巴巴集团董事局主席',
  },
  {
    avatar:
      'https://img.alicdn.com/tfs/TB1Wo6Kr9BYBeNjy0FeXXbnmFXa-300-380.png',
    name: '张建锋',
    job: '阿里巴巴集团CTO',
  },
  {
    avatar:
      'https://img.alicdn.com/tfs/TB1Zo6Kr9BYBeNjy0FeXXbnmFXa-300-380.png',
    name: '胡晓明',
    job: '阿里云总裁',
  },
  {
    avatar:
      'https://img.alicdn.com/tfs/TB1WyaDr7OWBuNjSsppXXXPgpXa-300-380.png',
    name: 'Gerry Pennell',
    job: '国际奥委会首席信息技术官',
  },
  {
    avatar:
      'https://img.alicdn.com/tfs/TB1obZNtf9TBuNjy0FcXXbeiFXa-600-760.png',
    name: '潘建伟',
    job: '中国科学院院士',
  },
  {
    avatar:
      'https://img.alicdn.com/tfs/TB1118BtuSSBuNjy0FlXXbBpVXa-600-760.png',
    name: '王坚',
    job: '阿里巴巴集团技术委员会主席',
  },
  {
    avatar:
      'https://img.alicdn.com/tfs/TB1fAxRtuuSBuNjy1XcXXcYjFXa-600-760.png',
    name: 'ULF Michael Widenius',
    job: 'MySQL & MariaDB 创始人',
  },
  {
    avatar:
      'https://img.alicdn.com/tfs/TB1GlbptDtYBeNjy1XdXXXXyVXa-600-760.png',
    name: '浅雪',
    job: '阿里巴巴人工智能实验室总经理',
  },
];

export default class Speakers extends Component {
  static displayName = 'Speakers';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.content}>
          <div style={styles.mainTitle}>SPEAKERS</div>
          <div style={styles.mainDesc}>精彩演讲回顾</div>
          <Row wrap gutter="20" style={styles.row}>
            {data.map((item, index) => {
              return (
                <Col l="6" key={index}>
                  <div style={styles.item}>
                    <img src={item.avatar} alt="" style={styles.avatar} />
                    <div style={styles.mask} />
                    <div style={styles.line} />
                    <div style={styles.info}>
                      <div style={styles.name}>{item.name}</div>
                      <div style={styles.job}>{item.job}</div>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    padding: '50px 0',
    background: '#000',
  },
  content: {
    width: '1200px',
    margin: '0 auto',
  },
  mainTitle: {
    fontSize: '60px',
    color: '#fff',
    letterSpacing: '0.77px',
    lineHeight: '72px',
    margin: '0',
    fontWeight: '700',
  },
  mainDesc: {
    fontSize: '24px',
    lineHeight: '30px',
    color: '#fff',
    marginTop: '8px',
    fontWeight: '700',
  },
  row: {
    marginTop: '70px',
  },
  item: {
    position: 'relative',
    cursor: 'pointer',
    marginTop: '20px',
    overflow: 'hidden',
  },
  avatar: {
    display: 'block',
    verticalAlign: 'top',
    width: '100%',
  },
  mask: {
    position: 'absolute',
    bottom: '0',
    left: '0',
    width: '100%',
    height: '70%',
    opacity: '.75',
    backgroundImage: 'linear-gradient(-179deg,transparent 1%,#000)',
    transition: 'opacity .3s ease-in-out',
  },
  line: {
    position: 'absolute',
    left: '0',
    bottom: '0',
    width: '100%',
    height: '4px',
    background: '#236cff',
  },
  info: {
    position: 'absolute',
    left: '0',
    bottom: '20px',
    padding: '0 5%',
    overflow: 'hidden',
  },
  name: {
    lineHeight: '30px',
    fontSize: '20px',
    fontWeight: '700',
    color: '#fff',
    overflow: 'hidden',
  },
  job: {
    lineHeight: '18px',
    fontSize: '14px',
    fontWeight: '700',
    color: '#fff',
    overflow: 'hidden',
  },
};
