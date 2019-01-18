import React, { Component } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import ProductFeature from './components/ProductFeature';
import CustomMaterials from './components/CustomMaterials';
import VisualAssembly from './components/VisualAssembly';
import SoftwareDownload from './components/SoftwareDownload';
import ChangeLogs from './components/ChangeLogs';

export default class Home extends Component {
  static displayName = 'Home';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="home-page" style={styles.homepage}>
        <Header />
        <SoftwareDownload />
        <div id="feature">
          <ProductFeature
            title="模板自定义创建"
            desc="提供多种垂直领域模板，快速创建项目，支持风格切换，满足个性化需求"
            img={{
              url:
                require('./images/TB1AC4BpL5TBuNjSspmXXaDRVXa-1816-878.png'),
              width: 1816 / 2,
              height: 878 / 2,
            }}
          />
        </div>
        <VisualAssembly />
        <ProductFeature
          title="布局自定义生成"
          desc="模板内置布局，同时提供交互式的定制功能生产专属布局"
          img={{
            url:
              require('./images/TB1CbvHpTtYBeNjy1XdXXXXyVXa-1240-902.png'),
            width: 1240 / 2,
            height: 902 / 2,
          }}
        />
        <CustomMaterials />
        <div id="project">
          <ProductFeature
            title="项目仪表盘插件化"
            desc="丰富多样的项目信息面板，页面信息，路由信息依赖管理等，配置专属的Iceworks界面"
            img={{
              url:
                require('./images/TB1pPQppv1TBuNjy0FjXXajyXXa-1280-860.png'),
              width: 1280 / 2,
              height: 860 / 2,
            }}
          />
        </div>
        <div id="changelog">
          <ChangeLogs />
        </div>
        <Footer />
      </div>
    );
  }
}

const styles = {
  homepage: {
    background: '#fff',
    overflow: 'hidden',
  },
};
