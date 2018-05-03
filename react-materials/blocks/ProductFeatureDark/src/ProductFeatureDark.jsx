import React, { Component } from 'react';

export default class ProductFeatureDark extends Component {
  static displayName = 'ProductFeatureDark';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={styles.wrapper}>
        <div style={styles.feature}>
          <div style={styles.title}>物料自定义接入</div>
          <div style={styles.line}>
            <div style={styles.lineHeader} />
          </div>
          <div style={styles.desc}>
            官方提供海量的物料，覆盖多种业务场景，也支持物料自定义接入，定制物料源
          </div>
        </div>
        <div style={styles.cover}>
          <img
            alt="特点图"
            style={styles.coverImage}
            src="https://img.alicdn.com/tfs/TB1A93MpuuSBuNjy1XcXXcYjFXa-880-485.png"
          />
        </div>
      </div>
    );
  }
}

const styles = {
  wrapper: {
    position: 'relative',
    backgroundColor: '#f6f6f6',
    backgroundImage:
      'url(https://img.alicdn.com/tfs/TB1d_TCpwmTBuNjy1XbXXaMrVXa-1899-500.png)',
    backgroundSize: 'cover',
    height: 500,
    overflow: 'hidden',
  },
  feature: {
    paddingTop: 160,
    paddingBottom: 160,
    paddingLeft: 30,
    backgroundImage:
      'url(https://img.alicdn.com/tfs/TB1A5MNpuuSBuNjy1XcXXcYjFXa-66-66.png)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '10px 120px',
    zIndex: 2,
    top: 0,
    right: '50%',
    position: 'absolute',
  },
  line: {
    height: 2,
    width: 140,
    backgroundColor: 'rgba(255,255,255,0.4)',
    margin: '20px 0',
  },
  lineHeader: {
    height: 2,
    width: 33,
    backgroundColor: '#fff',
  },
  title: {
    color: '#fff',
    fontSize: 36,
    textShadow: '0 0 3px rgba(0,0,0,0.3)',
  },
  desc: {
    fontSize: 16,
    color: '#fff',
    maxWidth: 400,
    lineHeight: '26px',
    textShadow: '0 0 1px rgba(0,0,0,0.3)',
  },
  cover: {
    position: 'absolute',
    left: '55%',
    bottom: 0,
    zIndex: 1,
  },
  coverImage: {
    maxHeight: 430,
    display: 'block',
  },
};
