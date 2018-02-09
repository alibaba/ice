/* eslint no-undef:0 */
import React, { PureComponent } from 'react';
import cx from 'classnames';
import Layout from '@icedesign/layout';
import Header from './__components_Header__';
import Footer from './__components_Footer__';
import './scss/light.scss';
import './scss/dark.scss';

const theme = typeof CONFIG_THEME === 'undefined' ? 'dark' : CONFIG_THEME;

export default class BasicLayout extends PureComponent {
  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <Layout
        style={{ minHeight: '100vh' }}
        className={cx(`ice-design-${theme}`, {
          'ice-design-layout': true,
          'ice-design-header-footer-layout': true,
        })}
      >
        <Header theme={theme} />

        <Layout.Main>{this.props.children}</Layout.Main>

        <Footer />
      </Layout>
    );
  }
}
