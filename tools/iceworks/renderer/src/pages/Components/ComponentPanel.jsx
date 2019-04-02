import { observer, inject } from 'mobx-react';
import React, { Component } from 'react';

import projectScripts from '../../lib/project-scripts';
import logger from '../../lib/logger';
import CateMenu from '../../components/CateMenu';
import EmptyTips from '../../components/EmptyTips';
import dialog from '../../components/dialog';

import DownloadDialog from './components/DownloadDialog';

import Item from './Item';

import services from '../../services';

const { interaction, } = services;

@inject('projects', 'component', 'materials', 'progress')
@observer
class ComponentPanel extends Component {
  constructor(props) {
    super(props);
  }

  /**
   * 点击模板分类菜单的回调
   */
  handleClick = (value) => {
    const { material } = this.props;
    const components = material.components;
    if (components) {
      components.activeCategory = value;
    }
  };

  download = (data) => {
    const { component, material } = this.props;
    component.open();

  }

  handleDownloadComponent = () => {
    const { component, projects, materials, progress } = this.props;
    const { currentComponent } = component;
    const { npm, version } = currentComponent.source;
    const { currentProject } = projects;

    component.downloading = true;
    progress.start();
    progress.setStatusText('正在下载组件');
    progress.setShowTerminal(true);

    projectScripts.npminstall(
      currentProject,
      `${npm}@${version}`,
      false,
      (error, dependencies) => {
        component.downloading = false;
        progress.end();
        if (error) {
          log.error(`组件${npm}@${version}下载失败`);
          dialog.alert({
            title: '组件下载失败',
            content: (
              <div>
                请确认网络连接正常，或在设置中切换 npm 源重试
                <br />
                可展开【运行日志】查看详细反馈信息。
              </div>
            ),
          });
        } else {
          component.close();
          materials.updateComponents();
          interaction.notify({
            title: '组件下载成功，组件需要自行引入到页面中',
            body: component.importStatement ? `引用方法：${component.importStatement}` : `${npm}`,
            type: 'success',
          });
        }
      }
    );
  }

  render() {
    const { material } = this.props;
    const components = material.components || null;

    if (material.componentsError) {
      return <EmptyTips size={120}>{material.componentsError}</EmptyTips>;
    }

    if (!components) {
      return <EmptyTips size={120}>加载中...</EmptyTips>;
    }

    if (Array.isArray(components.values) && components.values.length === 0) {
      return (
        <div style={{ padding: 10 }}>
          <EmptyTips size={120}>当前物料源暂无组件</EmptyTips>
        </div>
      );
    }

    return (
      <div className="component-panel-body">
        {components.categories && components.categories.length > 0 && (
          <CateMenu data={components.categories} onClick={this.handleClick} />
        )}
        <div className="component-items-wrapper">
          {components.values.map((component, index) => {
            return (
              <Item
                key={index}
                data={component}
                material={material}
                download={this.download}
              />
            );
          })}
        </div>
        <DownloadDialog
          handleDownloadComponent={this.handleDownloadComponent}
        />
      </div>
    );
  }
}

export default ComponentPanel;
