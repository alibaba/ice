import React, { Component } from 'react';

export default class ProductFeature extends Component {
  static displayName = 'ProductFeature';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={styles.wrapper}>
        <div style={styles.feature}>
          <div style={styles.title}>项目仪表盘插件化</div>
          <div style={styles.line}>
            <div style={styles.lineHeader} />
          </div>
          <div style={styles.desc}>
            丰富多样的项目信息面板，页面信息，路由信息 依赖管理等，配置专属的
            Iceworks 界面
          </div>
        </div>
        <div style={styles.cover}>
          <img
            alt="特点图"
            style={styles.coverImage}
            src="https://img.alicdn.com/tfs/TB1pPQppv1TBuNjy0FjXXajyXXa-1280-860.png"
          />
        </div>
      </div>
    );
  }
}

const styles = {
  wrapper: {
    position: 'relative',
    backgroundColor: '#f6f6f6',
  },
  feature: {
    marginLeft: '50%',
    marginRight: '10%',
    paddingTop: 160,
    paddingBottom: 160,
    paddingLeft: 30,
    backgroundImage:
      'url(https://img.alicdn.com/tfs/TB1fFH5pAyWBuNjy0FpXXassXXa-66-66.png)',
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
    top: 0,
  },
  coverImage: {
    maxHeight: 430,
  },
};
