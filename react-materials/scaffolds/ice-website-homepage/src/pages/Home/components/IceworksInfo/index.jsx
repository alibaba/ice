import React, { Component } from 'react';
import { Button } from '@alifd/next';
import { Link } from 'react-router-dom';
import styles from './index.module.scss';

export default class ProductIntro extends Component {
  static displayName = 'ProductIntro';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.productContent}>
          <div className={styles.productInfo}>
            <h3 className={styles.title}>Iceworks</h3>
            <div className={styles.titleLine}>
              <div className={styles.titleHighlightLine} />
            </div>
            <p className={styles.desc}>
              丰富模板一键创建，提供多种垂直领域模板，快速创建项目，支持风格切换，满足个性化需求；轻松操作页面管理，海量物料自由搭配，页面组合可视化操作更得心应手；开发调试一体化，集成运行环境零配置运行，开箱即用。
            </p>
            <Link to="">
              <Button type="secondary" className={styles.extraButton}>了解更多 &gt;</Button>
            </Link>
          </div>
          <div className={styles.productSnapshot}>
            <img
              width={696}
              height={527}
              src={require('./images/TB1SbvpgQyWBuNjy0FpXXassXXa-1392-1054.png')}
              alt=""
            />
          </div>
        </div>
        <div className={styles.clipBackground} />
      </div>
    );
  }
}
