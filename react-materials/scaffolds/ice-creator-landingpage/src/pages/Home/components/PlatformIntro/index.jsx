import React, { Component } from 'react';

export default class PlatformIntro extends Component {
  static displayName = 'PlatformIntro';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={styles.wrapper}>
        <div style={styles.body}>
          <h2 style={styles.title}>全面开放的粉丝运营空间</h2>
          <p style={styles.text}>
            每个创作者都拥有自己的粉丝阵地<br />有力的粉丝运营抓手<br />高效连接每一位粉丝
          </p>
        </div>
        <img
          alt=""
          src={require('./images/TB1kqzXqL1TBuNjy0FjXXajyXXa-2520-1040.jpg')}
          width="1260"
          height="520"
          style={styles.image}
        />
      </div>
    );
  }
}

const styles = {
  wrapper: {
    height: 740,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  body: {
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    color: '#000',
    marginBottom: 20,
    marginTop: 50,
  },
  text: {
    fontSize: 14,
    color: '#666',
    lineHeight: '24px',
    letterSpacing: 2,
  },
  image: {
    margin: '20px auto 0 auto',
    display: 'block',
  },
};
