import React, { PureComponent } from 'react';
import cx from 'classnames';
import Layout from '@icedesign/layout';
import Header from './__components_Header__';
import Footer from './__components_Footer__';
import config from './__config__';

if (config.theme === 'dark') {
  require('./scss/dark.scss');
} else {
  require('./scss/light.scss');
}

export default class BasicLayout extends PureComponent {
  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <Layout
        style={{ minHeight: '100vh' }}
        className={cx(`ice-design-${config.theme}`, {
          'ice-design-layout': true,
          'ice-design-header-footer-layout': true,
        })}
      >
        <Header theme={config.theme} />

        <Layout.Main>{this.props.children}</Layout.Main>

        <Footer />
      </Layout>
    );
  }
}
