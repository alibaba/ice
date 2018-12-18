import React, { Component } from 'react';
import Layout from '@icedesign/layout';
import { withRouter } from 'react-router';
import { enquire } from 'enquire-js';

import Header from './components/Header';
import Aside from './components/Aside';
import Footer from './components/Footer';
import BasicLayoutHoc from './BasicLayoutHoc';
import MainRoutes from './MainRoutes';
import './scss/index.scss';

// 设置默认的皮肤配置，支持 dark 和 light 两套皮肤配置
const DEFAULT_THEME = 'dark';

@withRouter
@BasicLayoutHoc
export default class BasicLayout extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      isScreen: 'isDesktop',
      theme: DEFAULT_THEME,
    };
  }

  componentDidMount() {
    this.enquireScreenRegister();
  }

  /**
   * 注册监听屏幕的变化，可根据不同分辨率做对应的处理
   */
  enquireScreenRegister = () => {
    const isMobile = 'screen and (max-width: 720px)';
    const isTablet = 'screen and (min-width: 721px) and (max-width: 1199px)';
    const isDesktop = 'screen and (min-width: 1200px)';

    enquire.register(isMobile, this.enquireScreenHandle('isMobile'));
    enquire.register(isTablet, this.enquireScreenHandle('isTablet'));
    enquire.register(isDesktop, this.enquireScreenHandle('isDesktop'));
  };

  enquireScreenHandle = (type) => {
    const handler = {
      match: () => {
        this.setState({
          isScreen: type,
        });
      },
    };

    return handler;
  };

  settingTheme = () => {
    const { theme } = this.state;
    this.setState({
      theme: theme === 'dark' ? 'light' : 'dark',
    });
  };

  render() {
    const { theme } = this.state;
    const { profile = {}, userLogout } = this.props;
    const isMobile = this.state.isScreen !== 'isDesktop';
    const layoutClassName = `ice-design-layout-${theme} ice-design-layout`;

    return (
      <div className={layoutClassName}>
        <Layout>
          <Header
            theme={theme}
            isMobile={isMobile}
            profile={profile}
            handleLogout={userLogout}
          />
          <div className="setting-theme" onClick={this.settingTheme}>
            切换主题
          </div>
          <Layout.Section scrollable>
            <Layout.Aside theme={theme} width="auto">
              <Aside isMobile={isMobile} />
            </Layout.Aside>
            <Layout.Main>
              <MainRoutes />
            </Layout.Main>
          </Layout.Section>

          <Footer />
        </Layout>
      </div>
    );
  }
}
