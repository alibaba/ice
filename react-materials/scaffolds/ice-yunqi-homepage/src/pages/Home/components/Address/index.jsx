import React, { Component } from 'react';

export default class Address extends Component {
  static displayName = 'Address';

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
          <div style={styles.mainTitle}>ADDRESS</div>
          <div style={styles.mainDesc}>会议地址及场馆信息</div>
          <img
            src="https://img.alicdn.com/tfs/TB17C4AuKOSBuNjy0FdXXbDnVXa-2520-1080.jpg"
            alt=""
            style={styles.img}
          />
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    padding: '50px 0',
    background: '#000',
  },
  content: {
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
  img: {
    marginTop: '70px',
    maxWidth: '100%',
  },
};
