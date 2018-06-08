import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class PlatformIntro2 extends Component {
  static displayName = 'PlatformIntro2';

  static propTypes = {
    value: PropTypes.string,
  };

  static defaultProps = {
    value: 'string data',
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        style={{
          ...styles.wrapper,
          backgroundImage:
            'url(https://img.alicdn.com/tfs/TB1d..oRVXXXXX4XVXXXXXXXXXX-2760-1480.png)',
        }}
      >
        <div style={styles.body}>
          <h2 style={styles.title}>高效的内容创作工具</h2>
          <p style={styles.text}>
            聚集全网最新鲜的创意，直击用户需求<br />海量优质素材，快速锁定优质商品、图片、视频<br />发布前内容质量诊断，内容编辑更高效
          </p>
        </div>
        <img
          src="https://img.alicdn.com/tfs/TB1DzIrRVXXXXckXFXXXXXXXXXX-1740-800.png"
          alt=""
          width="870"
          height="400"
          style={styles.image}
        />
      </div>
    );
  }
}

const styles = {
  wrapper: {
    height: 740,
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
    letterSpacing: '2px',
  },
  image: {
    margin: '0 auto',
    marginTop: 50,
    display: 'block',
  },
};
