import React, { Component } from 'react';
import styles from './index.module.scss';

export default class ProductFeature extends Component {
  static displayName = 'ProductFeature';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={styles.wrapperContainer}>
        <div className={styles.wrapper}>
          <div className={styles.feature}>
            <div className={styles.title}>{this.props.title}</div>
            <div className={styles.line}>
              <div className={styles.lineHeader} />
            </div>
            <div className={styles.desc}>{this.props.desc}</div>
          </div>
          <div className={styles.cover}>
            <img
              alt="特点图"
              className={styles.coverImage}
              style={this.props.img}
              src={this.props.img.url}
            />
          </div>
        </div>
      </div>
    );
  }
}

