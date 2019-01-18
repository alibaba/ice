import React, { Component } from 'react';
import QueueAnim from 'rc-queue-anim';
import ScrollAnim from 'rc-scroll-anim';

const ScrollOverPack = ScrollAnim.OverPack;

export default class AboutGeek extends Component {
  static displayName = 'AboutGeek';

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
          <ScrollOverPack>
            <QueueAnim delay={200} duration={1000} interval={300} type="bottom">
              <div key="summary" style={styles.summary}>
                <div style={styles.num}>01_</div>
                <div style={styles.title}>About</div>
                <div style={styles.subtitle}>关于极客派</div>
              </div>
              <div
                key="introOne"
                style={{ ...styles.item, ...styles.introOne }}
              >
                <div style={styles.itemTitle}>新大陆的登月者</div>
                <div style={styles.itemDesc}>
                  “极客”曾指性格古怪的人，或是“电脑嬉皮士”的代名词。但如今，我们更喜欢用来形容那些信仰技术与创新的力量的群体。这些新大陆的登月者，天生热爱探索和创造，特立独行；生活、工作中他们推崇化繁为简，相信技术的力量并追求创新美学。
                </div>
              </div>
              <div
                key="introTwo"
                style={{ ...styles.item, ...styles.introTwo }}
              >
                <div style={styles.itemTitle}>手举好奇火把的探路者</div>
                <div style={styles.itemDesc}>
                  YunQi GeekPai
                  将举行四天开发者大赛以及极客体验区。4天，机器人格斗、GXIC2018
                  、区块链5场大赛，10场动手工作坊，100万奖金池，汇聚最geek的开发者；特设极客工作坊，
                  super coder 83行代码，坦克算法大赛等活动，开启极客之旅
                </div>
              </div>
            </QueueAnim>
          </ScrollOverPack>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    height: '100%',
    background: `url(${require('./images/bg.png')})`,
    backgroundSize: 'contain',
  },
  content: {
    position: 'relative',
    width: '1200px',
    margin: '0 auto',
    paddingTop: '180px',
  },
  summary: {
    marginRight: '100px',
    display: 'inline-block',
  },
  num: {
    fontSize: '64px',
    color: '#fff',
    lineHeight: '56px',
    marginBottom: '30px',
    fontWeight: '700',
  },
  title: {
    fontSize: '42px',
    color: '#fff',
    lineHeight: '42px',
    marginBottom: '15px',
    fontWeight: '700',
  },
  subtitle: {
    fontSize: '20px',
    color: '#fff',
    lineHeight: '20px',
    marginBottom: '15px',
  },
  introOne: {
    marginBottom: '85px',
  },
  introTwo: {
    left: '40%',
  },
  item: {
    display: 'inline-block',
    width: '720px',
    position: 'relative',
    top: '54px',
  },
  itemTitle: {
    fontSize: '32px',
    lineHeight: '32px',
    paddingBottom: '20px',
    fontWeight: '700',
    letterSpacing: '2px',
    color: '#fff',
  },
  itemDesc: {
    fontSize: '14px',
    lineHeight: '25px',
    color: '#fff',
    fontWeight: '400',
  },
};
