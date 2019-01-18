import React, { Component } from 'react';

export default class PlatformBlackIntro extends Component {
  static displayName = 'PlatformBlackIntro';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        style={{
          ...styles.wrapper,
          backgroundImage: `url(${require('./images/TB1.IQmRVXXXXbYXVXXXXXXXXXX-2760-1480.png')})`,
        }}
      >
        <div style={styles.body}>
          <h2 style={styles.title}>多元化的商业机制</h2>
          <p style={styles.text}>
            商品推广佣金，精准转化内容影响力<br />优质内容奖励
            ，为优质内容创作者保驾护航<br />阿里V任务，为你的内容创作能力对接更多潜在客户
          </p>
        </div>
        <div style={styles.extraBody}>
          <img
            alt=""
            src={require('./images/TB1opWDSpXXXXbwXFXXXXXXXXXX-1412-436.png')}
            height="218"
            width="706"
            style={styles.image}
          />
          <div style={styles.extraText}>
            <p style={styles.extraTextItemLeft}>开放更多内容消费场景</p>
            <p style={styles.extraTextItemCenter}>激励优质内容生产</p>
            <p style={styles.extraTextItemRight}>连接品牌商家需求</p>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  wrapper: {
    height: 740,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    overflow: 'hidden',
  },
  body: {
    textAlign: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 20,
    marginTop: 130,
  },
  text: {
    color: '#fff',
    fontSize: 14,
    lineHeight: '24px',
    letterSpacing: '2px',
  },
  extraBody: {
    textAlign: 'center',
    position: 'relative',
    marginTop: 80,
  },
  image: {
    display: 'block',
    margin: '0 auto',
  },
  extraText: {
    width: 706,
    margin: '0 auto',
    display: 'flex',
    color: '#fff',
  },
  extraTextItemLeft: {
    width: '215px',
    textAlign: 'center',
  },
  extraTextItemCenter: {
    width: '275px',
    textAlign: 'center',
  },
  extraTextItemRight: {
    width: '215px',
    textAlign: 'center',
  },
};
