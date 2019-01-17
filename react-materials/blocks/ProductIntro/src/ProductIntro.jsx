import React, { Component } from 'react';
import { Button } from '@alifd/next';

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
      <div style={styles.wrapper}>
        <div style={styles.productContent}>
          <div style={styles.productInfo}>
            <h3 style={styles.title}>Iceworks</h3>
            <div style={styles.titleLine}>
              <div style={styles.titleHighlightLine} />
            </div>
            <p style={styles.desc}>
              丰富模板一键创建，提供多种垂直领域模板，快速创建项目，支持风格切换，满足个性化需求；轻松操作页面管理，海量物料自由搭配，页面组合可视化操作更得心应手；开发调试一体化，集成运行环境零配置运行，开箱即用。
            </p>
            <Button
              component="a"
              href="#"
              target="_blank"
              style={styles.extraButton}
            >
              了解更多 &gt;
            </Button>
          </div>
          <div style={styles.productSnapshot}>
            <img
              width={696}
              height={527}
              src={require('./images/TB1SbvpgQyWBuNjy0FpXXassXXa-1392-1054.png')}
              alt=""
            />
          </div>
        </div>
        <div style={styles.clipBackground} />
      </div>
    );
  }
}

const styles = {
  wrapper: {
    position: 'relative',
    overflow: 'hidden',
    height: 690,
  },
  productContent: {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    justifyContent: 'center',
    marginTop: 120,
  },
  titleLine: {
    width: 140,
    height: 2,
    marginTop: 17,
    background: '#FFFFFF',
    borderLeft: '2px solid ##5fb2f8',
  },
  titleHighlightLine: {
    background: '#3080FE',
    height: 2,
    width: 33,
  },
  productSnapshot: {},
  productInfo: {
    width: 400,
    marginRight: 90,
    marginTop: 40,
  },
  title: {
    color: '#223C4E',
    fontSize: 36,
  },
  desc: {
    color: '#6D7A82',
    fontSize: 16,
    lineHeight: 1.5,
    marginTop: 24,
  },
  extraButton: {
    marginTop: 35,
    borderColor: '#3080FE',
    background: 'transparent',
    color: '#3080FE',
  },
  clipBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    background: '#FAFAFA',
    clipPath: 'polygon(0 15%, 100% 0, 100% 85%, 0% 100%)',
  },
};
