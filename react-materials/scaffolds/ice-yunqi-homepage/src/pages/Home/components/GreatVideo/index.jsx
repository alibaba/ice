import React, { Component } from 'react';
import ScrollAnim from 'rc-scroll-anim';
import Texty from 'rc-texty';

const ScrollOverPack = ScrollAnim.OverPack;
export default class GreatVideo extends Component {
  static displayName = 'GreatVideo';

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
          <div style={styles.mask} />
          <video
            style={styles.video}
            poster="https://img.alicdn.com/tfs/TB1IAHRuamWBuNjy1XaXXXCbXXa-2880-932.png"
            autoPlay
            muted
            loop
          >
            <source
              src="//cloud.video.taobao.com/play/u/10654505/p/1/e/6/t/1/50082534951.mp4"
              type="video/mp4"
            />
          </video>
          <ScrollOverPack always={false}>
            <div style={styles.introContainer} key="introContainer">
              <div style={styles.introContent}>
                <h3 style={styles.title}>
                  <Texty type="bottom" delay={300}>
                    WATCH2017
                  </Texty>
                </h3>
                <div style={styles.desc}>
                  <Texty type="bottom" delay={500}>
                    2017杭州云栖大会精彩视频
                  </Texty>
                </div>
              </div>
            </div>
          </ScrollOverPack>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    background: '#000',
    paddingTop: '50px',
  },
  content: {
    minHeight: '466px',
    position: 'relative',
    overflow: 'hidden',
  },
  mask: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    Zndex: '1',
    backgroundImage: 'linear-gradient(180deg,transparent,rgba(0,0,0,.7))',
    background: 'rgba(0,0,0,.4)',
  },
  video: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    minWidth: '100%',
    minHeight: '100%',
    width: 'auto',
    height: 'auto',
    zIndex: '0',
    transform: 'translateX(-50%) translateY(-50%)',
    transition: 'opacity 1s',
  },
  introContainer: {
    position: 'relative',
    height: '100%',
    overflow: 'hidden',
  },
  introContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '466px',
    position: 'relative',
    zIndex: '2',
  },
  title: {
    position: 'relative',
    textAlign: 'center',
    margin: '0',
    fontSize: '48px',
    lineHeight: '58px',
    letterSpacing: '44px',
    color: '#fff',
    fontWeight: '700',
  },
  desc: {
    fontSize: '20px',
    color: '#fff',
    lineHeight: '40px',
    letterSpacing: '30px',
    marginTop: '8px',
    position: 'relative',
    textAlign: 'center',
  },
};
