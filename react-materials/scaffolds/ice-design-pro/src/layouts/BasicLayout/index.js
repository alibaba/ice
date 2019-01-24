import React, { Component } from 'react';
import Layout from '@icedesign/layout';
import { withRouter } from 'react-router';
import { enquire } from 'enquire-js';

import Header from './components/Header';
import Aside from './components/Aside';
import Footer from './components/Footer';
import BasicLayoutHoc from './BasicLayoutHoc';
import MainRoutes from './MainRoutes';
import './index.scss';

@withRouter
@BasicLayoutHoc
export default class BasicLayout extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      isScreen: 'isDesktop',
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

  render() {
    const { profile = {}, userLogout } = this.props;
    const isMobile = this.state.isScreen !== 'isDesktop';
    const layoutClassName = 'ice-design-layout-dark ice-design-layout';

    return (
      <div className={layoutClassName}>
        <Layout>
          <Header
            isMobile={isMobile}
            profile={profile}
            handleLogout={userLogout}
          />
          <Layout.Section scrollable>
            <Layout.Aside width="auto" type={null}>
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
