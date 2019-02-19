import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

const ScaffoldHoc = (WrappedComponent) => {
  @inject('materials', 'scaffold', 'customScaffold')
  @observer
  class Scaffold extends Component {
    static displayName = 'Scaffold';

    static propTypes = {
      materials: PropTypes.object,
      scaffold: PropTypes.object,
      customScaffold: PropTypes.object,
    };

    handleRefresh = () => {
      this.props.materials.refresh();
    };

    handleTabChange = (key) => {
      this.props.materials.setScaffoldTabActiveKey(key);
    };

    /** 选中项目模板脚手架 */
    handleSelectedScaffold = (scaffold) => {
      this.props.scaffold.setScaffoldConfig({ scaffold });
      this.props.scaffold.open();
    };

    handleClose = () => {
      if (!this.props.scaffold.isCreating) {
        this.props.scaffold.close();
      } else {
        this.props.scaffold.abort();
      }
    };

    handleOpenCustomScaffoldDialog = () => {
      this.props.customScaffold.reset();
      this.props.customScaffold.toggle();
    };

    /**
     * 通过自定义模板创建项目
     */
    handleGenerateProjectByCustom = (config) => {
      this.props.scaffold.setScaffoldConfig(config);
      this.props.scaffold.toggle();
    };

    /** 开始创建项目 */
    handleGeneratorProject = () => {
      // 需要将 Ovservable 对象转换为普通 javascript 结构
      const layoutConfig = this.props.scaffold.layoutConfig;
      const scaffold = this.props.scaffold.scaffold;
      const projectName = this.props.scaffold.projectFinalName;
      const nodeFramework = this.props.scaffold.nodeFramework;
      const options = {
        scaffold,
        projectName,
        layoutConfig,
        isCustomScaffold: !!layoutConfig, // 存在 layoutConfig 表示自定义模板
        nodeFramework
      };

      const currentPath = this.props.scaffold.getProjectPathWithWorkspace();
      this.props.scaffold
        .createProjectFolder()
        .then((gotoCreate) => {
          if (gotoCreate) {
            const SectionCount = nodeFramework ? 2 : 1;
            this.props.scaffold.startProgress(SectionCount);
            return this.props.scaffold.create(currentPath, options);
          } else {
            return Promise.resolve(gotoCreate);
          }
        })
        .then((cpmpleteConfig) => {
          // eslint-disable-next-line no-console
          console.log(cpmpleteConfig); //  完成后的结果展示
          this.props.scaffold.endProgress();
          this.props.scaffold.addNewProjectToProjects(currentPath, true); // true 用来标识提示用户安装依赖
          this.props.scaffold.pushRoute('/');
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error(error);
          this.props.scaffold.resetProgress();
        });
    };

    render() {
      return (
        <WrappedComponent
          handleRefresh={this.handleRefresh}
          handleTabChange={this.handleTabChange}
          handleSelectedScaffold={this.handleSelectedScaffold}
          handleClose={this.handleClose}
          handleOpenCustomScaffoldDialog={this.handleOpenCustomScaffoldDialog}
          handleGenerateProjectByCustom={this.handleGenerateProjectByCustom}
          handleGeneratorProject={this.handleGeneratorProject}
        />
      );
    }
  }

  return Scaffold;
};

export default ScaffoldHoc;
