import React, { Component } from 'react';
import QueueAnim from 'rc-queue-anim';
import ScrollAnim from 'rc-scroll-anim';
import Summary from '../Summary';
import MOCK_DATA from './data';

const ScrollOverPack = ScrollAnim.OverPack;

export default class Workshop extends Component {
  static displayName = 'Workshop';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={styles.container}>
        <ScrollOverPack>
          <div style={styles.content}>
            <div style={styles.contentLeft}>
              <QueueAnim
                key="queueAnim"
                delay={200}
                duration={1000}
                interval={300}
                type="bottom"
              >
                <Summary
                  key="summary"
                  num={3}
                  title="Geek Workshop"
                  subTitle="工作坊"
                />
              </QueueAnim>
            </div>

            <div style={styles.contentRight}>
              <div style={styles.items}>
                <QueueAnim
                  delay={100}
                  duration={450}
                  interval={200}
                  type="bottom"
                >
                  {MOCK_DATA.map((item, index) => {
                    return (
                      <div style={styles.item} key={index}>
                        <div style={styles.itemNum}>{`0${item.id}`}</div>
                        <div style={styles.itemTitle}>{item.title}</div>
                      </div>
                    );
                  })}
                </QueueAnim>
              </div>
            </div>
          </div>
        </ScrollOverPack>
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
    display: 'flex',
  },
  contentLeft: {
    width: '50%',
  },
  contentRight: {
    width: '50%',
  },
  item: {
    marginBottom: '35px',
    display: 'flex',
    alignItems: 'center',
  },
  itemNum: {
    width: '28px',
    height: '28px',
    lineHeight: '28px',
    background: '#d1ff00',
    borderRadius: '50%',
    fontSize: '16px',
    color: '#000',
    textAlign: 'center',
    fontWeight: '700',
  },
  itemTitle: {
    fontSize: '24px',
    color: '#fff',
    letterSpacing: '2px',
    marginLeft: '30px',
    fontWeight: '700',
  },
};
