import React, { Component } from 'react';
import QueueAnim from 'rc-queue-anim';
import ScrollAnim from 'rc-scroll-anim';

import Summary from '../Summary';

const ScrollOverPack = ScrollAnim.OverPack;

export default class Events extends Component {
  static displayName = 'Events';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.contentLeft} />
        <div style={styles.contentRight} />
        <ScrollOverPack>
          <div style={styles.content}>
            <QueueAnim
              key="queueAnim1"
              delay={200}
              duration={1000}
              interval={300}
              type="bottom"
            >
              <Summary
                key="summary"
                num={2}
                title="Events"
                subTitle="极客活动"
              />
            </QueueAnim>
            <QueueAnim
              key="queueAnim2"
              delay={500}
              duration={1000}
              interval={500}
              type="top"
            >
              <div key="image" style={styles.imageWrap}>
                <img
                  src={require('./images/TB1q7_6A41YBuNjy1zcXXbNcXXa-1440-900.png')}
                  alt=""
                  style={styles.image}
                />
              </div>
            </QueueAnim>

            <QueueAnim
              key="queueAnim3"
              delay={500}
              duration={1000}
              interval={500}
              type="bottom"
            >
              <div key="introWrap" style={styles.introWrap}>
                <div style={styles.introNum}>02.1</div>
                <div style={styles.introTitle}>阿里云IoT极客创新挑战赛2018</div>
                <div style={styles.introDesc}>
                  <div style={styles.introLine} />
                  <p style={styles.introText}>
                    美好生活是人类乃至地球所有物种的终极追求之一，接下来的智联网时代，又有什么惊喜在等着我们？
                    阿里云IoT事业部联合淘宝极有家、桃花源基金会和上海诺行发起了2018极客创新挑战赛。加入这场创新挑战，为自己，为地球上的其他物种，创出更美好的未来
                  </p>
                </div>
                <div style={styles.linkButton}>
                  <a style={styles.link}>了解更多</a>
                </div>
              </div>
            </QueueAnim>
          </div>
        </ScrollOverPack>
      </div>
    );
  }
}

const styles = {
  container: {
    height: '100%',
    background: '#000',
  },
  contentLeft: {
    background: '#000',
    height: '100%',
    position: 'relative',
    float: 'left',
    width: '50%',
  },
  contentRight: {
    backgroundImage: 'linear-gradient(-180deg,#3b2da6,#000)',
    height: '100%',
    position: 'relative',
    float: 'right',
    width: '50%',
  },
  content: {
    position: 'absolute',
    left: '0',
    right: '0',
    width: '1200px',
    margin: '0 auto',
    paddingTop: '180px',
    zIndex: '10',
  },
  imageWrap: {
    float: 'left',
  },
  image: {
    height: '450px',
    margin: '0 auto',
    borderLeft: '8px solid #df4',
  },
  introWrap: {
    position: 'absolute',
    left: '58%',
    top: '45%',
    width: '520px',
    padding: '30px 20px 20px',
    background: '#5a44ff',
    boxShadow: '0 4px 9px 0 rgba(0, 0, 0, .5)',
  },
  introNum: {
    fontSize: '18px',
    color: '#fff',
    letterSpacing: '.83px',
    paddingBottom: '10px',
    fontWeight: '700',
  },
  introTitle: {
    fontSize: '31px',
    color: '#fff',
    letterSpacing: '1.5px',
    lineHeight: '42px',
    paddingBottom: '6px',
    fontWeight: '700',
  },
  introDesc: {
    marginTop: '20px',
    fontSize: '14px',
    color: '#777f84',
    paddingTop: '0',
    float: 'left',
  },
  introLine: {
    width: '30px',
    height: '2px',
    background: '#fff',
    display: 'inline-block',
    float: 'left',
    marginRight: '10px',
  },
  introText: {
    textAlign: 'justify',
    float: 'left',
    width: '90%',
    marginTop: '-10px',
    color: '#fff',
    letterSpacing: '.35px',
  },
  linkButton: {
    width: '140px',
    height: '40px',
    lineHeight: '40px',
    background: '#000',
    textAlign: 'center',
    float: 'left',
    marginTop: '25px',
  },
  link: {
    width: '140px',
    height: '40px',
    lineHeight: '40px',
    display: 'inline-block',
    textDecoration: 'none',
    color: '#fff',
    fontSize: '14px',
  },
};
