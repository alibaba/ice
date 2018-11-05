import React, { Component } from 'react';
import { Icon, Tab } from '@icedesign/base';
import cx from 'classnames';

import PreviewLayout from '../PreviewLayout';
import * as BuilderForm from '../Form';
import './LayoutBuilder.scss';

const TabPane = Tab.TabPane;

export default class LayoutBuilder extends Component {
  static displayName = 'LayoutBuilder';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      layoutConfig: this.defaultLayoutConfig(),
    };
  }

  defaultLayoutConfig = () => {
    return {
      name: 'CustomLayout',
      directory: 'layouts',
      layout: 'fluid-layout', // boxed、fluid
      enableName: true,
      enableTheme: true,
      themeConfig: {
        theme: 'dark',
        primaryColor: 'red',
        secondaryColor: '#3080fe',
      },
      header: {
        enabled: true,
        position: 'fixed', // fixed、 static
        width: 'full-width', // full、elastic
      },
      aside: {
        enabled: true,
        position: 'static', // embed-fixed、overlay-fixed、 static
        mode: 'vertical', // vertical、horizontal
        width: 200,
        collapsed: false,
      },
      footer: {
        enabled: true,
        position: 'fixed', // fixed, static
        width: 'full-width', // full、elastic
      },
    };
  };

  /**
   * 切换 Builder 面板
   */
  toggleBuilder = () => {
    const { toggle } = this.state;
    this.setState({
      toggle: !toggle,
    });
  };

  /**
   * 表单回调
   */
  onChange = (value) => {
    console.log('表单回调:', value);
    this.setState({
      layoutConfig: value,
    });
  };

  render() {
    const { layoutConfig } = this.state;
    const formProps = {
      value: layoutConfig,
      onChange: this.onChange,
    };
    return (
      <div>
        <div
          className={cx('layout-builder-container', {
            open: this.state.toggle,
          })}
        >
          <div className="layout-builder-toggle" onClick={this.toggleBuilder}>
            <Icon type="set" className="fa-spin" />
          </div>
          <Tab onChange={this.handleChange}>
            <TabPane key="1" tab="基础配置">
              <BuilderForm.BasicForm {...formProps} />
            </TabPane>
            <TabPane key="2" tab="顶部导航配置">
              <BuilderForm.HeaderForm {...formProps} />
            </TabPane>
            <TabPane key="3" tab="侧边导航配置">
              <BuilderForm.AsideForm {...formProps} />
            </TabPane>
            <TabPane key="4" tab="页脚配置">
              <BuilderForm.FooterForm {...formProps} />
            </TabPane>
          </Tab>
        </div>
        <div
          style={{
            width: '576px',
            height: '432px',
            overflow: 'height',
            display: 'inline-block',
          }}
        >
          <PreviewLayout
            value={layoutConfig}
            scale={0.6}
            width={960}
            height={720}
          />
        </div>
      </div>
    );
  }
}
