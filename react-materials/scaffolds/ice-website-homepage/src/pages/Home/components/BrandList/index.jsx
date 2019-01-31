/* eslint no-undef: 0 */
import { Button } from '@alifd/next';
import React, { Component } from 'react';
import styles from './index.module.scss';

const brandlist = [
  require('./images/TB14.LkieuSBuNjy1XcXXcYjFXa-226-78.png'),
  require('./images/TB1LgSMibuWBuNjSszgXXb8jVXa-206-72.png'),
  require('./images/TB1jFDwiamWBuNjy1XaXXXCbXXa-284-56.png'),
  require('./images/TB147fnikSWBuNjSszdXXbeSpXa-180-68.png'),
  require('./images/TB1fdJliDtYBeNjy1XdXXXXyVXa-208-78.png'),
  require('./images/TB19a2XikyWBuNjy0FpXXassXXa-244-68.png'),
  require('./images/TB1m7veieuSBuNjSsziXXbq8pXa-262-62.png'),
  require('./images/TB10Mjkib1YBuNjSszhXXcUsFXa-208-76.png'),
  require('./images/TB1zdJliDtYBeNjy1XdXXXXyVXa-184-76.png'),
  require('./images/TB1h9yEigaTBuNjSszfXXXgfpXa-298-70.png'),
  require('./images/TB1DPSIibGYBuNjy0FoXXciBFXa-128-60.png'),
  require('./images/TB1y9TNioR1BeNjy0FmXXb0wVXa-254-74.png'),
  require('./images/TB1SpDwiamWBuNjy1XaXXXCbXXa-242-46.png'),
  require('./images/TB1EkveieuSBuNjSsziXXbq8pXa-240-78.png'),
];

export default class BrandList extends Component {
  static displayName = 'BrandList';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.titleWrapper}>
          <h3 className={styles.title}>专业的选择</h3>
          <div className={styles.titleLine}>
            <div className={styles.titleHighlightLine} />
          </div>
        </div>
        <p className={styles.desc}>
          270多个项目正在使用，持续可靠的稳定，即时有效的服务
        </p>
        <div className={styles.brandListWrapper}>
          {brandlist.map((item, index) => {
            return (
              <div className={styles.brandItem} key={index}>
                <img src={item} alt="" className={styles.brandImage} />
              </div>
            );
          })}
        </div>
        <div className={styles.extraInfo}>
          <Button
            component="a"
            href="https://github.com/alibaba/ice/issues/156"
            target="_blank"
            type="secondary"
            className={styles.extraButton}
          >
            提交你的案例 +
          </Button>
        </div>
      </div>
    );
  }
}
