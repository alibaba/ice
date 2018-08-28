import React, { Component } from 'react';
import QueueAnim from 'rc-queue-anim';

export default class Banner extends Component {
  static displayName = 'Banner';

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
          <QueueAnim delay={200} duration={1000} interval={300} type="bottom">
            <div key="title" style={styles.title}>
              云栖极客派
            </div>
            <div key="logo" style={styles.logo}>
              <img
                src={require('./images/logo.png')}
                alt=""
                style={styles.image}
              />
            </div>
          </QueueAnim>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    height: '100%',
    marginTop: '78px',
    background: `url(${require('./images/bg.png')})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '240px',
    width: '100%',
    zIndex: '10',
  },
  title: {
    fontSize: '110px',
    lineHeight: '154px',
    letterSpacing: '24px',
    fontWeight: '700',
    color: '#fff',
  },
  logo: {
    display: 'flex',
    justifyContent: 'center',
  },
  image: {
    display: 'block',
    height: '70px',
  },
};
