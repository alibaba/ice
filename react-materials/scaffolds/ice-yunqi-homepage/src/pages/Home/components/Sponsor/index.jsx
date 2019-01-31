import React, { Component } from 'react';

export default class Sponsor extends Component {
  static displayName = 'Sponsor';

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
          <div style={styles.mainTitle}>SPONSOR</div>
          <div style={styles.mainDesc}>赞助商</div>
          <ul style={styles.items}>
            <li style={styles.item}>
              <p style={styles.subtit}>战略合作伙伴</p>
              <div style={styles.logoItems}>
                <div style={styles.logoItem}>
                  <img
                    src="https://img.alicdn.com/tfs/TB1GPlpcf1TBuNjy0FjXXajyXXa-266-172.png"
                    alt=""
                    style={styles.logoImg}
                  />
                </div>
              </div>
            </li>
          </ul>
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
  items: {
    marginTop: '70px',
    overflow: 'hidden',
  },
  item: {
    marginBottom: '22px',
  },
  subtit: {
    fontSize: '16px',
    color: '#fff',
    lineHeight: '22px',
  },
  logoItems: {
    marginTop: '40px',
  },
  logoItem: {
    marginRight: '65px',
    marginBottom: '30px',
  },
  logoImg: {
    maxWidth: '196px',
  },
};
