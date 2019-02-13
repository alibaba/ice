import React, { Component } from 'react';
import ScrollAnim from 'rc-scroll-anim';
import QueueAnim from 'rc-queue-anim';

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
        <ScrollOverPack always={false}>
          <QueueAnim type="bottom" delay={100} duration={1000}>
            <div style={styles.content} key="content">
              <div style={styles.summary}>
                <div style={styles.mainTitle}>EVENTS</div>
                <div style={styles.mainDesc}>创新活动</div>
              </div>
              <div style={styles.items}>
                <div style={{ ...styles.item, ...styles.itemFull }}>
                  <div style={{ ...styles.itemFullBox, ...styles.itemBox }}>
                    <div style={styles.subtit}>YunQi GeekPai 云栖极客派</div>
                    <div style={styles.desc}>
                      新大陆的登月者,
                      去探索未来世界的无限可能。GXIC2018，安全大赛，区块链活动，汇聚最geek的开发者；特设极客体验区，现场感受数据运算，8分钟成为contributor，super
                      coder
                      83行代码，坦克算法大赛等活动，各种新生代开启极客之旅。查看详情
                    </div>
                  </div>
                </div>
                <div style={{ ...styles.item, ...styles.itemLeft }}>
                  <div style={{ ...styles.itemLeftBox, ...styles.itemBox }}>
                    <div style={styles.subtit}>Tech Go 云栖智能运动会</div>
                    <div style={styles.desc}>
                      运动和科技的结合，智能和肌肉一起发力，数据与肾上腺素同步共振。篮球、足球、跑步、自行车，在这里亲身体验前所未有的黑科技玩法。YOU
                      ARE TECH HERO！
                    </div>
                  </div>
                </div>
                <div style={{ ...styles.item, ...styles.itemRight }}>
                  <div style={{ ...styles.itemRightBox, ...styles.itemBox }}>
                    <div style={styles.subtit}>
                      Music Festival 云栖·虾米音乐节
                    </div>
                    <div style={styles.desc}>
                      这是一场科技与音乐的碰撞、创新与传统的融合、潮流与经典的交锋。大牌汇聚，燃爆现场，辅助数字前沿科技呈现，奉上震撼持久的试听盛宴。云栖·虾米音乐节打造最热科技音乐现场，等你来撩！
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </QueueAnim>
        </ScrollOverPack>
      </div>
    );
  }
}

const styles = {
  container: {
    minHeight: '1000px',
    padding: '50px 0',
    background: '#000',
  },
  summary: {
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
  items: {
    marginTop: '70px',
    overflow: 'hidden',
  },
  item: {
    float: 'left',
    height: '360px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '50%',
    position: 'relative',
  },
  itemFull: {
    width: '100%',
    backgroundImage:
      'url(https://img.alicdn.com/tfs/TB1Ylpwn5OYBuNjSsD4XXbSkFXa-2884-720.png)',
    backgroundSize: 'cover',
  },
  itemLeft: {
    width: '46%',
    backgroundImage:
      'url(https://img.alicdn.com/tfs/TB1SQ5cwXOWBuNjy0FiXXXFxVXa-1340-720.png)',
    backgroundSize: 'cover',
  },
  itemRight: {
    width: '54%',
    backgroundSize: 'cover',
    backgroundImage:
      'url(https://img.alicdn.com/tfs/TB15sxxwgmTBuNjy1XbXXaMrVXa-1556-720.png)',
  },
  itemBox: {
    position: 'absolute',
    bottom: '0',
    width: '100%',
    height: '158px',
    padding: '28px 90px',
    background: 'rgba(0,0,0,.7)',
    transition: 'all .3s',
  },
  itemFullBox: {
    paddingRight: '39.5%',
    left: '46%',
    maxWidth: '54%',
  },
  itemLeftBox: {
    paddingLeft: '39.5%',
    right: 0,
  },
  itemRightBox: {
    paddingRight: '39.5%',
    left: 0,
  },
  subtit: {
    fontSize: '20px',
    lineHeight: '30px',
    color: '#fff',
    fontWeight: '700',
  },
  desc: {
    fontSize: '14px',
    lineHeight: '22px',
    color: '#fff',
    height: '66px',
    marginTop: '6px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: '4',
  },
};
