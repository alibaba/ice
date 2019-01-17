import React, { Component } from 'react';
import { Button } from '@alifd/next';

export default class IntroWithBackground extends Component {
  static displayName = 'IntroWithBackground';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={styles.wrapper}>
        <div style={styles.inntroContent}>
          <h3 style={styles.title}>海量物料</h3>
          <div style={styles.titleLine}>
            <div style={styles.titleHighlightLine} />
          </div>
          <p style={styles.desc}>
            专业视觉设计，每周物料更新，丰富组合区块，不同领域模板
            自定义主题配置，响应式设计，海量物料满足您开发所需
          </p>
          <Button
            component="a"
            href="#"
            target="_blank"
            style={styles.extraButton}
          >
            了解更多 &gt;
          </Button>
        </div>
        <div style={styles.background}>
          <div style={styles.grayOverlay} />
          <div style={styles.backgroundImage} />
        </div>
        <div style={styles.topClipTriange} />
        <div style={styles.bottomClipTriange} />
      </div>
    );
  }
}

const styles = {
  wrapper: {
    position: 'relative',
    overflow: 'hidden',
    height: 750,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inntroContent: {
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    color: '#fff',
    width: 466,
  },
  titleLine: {
    width: 140,
    height: 2,
    marginTop: 17,
    background: '#FFFFFF',
    borderLeft: '2px solid ##5fb2f8',
  },
  titleHighlightLine: {
    background: '#3080FE',
    height: 2,
    width: 33,
  },
  title: {
    fontSize: 36,
  },
  desc: {
    fontSize: 16,
    lineHeight: 1.5,
    marginTop: 34,
    textAlign: 'center',
  },
  extraButton: {
    marginTop: 85,
    borderColor: '#fff',
    background: 'transparent',
    color: '#fff',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    background: '#ccc',
  },
  grayOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    background: 'rgba(0, 0, 0, 0.76)',
    zIndex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundImage: `url${require('./images/TB18Na6iHSYBuNjSspiXXXNzpXa-3800-2026.jpg')}`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  },
  topClipTriange: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    background: '#fff',
    height: '150px',
    zIndex: 1,
    clipPath: 'polygon(0 0, 0 100%, 100% 0)',
  },
  bottomClipTriange: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    background: '#fff',
    height: '150px',
    zIndex: 1,
    clipPath: 'polygon(0 100%, 100% 0%, 100% 100%)',
  },
};
