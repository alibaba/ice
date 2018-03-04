/* eslint no-undef:0 */
import React, { PureComponent } from 'react';
import cx from 'classnames';
import Layout from '@icedesign/layout';
import { ContainerQuery } from 'react-container-query';
import { enquireScreen } from 'enquire-js';
import Header from './../../components/Header';
import Footer from './../../components/Footer';
import './scss/light.scss';
import './scss/dark.scss';

console.log('enquireScreen:', enquireScreen);

const theme = typeof THEME === 'undefined' ? 'dark' : THEME;

const query = {
  'screen-xs': {
    maxWidth: 720,
  },
  'screen-sm': {
    minWidth: 721,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
  },
};

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

  enquireScreenRegister = () => {
    const mediaCondition = `only screen and (max-width: ${
      query['screen-xs'].maxWidth
    }px)`;

    enquireScreen((mobile) => {
      this.setState({
        isMobile: mobile,
      });
    }, mediaCondition);
  };

  render() {
    console.log('isMobile:', this.state.isMobile);
    return (
      <ContainerQuery query={query}>
        {params => (
          <div className={cx(params)}>
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
          </div>
        )}
      </ContainerQuery>
    );
  }
}
