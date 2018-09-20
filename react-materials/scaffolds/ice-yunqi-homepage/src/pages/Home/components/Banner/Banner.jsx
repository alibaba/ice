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
        <QueueAnim
          type="bottom"
          delay={100}
          duration={1000}
          className="home-title"
        >
          <div key="content" style={styles.content}>
            <div style={styles.title}>
              <img
                src="https://img.alicdn.com/tfs/TB1V0pgaPrguuRjy0FeXXXcbFXa-1233-322.gif"
                alt=""
                style={styles.titlePic}
              />
            </div>

            <div style={styles.time}>
              <img
                src="https://img.alicdn.com/tfs/TB1eBaZGN9YBuNjy0FfXXXIsVXa-896-68.png"
                alt=""
                style={styles.timePic}
              />
            </div>

            <div style={styles.button}>
              <a href="#" style={styles.link}>
                立即购票
              </a>
            </div>
          </div>
        </QueueAnim>
      </div>
    );
  }
}

const styles = {
  container: {
    width: '100%',
    height: '850px',
    marginTop: '78px',
    backgroundImage: `url(${require('./images/banner.png')})`,
    backgroundSize: 'cover',
    backgroundPosition: '50%',
    backgroundRepeat: 'no-repeat',
  },
  content: {
    width: '1200px',
    margin: '0 auto',
  },
  title: {
    paddingTop: '215px',
  },
  titlePic: {
    width: 'auto',
    height: '148px',
    display: 'block',
  },
  time: {
    marginTop: '50px',
  },
  timePic: {
    maxHeight: '34px',
    maxWidth: '100%',
  },
  button: {
    marginTop: '90px',
  },
  link: {
    display: 'block',
    width: '160px',
    height: '48px',
    lineHeight: '48px',
    textAlign: 'center',
    fontSize: '18px',
    color: '#fff',
    background: '#236cff',
    textDecoration: 'none',
    transition: 'all .3',
  },
};
