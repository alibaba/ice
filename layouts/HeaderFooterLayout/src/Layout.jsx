/* eslint no-undef:0 */
import React, { PureComponent } from 'react';
import cx from 'classnames';
import Layout from '@icedesign/layout';
import { enquireScreen } from 'enquire-js';
import Header from './__components_Header__';
import Footer from './__components_Footer__';
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
    };
  }

  componentDidMount() {
    this.enquireScreenRegister();
  }

  /**
   * 注册监听屏幕的变化，可根据不同分辨率做对应的处理
   */
  enquireScreenRegister = () => {
    const mediaCondition = 'only screen and (max-width: 720px)';

    enquireScreen((mobile) => {
      this.setState({
        isMobile: mobile,
      });
    }, mediaCondition);
  };

  render() {
    return (
      <Layout
        style={{ minHeight: '100vh' }}
        className={cx(`ice-design-header-footer-layout-${theme}`, {
          'ice-design-layout': true,
        })}
      >
        <Header theme={theme} isMobile={this.state.isMobile} />
        <Layout.Main className="ice-design-layout-body">
          {this.props.children}
        </Layout.Main>
        <Footer />
      </Layout>
    );
  }
}
