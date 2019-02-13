import React, { Component } from 'react';
import { Button } from '@alifd/next';
import styles from './index.module.scss';

export default class PlatformLanding extends Component {
  static displayName = 'PlatformLanding';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.body}>
          <h2 className={styles.title}>
            在人工智能将替代一切的未来<br />唯有内容的创作无可替代
          </h2>
          <div className={styles.buttons}>
            <Button className={styles.secondaryButton} size="large" type="normal">
              开通
            </Button>
            <Button className={styles.primaryButton} size="large" type="primary">
              登录
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
