/* eslint no-undef:0 */
import React, { PureComponent } from 'react';
import cx from 'classnames';
import Layout from '@icedesign/layout';
import { enquireScreen } from 'enquire-js';
import Header from './../../components/Header';
import Footer from './../../components/Footer';
import './scss/light.scss';
import './scss/dark.scss';

// 设置默认的皮肤配置，支持 dark 和 light 两套皮肤配置
const theme = typeof THEME === 'undefined' ? 'dark' : THEME;

export default class BasicLayout extends PureComponent {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      isMobile: false,
      theme,
    };
  }

  componentDidMount() {
    this.enquireScreenRegister();
  }

  enquireScreenRegister = () => {
    const mediaCondition = 'only screen and (max-width: 720px)';

    enquireScreen((mobile) => {
      this.setState({
        isMobile: mobile,
      });
    }, mediaCondition);
  };

  toggleTheme = () => {
    this.setState({
      theme: this.state.theme === 'dark' ? 'light' : 'dark',
    });
  };

  render() {
    return (
      <Layout
        style={{ minHeight: '100vh' }}
        className={cx(`ice-design-header-footer-layout-${this.state.theme}`, {
          'ice-design-layout': true,
        })}
      >
        <Header theme={this.state.theme} isMobile={this.state.isMobile} />

        {!this.state.isMobile && (
          <a className="theme-btn" onClick={this.toggleTheme}>
            切换主题
          </a>
        )}

        <Layout.Main className="ice-design-layout-body">
          {this.props.children}
        </Layout.Main>

        <Footer />
      </Layout>
    );
  }
}
