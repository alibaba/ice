/* eslint no-undef:0, no-unused-expressions:0, array-callback-return:0, react/default-props-match-prop-types: 0, no-restricted-syntax: 0, no-prototype-builtins: 0 */
import React, { Component } from 'react';
import Layout from '@icedesign/layout';
import Header from '../Header';
import Aside from '../Aside';
import Footer from '../Footer';
import './scss/index.scss';

export default class PreviewLayout extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      layoutConfig: props.value,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      layoutConfig: nextProps.value,
    });
  }

  formatLayoutConfig = () => {
    const value = deepClone(this.state.layoutConfig);
    Object.keys(value).forEach((key) => {
      if (['header', 'aside', 'footer'].indexOf(key) !== -1) {
        if (!value[key].enabled) {
          value[key] = null;
        }
      }
    });

    return value;
  };

  renderContent = () => {
    const layoutConfig = this.formatLayoutConfig();
    const header = <Header themeConfig={layoutConfig.themeConfig} />;
    const aside = (
      <Layout.Aside theme={layoutConfig.themeConfig.theme} width="auto">
        <Aside layoutConfig={layoutConfig} />
      </Layout.Aside>
    );
    const footer = <Footer />;

    const layoutFixable =
      (layoutConfig.header && layoutConfig.header.position === 'fixed') ||
      (layoutConfig.footer && layoutConfig.footer.position === 'fixed') ||
      (layoutConfig.aside && layoutConfig.aside.position === 'embed-fixed');

    if (layoutConfig.header && layoutConfig.aside && layoutConfig.footer) {
      if (
        layoutConfig.header.width === 'full-width' &&
        layoutConfig.footer.width === 'full-width'
      ) {
        return (
          <Layout fixable={layoutFixable}>
            {header}
            <Layout.Section
              scrollable={layoutConfig.aside.position !== 'embed-fixed'}
            >
              {aside}
              <Layout.Main
                scrollable={layoutConfig.aside.position === 'embed-fixed'}
              >
                {this.props.children}
              </Layout.Main>
            </Layout.Section>
            {footer}
          </Layout>
        );
      } else if (
        layoutConfig.header.width === 'elastic-width' &&
        layoutConfig.footer.width === 'elastic-width'
      ) {
        return (
          <Layout fixable={layoutFixable}>
            {aside}
            {layoutConfig.header.position === 'static' &&
              layoutConfig.footer.position === 'static' && (
                <Layout.Section scrollable>
                  <Layout.Main>
                    {header}
                    {this.props.children}
                    {footer}
                  </Layout.Main>
                </Layout.Section>
              )}
            {layoutConfig.header.position === 'fixed' &&
              layoutConfig.footer.position === 'static' && (
                <Layout.Section>
                  {header}
                  <Layout.Main scrollable>
                    {this.props.children}
                    {footer}
                  </Layout.Main>
                </Layout.Section>
              )}
            {layoutConfig.header.position === 'fixed' &&
              layoutConfig.footer.position === 'fixed' && (
                <Layout.Section>
                  {header}
                  <Layout.Main scrollable>{this.props.children}</Layout.Main>
                  {footer}
                </Layout.Section>
              )}
            {layoutConfig.header.position === 'static' &&
              layoutConfig.footer.position === 'fixed' && (
                <Layout.Section>
                  <Layout.Main scrollable>
                    {header}
                    {this.props.children}
                  </Layout.Main>
                  {footer}
                </Layout.Section>
              )}
          </Layout>
        );
      } else if (
        layoutConfig.header.width === 'full-width' &&
        layoutConfig.footer.width === 'elastic-width'
      ) {
        return (
          <Layout fixable={layoutFixable}>
            {header}
            <Layout.Section
              scrollable={layoutConfig.aside.position !== 'embed-fixed'}
            >
              {aside}
              <Layout.Main
                scrollable={layoutConfig.aside.position === 'embed-fixed'}
              >
                {this.props.children}
                {footer}
              </Layout.Main>
            </Layout.Section>
          </Layout>
        );
      } else if (
        layoutConfig.header.width === 'elastic-width' &&
        layoutConfig.footer.width === 'full-width'
      ) {
        return (
          <Layout fixable={layoutFixable}>
            <Layout.Section
              scrollable={layoutConfig.aside.position !== 'embed-fixed'}
            >
              {aside}
              <Layout.Main
                scrollable={layoutConfig.aside.position !== 'embed-fixed'}
              >
                {header}
                {this.props.children}
              </Layout.Main>
            </Layout.Section>
            {footer}
          </Layout>
        );
      }
    } else if (layoutConfig.aside && layoutConfig.footer) {
      if (layoutConfig.footer.width === 'full-width') {
        return (
          <Layout fixable={layoutFixable}>
            <Layout.Section
              scrollable={layoutConfig.aside.position !== 'embed-fixed'}
            >
              {aside}
              <Layout.Main
                scrollable={layoutConfig.aside.position === 'embed-fixed'}
              >
                {this.props.children}
              </Layout.Main>
            </Layout.Section>
            {footer}
          </Layout>
        );
      } else if (layoutConfig.footer.width === 'elastic-width') {
        <Layout fixable={layoutFixable}>
          {aside}
          <Layout.Section
            scrollable={layoutConfig.aside.position !== 'embed-fixed'}
          >
            <Layout.Main
              scrollable={layoutConfig.aside.position === 'embed-fixed'}
            >
              {this.props.children}
            </Layout.Main>
            {footer}
          </Layout.Section>
        </Layout>;
      }
    } else if (layoutConfig.header && layoutConfig.aside) {
      if (layoutConfig.header.width === 'full-width') {
        return (
          <Layout fixable={layoutFixable}>
            {header}
            <Layout.Section
              scrollable={layoutConfig.aside.position !== 'embed-fixed'}
            >
              {aside}
              <Layout.Main
                scrollable={layoutConfig.aside.position === 'embed-fixed'}
              >
                {this.props.children}
              </Layout.Main>
            </Layout.Section>
          </Layout>
        );
      } else if (layoutConfig.header.width === 'elastic-width') {
        return (
          <Layout fixable={layoutFixable}>
            {aside}
            <Layout.Section
              scrollable={layoutConfig.header.position !== 'fixed'}
            >
              {header}
              <Layout.Main
                scrollable={layoutConfig.header.position === 'fixed'}
              >
                {this.props.children}
              </Layout.Main>
            </Layout.Section>
          </Layout>
        );
      }
    } else if (layoutConfig.header && layoutConfig.footer) {
      if (
        (layoutConfig.header.position === 'fixed' &&
          layoutConfig.footer.position === 'fixed') ||
        (layoutConfig.header.position === 'static' &&
          layoutConfig.footer.position === 'static')
      ) {
        return (
          <Layout fixable={layoutFixable}>
            <Layout.Section
              scrollable={
                layoutConfig.header.position === 'static' &&
                layoutConfig.footer.position === 'static'
              }
            >
              {header}
              <Layout.Main
                scrollable={
                  layoutConfig.header.position === 'fixed' &&
                  layoutConfig.footer.position === 'fixed'
                }
              >
                {this.props.children}
              </Layout.Main>
              {footer}
            </Layout.Section>
          </Layout>
        );
      } else if (
        layoutConfig.header.position === 'fixed' &&
        layoutConfig.footer.position === 'static'
      ) {
        return (
          <Layout fixable={layoutFixable}>
            {header}
            <Layout.Section scrollable>
              <Layout.Main>{this.props.children}</Layout.Main>
              {footer}
            </Layout.Section>
          </Layout>
        );
      } else if (
        layoutConfig.header.position === 'static' &&
        layoutConfig.footer.position === 'fixed'
      ) {
        return (
          <Layout fixable={layoutFixable}>
            <Layout.Section scrollable>
              {header}
              <Layout.Main>{this.props.children}</Layout.Main>
            </Layout.Section>
            {footer}
          </Layout>
        );
      }
    } else if (layoutConfig.header) {
      return (
        <Layout fixable={layoutFixable}>
          <Layout.Section>
            {header}
            <Layout.Main scrollable>{this.props.children}</Layout.Main>
          </Layout.Section>
        </Layout>
      );
    } else if (layoutConfig.aside) {
      return (
        <Layout fixable={layoutFixable}>
          {aside}
          <Layout.Section>
            <Layout.Main scrollable>{this.props.children}</Layout.Main>
          </Layout.Section>
        </Layout>
      );
    } else if (layoutConfig.footer) {
      return (
        <Layout fixable={layoutFixable}>
          <Layout.Section>
            <Layout.Main scrollable>{this.props.children}</Layout.Main>
          </Layout.Section>
          {footer}
        </Layout>
      );
    }
  };

  render() {
    const { layoutConfig = {} } = this.state;
    const {
      themeConfig: { theme },
    } = layoutConfig;
    const { scale = 1 } = this.props;
    const layoutClassName = `ice-layout-builder ice-design-layout-${theme} ice-design-layout ice-design-${
      layoutConfig.layout
    }`;

    return (
      <div
        className={layoutClassName}
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'left top',
          width: this.props.width,
          height: this.props.height,
        }}
      >
        {this.renderContent()}
      </div>
    );
  }
}

function deepClone(source) {
  if (!source || typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone');
  }
  const targetObj = source.constructor === Array ? [] : {};
  for (const keys in source) {
    if (source.hasOwnProperty(keys)) {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = source[keys].constructor === Array ? [] : {};
        targetObj[keys] = deepClone(source[keys]);
      } else {
        targetObj[keys] = source[keys];
      }
    }
  }
  return targetObj;
}
