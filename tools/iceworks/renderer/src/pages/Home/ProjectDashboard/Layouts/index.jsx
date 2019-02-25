import { Dialog, Feedback } from '@icedesign/base';
import { inject, observer } from 'mobx-react';
import { ipcRenderer } from 'electron';
import React, { Component } from 'react';
import uppercamelcase from 'uppercamelcase';
import path from 'path';

import Chrome from '../../../../components/Chrome';
import DashboardCard from '../../../../components/DashboardCard';
import EmptyTips from '../../../../components/EmptyTips';
// import ExtraButton from '../../../../components/ExtraButton';
// import Icon from '../../../../components/Icon';
import LayoutBuilderAttribute from '../../../../components/CustomScaffold/Attribute';
import LayoutBuilderPreview from '../../../../components/Scaffold/Preview';
import scanLayout from '../../../../datacenter/scanLayout';
import services from '../../../../services';

const { templateBuilderUtils } = services;

import './Layouts.scss';

@inject('projects')
@observer
export default class LayoutBuilder extends Component {
  static extensionName = 'layout-builder';

  constructor(props) {
    super(props);

    this.state = {
      localLayouts: [],
      scaning: true,
      dialogVisible: false,
      layoutValidate: false,
      layoutConfig: this.getLayoutConfig(),
    };
  }

  UNSAFE_componentWillMount() {
    this.freshLayoutList();
  }

  componentDidMount() {
    ipcRenderer.on('focus', this.freshLayoutList);
    this.props.projects.on('change', this.freshLayoutList);
  }

  componentWillUnmount() {
    ipcRenderer.removeListener('focus', this.freshLayoutList);
    this.props.projects.removeListener('change', this.freshLayoutList);
  }

  handleLayoutConfigChange = (value) => {
    this.setState({ layoutConfig: value });
  };

  getLayoutConfig = () => {
    const { projects } = this.props;
    const { currentProject } = projects;
    let themeConfig = {
      theme: 'dark',
      primaryColor: '#3080FE',
      secondaryColor: '#FFC107',
    };
    if (currentProject) {
      const pkgData = currentProject.getPkgData();
      if (pkgData && pkgData.themeConfig) {
        themeConfig = pkgData.themeConfig;
      }
    }

    const DEFAULT_LAYOUT_CONFIG = {
      name: '',
      directory: '',
      enableName: true,
      enableTheme: false,
      themeConfig: themeConfig,
      layout: 'fluid-layout',
      header: {
        position: 'static',
        width: 'full-width',
        enabled: true,
      },
      aside: {
        position: 'embed-fixed',
        mode: 'vertical',
        width: 200,
        collapsed: false,
        enabled: true,
      },
      footer: {
        position: 'fixed',
        width: 'full-width',
        enabled: true,
      },
    };

    return DEFAULT_LAYOUT_CONFIG;
  };

  freshLayoutList = () => {
    const { projects } = this.props;
    const { currentProject } = projects;

    if (currentProject && currentProject.fullPath) {
      const targetPath = currentProject.clientSrcPath;
      scanLayout({
        targetPath
      }).then((layouts) => {
        this.setState({
          localLayouts: layouts,
          scaning: false,
          layoutValidate: scanLayout.layoutValidate(targetPath),
        });
      });
    }
  };

  renderLayoutList = () => {
    const { localLayouts, scaning, layoutValidate } = this.state;
    if (scaning) {
      return <div>扫描中...</div>;
    }
    if (!layoutValidate) {
      return <div>暂无布局</div>;
    }

    if (Array.isArray(localLayouts) && localLayouts.length > 0) {
      return localLayouts.map((layout, idx) => {
        return (
          <div className="layout-item" key={uppercamelcase(layout.name) + idx}>
            <div className="name">{uppercamelcase(layout.name)}</div>
            <div
              className="title"
              title={layout.customLayout ? '' : layout.title}
            >
              {layout.customLayout ? '自定义布局' : layout.title}
            </div>
          </div>
        );
      });
    } else {
      return <EmptyTips>暂无布局</EmptyTips>;
    }
  };

  showDialog = () => {
    const layoutConfig = this.getLayoutConfig();
    this.setState({ layoutConfig: layoutConfig, dialogVisible: true });
  };

  hideDialog = () => {
    this.setState({ dialogVisible: false });
  };

  createCustomLayout = () => {
    const { layoutConfig } = this.state;
    const { currentProject } = this.props.projects;

    if (!layoutConfig.name || layoutConfig.name.trim() == '') {
      Feedback.toast.error('请输入布局名称');
      return false;
    }

    const layoutName = layoutConfig.name.trim();

    if (!/^[a-z]/i.test(layoutName)) {
      Feedback.toast.error('布局名称须为字母开头');
      return false;
    }

    if (currentProject) {
      const currentPath = currentProject.clientPath;
      layoutConfig.directory = currentPath;
      templateBuilderUtils
        .generatorLayout(layoutConfig)
        .then((layouDeps) => {
          console.info('新增布局用到的依赖', layouDeps);
          return Promise.resolve({ currentPath, layoutConfig });
        })
        .then(() => {
          Feedback.toast.success(`${layoutConfig.name} 自定义布局生成成功`);
          this.hideDialog();
        })
        .catch((e) => {
          console.error(e);
          Feedback.toast.error(
            `${layoutConfig.name} 自定义布局生成失败, ${e.message}`
          );
          this.hideDialog();
        });
    } else {
      this.hideDialog();
      Feedback.toast.error('当前项目不存在');
      console.error('项目不存在');
    }
  };

  renderShowCase = () => {
    return (
      <Chrome>
        <LayoutBuilderPreview layoutConfig={this.state.layoutConfig} />
      </Chrome>
    );
  };

  renderDialog = () => {
    const { dialogVisible } = this.state;
    return (
      <Dialog
        style={{ minWidth: '400px' }}
        visible={dialogVisible}
        onOk={this.createCustomLayout}
        onCancel={this.hideDialog}
        onClose={this.hideDialog}
        isFullScreen
      >
        <div
          style={{
            fontSize: '18px',
            fontWeight: 500,
            marginBottom: '20px',
          }}
        >
          新建布局
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <LayoutBuilderAttribute
            onChange={this.handleLayoutConfigChange}
            layoutConfig={this.state.layoutConfig}
          />
          <div style={{ paddingLeft: 20 }}>{this.renderShowCase()}</div>
        </div>
      </Dialog>
    );
  };

  render() {
    const { currentProject } = this.props.projects;
    let applicationType;

    if (currentProject) {
      applicationType = currentProject.getApplicationType();
    }

    return (
      <DashboardCard>
        {this.renderDialog()}
        <DashboardCard.Header>
          <div>
            布局列表
            <span style={{ paddingLeft: 10, fontSize: 12, color: '#666' }}>
              ({this.state.localLayouts.length})
            </span>
          </div>
          {/* 隐藏新建自定义布局功能
          {applicationType !== 'react' && (
            <div>
              <ExtraButton
                style={{ color: '#3080FE' }}
                placement={'left'}
                tipText={'新建自定义布局'}
                onClick={this.showDialog}
              >
                <Icon type="plus-o" style={{ fontSize: 18 }} />
              </ExtraButton>
            </div>
          )}
          */}
        </DashboardCard.Header>
        <DashboardCard.Body>{this.renderLayoutList()}</DashboardCard.Body>
      </DashboardCard>
    );
  }
}
