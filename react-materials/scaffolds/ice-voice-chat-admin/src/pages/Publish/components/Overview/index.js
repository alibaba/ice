import React, { Component } from 'react';
import Icon from '@icedesign/foundation-symbol';
import styles from './index.module.scss';

export default class Overview extends Component {
  static displayName = 'Overview';

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.item}>
          <div
            className={styles.symbol1}
          >
            <Icon type="repair" />
          </div>
          <div className={styles.itemBox}>
            <p className={styles.itemLabel}>技能</p>
            <h5 className={styles.itemValue}>3</h5>
          </div>
          <div className={styles.itemBox}>
            <p className={styles.itemLabel}>意图</p>
            <h5 className={styles.itemValue}>0</h5>
          </div>
        </div>
        <div className={styles.item}>
          <div
            className={styles.symbol2}
          >
            <Icon type="ul-list" />
          </div>
          <div className={styles.itemBox}>
            <p className={styles.itemLabel}>知识库</p>
            <h5 className={styles.itemValue}>2</h5>
          </div>
          <div className={styles.itemBox}>
            <p className={styles.itemLabel}>知识点</p>
            <h5 className={styles.itemValue}>8</h5>
          </div>
        </div>
      </div>
    );
  }
}
