import React, { Component } from 'react';
import { Icon, Tab } from '@icedesign/base';
import cx from 'classnames';

import PreviewLayout from '../PreviewLayout';

// import BasicForm from '../Form/BasicForm';
// import AsideForm from '../Form/AsideForm';
// import HeaderForm from '../Form/HeaderForm';
// import FooterForm from '../Form/FooterForm';

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
      // 模板名称
      name: 'app',

      // 模板类型: layout、redux、mobx
      type: 'redux',

      // 下载到指定的目录
      directory: __dirname,

      // 是否启用自定义模板名称
      enableName: true,

      // 是否启用主题
      enableTheme: true,

      // 布局方式: fluid-layout、boxed-layout
      layout: 'fluid-layout',

      // 主题配置
      themeConfig: {
        theme: 'dark',
        primaryColor: 'red',
        secondaryColor: '#3080fe',
      },

      // 是否启用 Header
      header: {
        position: 'static',
        width: 'full-width',
        enabled: true,
      },

      // 是否启用 Aside
      aside: {
        position: 'embed-fixed',
        mode: 'vertical',
        width: 200,
        collapsed: false,
        enabled: true,
      },

      // 是否启用 Footer
      footer: {
        position: 'fixed',
        width: 'full-width',
        enabled: true,
      },

      // Redux 配置
      redux: {
        enabled: true,
        mockModule: true,
        authorityModule: true,
        registerLoginModule: true,
      },

      // Mobx 配置
      mobx: {},
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
            <TabPane key="1" tab="主题">
              <BuilderForm.BasicForm {...formProps} />
            </TabPane>
            <TabPane key="2" tab="布局">
              <BuilderForm.HeaderForm {...formProps} />
              <BuilderForm.AsideForm {...formProps} />
              <BuilderForm.FooterForm {...formProps} />
            </TabPane>
            <TabPane key="5" tab="高级">
              <BuilderForm.AdvancedForm {...formProps} />
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
