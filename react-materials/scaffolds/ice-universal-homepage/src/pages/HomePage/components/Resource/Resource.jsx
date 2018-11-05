import React, { Component } from 'react';

export default class Resource extends Component {
  static displayName = 'Resource';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={styles.container}>
        <h3 style={styles.title}>标题简介</h3>
        <div style={styles.content}>
          <div style={{ ...styles.cell, ...styles.leftContent }}>
            <div style={styles.infoBox}>
              <h6 style={styles.subTitle}>Design System</h6>
              <p style={styles.desc}>
                目前传统平台界面的设计语言存在着一些不足，比如色彩单一，大量线条的使用，分割化明显。其实，将这些不足归类一下就是界面单调，雷同性明显，缺少惊喜。也许新的平台类视觉风格可以打破这些束缚，尝试一些新的探索，启发传统的设计认知。因此，结合当下设计趋势，构思了一套新的平台产品设计语言。
              </p>
              <a href="#" style={styles.link}>
                访问站点
              </a>
            </div>
            <img
              src="https://gw.alipayobjects.com/zos/rmsportal/VvGnZYfUXGmgkJklZRDH.png_.webp"
              alt=""
              style={{ width: '392px', marginTop: '60px' }}
            />
          </div>
          <div style={{ ...styles.cell, ...styles.rightContent }}>
            <div style={{ ...styles.itemBody, ...styles.topItemBody }}>
              <div style={styles.itemBodyImg}>
                <img
                  src="https://img.alicdn.com/tfs/TB1Od0ZnH_I8KJjy1XaXXbsxpXa-276-200.png_.webp"
                  alt=""
                  style={{ width: '144px', marginRight: '40px' }}
                />
              </div>
              <div style={styles.infoBox}>
                <h6 style={styles.subTitle}>标题简介</h6>
                <p style={styles.desc}>
                  轻松操作页面管理，海量物料自由搭配，页面组合可视化操作更得心应手；开发调试一体化，集成运行环境零配置运行，开箱即用
                </p>
                <a href="#" style={styles.link}>
                  访问站点
                </a>
              </div>
            </div>
            <div style={{ ...styles.itemBody, ...styles.bottomItemBody }}>
              <div style={styles.infoBox}>
                <h6 style={styles.subTitle}>标题简介</h6>
                <p style={styles.desc}>
                  致力于在设计规范和基础组件的基础上，继续自下往上构建，提炼出典型模板/业务组件/配套设计资源，进一步提升企业级中后台产品设计研发过程中的『用户』和『开发者』的体验
                </p>
                <a href="#" style={styles.link}>
                  访问站点
                </a>
              </div>
              <div style={styles.itemBodyImg}>
                <img
                  src="https://img.alicdn.com/tfs/TB1M00ZnH_I8KJjy1XaXXbsxpXa-352-240.png_.webp"
                  alt=""
                  style={{ width: '144px', marginLeft: '40px' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    width: '1200px',
    padding: '80px 0',
    margin: '0 auto',
  },
  content: {
    padding: '40px',
    boxShadow: '0 10px 30px 0 rgba(0,0,0,0.10)',
    display: 'flex',
  },
  leftContent: {
    borderRight: '1px solid #f0f0f0',
  },
  cell: {
    width: '50%',
    padding: '40px',
  },
  title: {
    lineHeight: '38px',
    fontWeight: 'bold',
    fontSize: '40px',
    margin: '0 0 24px',
    textAlign: 'center',
  },
  subTitle: {
    margin: '0 0 15px',
    color: 'rgba(0,0,0,0.8)',
    fontWeight: 'bold',
    fontSize: '18px',
    textTransform: 'uppercase',
  },
  desc: {
    fontSize: '14px',
    textAlign: 'justify',
    color: 'rgba(0,0,0,0.6)',
    lineHeight: '24px',
    marginBottom: '15px',
  },
  link: {
    fontSize: '14px',
    fontWeight: '500',
    marginTop: '24px',
  },
  itemBody: {
    display: 'flex',
  },
  topItemBody: {
    paddingBottom: '80px',
    marginBottom: '80px',
    borderBottom: '1px solid #f0f0f0',
  },
  itemBodyImg: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
