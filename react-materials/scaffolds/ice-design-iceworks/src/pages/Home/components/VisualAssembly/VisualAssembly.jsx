/* eslint no-mixed-operators: 0 */
import React, { Component } from 'react';

export default class VisualAssembly extends Component {
  static displayName = 'VisualAssembly';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={styles.wrapperContainer}>
        <div style={styles.cover}>
          <img
            alt="特点图"
            style={styles.coverImage}
            src={require('./images/TB1Xf7OpuuSBuNjy1XcXXcYjFXa-2334-1092.png')}
          />
        </div>
        <div style={styles.wrapper}>
          <div style={styles.feature}>
            <div style={styles.title}>区块可视化组装</div>
            <div style={styles.line}>
              <div style={styles.lineHeader} />
            </div>
            <div style={styles.desc}>
              海量物料自由搭配，轻松完成页面组合可视化操作更得心应手
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  wrapperContainer: {
    position: 'relative',
    height: 500,
    backgroundColor: '#f6f6f6',
    backgroundImage: `url(${require('./images/TB1_E.OpuuSBuNjy1XcXXcYjFXa-3800-1000.png')})`,
    backgroundSize: 'cover',
  },
  wrapper: {
    position: 'relative',
    height: 500,
    maxWidth: 1190,
    margin: '0 auto',
    overflowX: 'hidden',
  },
  feature: {
    paddingTop: 160,
    paddingBottom: 160,
    paddingLeft: 30,
    backgroundImage: `url(${require('./images/TB1A5MNpuuSBuNjy1XcXXcYjFXa-66-66.png')})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '10px 120px',
    zIndex: 2,
    top: 0,
    right: '70%',
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
    maxWidth: 280,
    lineHeight: '26px',
    textShadow: '0 0 1px rgba(0,0,0,0.3)',
  },
  cover: {
    position: 'absolute',
    left: '28%',
    bottom: 0,
    zIndex: 1,
    height: 1092 / 2,
    marginTop: (1092 / 2 - 500) * -1,
  },
  coverImage: {
    maxHeight: 1092 / 2,
    display: 'block',
  },
};
