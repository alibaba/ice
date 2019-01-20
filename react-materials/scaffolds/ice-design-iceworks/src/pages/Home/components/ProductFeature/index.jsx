import React, { Component } from 'react';

export default class ProductFeature extends Component {
  static displayName = 'ProductFeature';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={styles.wrapperContainer}>
        <div style={styles.wrapper}>
          <div style={styles.feature}>
            <div style={styles.title}>{this.props.title}</div>
            <div style={styles.line}>
              <div style={styles.lineHeader} />
            </div>
            <div style={styles.desc}>{this.props.desc}</div>
          </div>
          <div style={styles.cover}>
            <img
              alt="特点图"
              style={{ ...styles.coverImage, ...this.props.img }}
              src={this.props.img.url}
            />
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  wrapperContainer: {
    backgroundColor: '#f6f6f6',
  },
  wrapper: {
    position: 'relative',
    backgroundColor: '#f6f6f6',
    height: 500,
    maxWidth: 1190,
    margin: '0 auto',
  },
  feature: {
    marginLeft: '50%',
    marginRight: '10%',
    paddingTop: 160,
    paddingBottom: 160,
    paddingLeft: 30,
    backgroundImage:
      `url(${require('./images/TB1fFH5pAyWBuNjy0FpXXassXXa-66-66.png')})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '10px 120px',
  },
  line: {
    height: 2,
    width: 140,
    backgroundColor: '#fff',
    margin: '20px 0',
  },
  lineHeader: {
    height: 2,
    width: 33,
    backgroundColor: '#3080FE',
  },
  title: {
    color: '#3080FE',
    fontSize: 36,
  },
  desc: {
    fontSize: 16,
    color: '#6D7A82',
    maxWidth: 400,
    lineHeight: '26px',
  },
  cover: {
    position: 'absolute',
    right: '55%',
    bottom: 0,
  },
  coverImage: {
    maxHeight: 430,
    display: 'block',
  },
};
