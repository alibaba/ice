import React, { Component } from 'react';
import { Button } from '@alifd/next';
import { Link } from 'react-router-dom';
import styles from './index.module.scss';

export default class IntroWithBackground extends Component {
  static displayName = 'IntroWithBackground';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.inntroContent}>
          <h3 className={styles.title}>海量物料</h3>
          <div className={styles.titleLine}>
            <div className={styles.titleHighlightLine} />
          </div>
          <p className={styles.desc}>
            专业视觉设计，每周物料更新，丰富组合区块，不同领域模板
            自定义主题配置，响应式设计，海量物料满足您开发所需
          </p>
          <Link to="">
            <Button className={styles.extraButton}>了解更多 &gt;</Button>
          </Link>
        </div>
        <div className={styles.background}>
          <div className={styles.grayOverlay} />
          <div className={styles.backgroundImage} />
        </div>
        <div className={styles.topClipTriange} />
        <div className={styles.bottomClipTriange} />
      </div>
    );
  }
}
