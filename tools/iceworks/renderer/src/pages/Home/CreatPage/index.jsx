import { computed, autorun, toJS } from 'mobx';
import { Dialog, Button, Feedback } from '@icedesign/base';
import { inject, observer } from 'mobx-react';
import { URL } from 'url';
import React, { Component } from 'react';
import { remote } from 'electron';

import { dependenciesFormat } from '../../../lib/project-utils';
import services from '../../../services';

// components
import {
  Panel as BlockPickerPanel,
  Previewer as BlockPickerPreviewer,
  LayoutPicker as BlockPickerLayouts,
} from '../../../components/BlockPicker/';
import Icon from '../../../components/Icon';
import dialog from '../../../components/dialog';

import PageConfig from './PageConfig';

const { log, npm, shared, interaction, scaffolder } = services;

import './index.scss';

@inject('projects', 'newpage', 'blocks', 'customBlocks', 'progress')
@observer
class CreatePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedBlocks: []
    };
    this.props.customBlocks.initCustomBlocks();

    // 监听 statusCompile 的构建状态
    // 根据编译状态判断是否将加载页面切换成预览页面
    const statusCompileWatcher = computed(() => {
      const { projects } = this.props;
      return projects.currentProject && projects.currentProject.statusCompile;
    });
    this.statusCompileTimer = null;
    // 监听编译状态切换页面，将 loading 页面换成正式预览页面
    this.statusCompileDisposer = autorun(() => {
      const { projects } = this.props;
      const { currentProject } = projects;
      const statusCompile = statusCompileWatcher.get();
      // 根据项目状态，决定当前预览页面的状态
      if (this.statusCompileTimer) {
        clearTimeout(this.statusCompileTimer);
      }

      if (
        currentProject &&
        statusCompile !== 'compiling' &&
        statusCompile !== 'normal' &&
        statusCompile !== 'progress'
      ) {
        const serverUrl = currentProject.serverUrl;
        const applicationType = currentProject.getApplicationType();
        this.statusCompileTimer = setTimeout(() => {
          if (serverUrl) {
            let previewUrl = new URL(serverUrl);
            let mobile = false;
            if (applicationType == 'rax') {
              previewUrl.hash = '!/IceworksPreviewPage';
              mobile = true;
            } else {
              previewUrl.hash = '/IceworksPreviewPage';
            }
            this.openPreviewWindow({
              url: encodeURIComponent(previewUrl.href),
              mobile,
              reload: true,
            });
          }
        }, 300);
      }
    });
  }

  componentWillUnmount() {
    this.statusCompileDisposer();
  }

  handleCancelCreate = () => {
    this.props.newpage.toggle();
    this.props.blocks.reset();

    const { projects } = this.props;
    const { currentProject } = projects;
    let removePromise;
    if (currentProject.scaffold && currentProject.scaffold.isAvailable()) {
      removePromise = currentProject.scaffold.removePreviewPage({ nodeFramework: currentProject.nodeFramework });
    } else {
      removePromise = scaffolder.removePreviewPage({
        clientSrcPath: currentProject.clientSrcPath
      });
    }
    removePromise
      .then(() => {
        log.debug('移除预览页面成功');
      })
      .catch((error) => {
        log.debug('移除预览页面失败', error);
      });
  };

  resetData = () => {
    if (this.previewWindow) {
      this.previewWindow.destroy();
      this.previewWindow = null;
    }
  };

  // 启动预览服务，打开新窗口，并加载对应预览地址。
  handleOpenPreviewPage = (blocks) => {
    if (Array.isArray(blocks)) {
      blocks = toJS(blocks);
    } else {
      blocks = toJS(this.props.blocks.selected);
      // 检测别名是否为空或者重名
      if (!this.aliasNameValidated(blocks)) return;
    }
    const layout = toJS(this.props.newpage.currentLayout);
    const { projects } = this.props;
    const { currentProject } = projects;
    const config = {
      name: 'IceworksPreviewPage',
      layout,
      blocks,
      preview: true,
      nodeFramework: currentProject.nodeFramework,
    };

    const libraryType = currentProject.getLibraryType();

    this.openPreviewWindow({ createWindow: true });

    let createResult;
    if (currentProject.scaffold.isAvailable()) {
      console.debug('使用 .iceworks 模板新建预览页面', config);
      currentProject.scaffold
        .createPage(config)
        .then((result) => {
          const dependencies = toJS(result.dependencies);
          log.info(
            'new page dependencies',
            this.props.newpage.targetPath,
            dependencies
          );
          log.debug('add dependencies', this.props.newpage.targetPath);
          createResult = result;
          return new Promise((resolve) => {
            if (Object.keys(dependencies).length == 0) {
              resolve(true);
            } else {
              const npmArgs = [
                'install',
                '--save',
                ...dependenciesFormat(dependencies),
                '--no-package-lock',
              ];
              npm
                .run(npmArgs, { cwd: this.props.newpage.targetPath })
                .then(() => {
                  log.info('genereator page install dependencies success');
                  resolve(true);
                })
                .catch(() => {
                  log.error('genereator page install dependencies error');
                  resolve(false);
                });
            }
          });
        })
        .then(() => {
          const menuConfig = {
            name: 'IceworksPreviewPage',
            path: 'IceworksPreviewPage',
            icon: 'home',
          };

          return currentProject.scaffold.appendMenu(menuConfig);
        })
        .then(() => {
          const pageClassName = 'IceworksPreviewPage';
          let routerConfig;

          // angular 的模板生成的路由
          if (libraryType == 'angular') {
            routerConfig = {
              path: '/IceworksPreviewPage',
              pagePath: createResult.output.page,
              component: `${pageClassName}Component`,
              module: `${pageClassName}Module`,
            };
          } else if (libraryType == 'rax') {
            routerConfig = {
              path: 'IceworksPreviewPage',
              pagePath: createResult.output.page,
            };
          } else {
            routerConfig = {
              path: '/IceworksPreviewPage',
              pagePath: createResult.output.page,
              component: 'IceworksPreviewPage',
              layoutName: layout.name,
              layoutPath: createResult.output.layout,
            };
          }
          return currentProject.scaffold.appendRouter(routerConfig);
        })
        .then(() => {
          log.info('预览页面生成成功');
          // @hack rax 生成成功后 1 秒打开预览页面
          if (libraryType == 'rax') {
            setTimeout(() => {
              const serverUrl = currentProject.serverUrl;
              if (serverUrl) {
                let previewUrl = new URL(serverUrl);
                let mobile = false;
                previewUrl.hash = '!/IceworksPreviewPage';
                mobile = true;
                this.openPreviewWindow({
                  url: encodeURIComponent(previewUrl.href),
                  mobile,
                  reload: true,
                });
              }
            }, 1500);
          }
        })
        .catch((error) => {
          console.error(error); // eslint-disable-line
          log.error('generate-preview-page', error);
          // 关闭窗口
          this.previewWindow.destroy();
          this.previewWindow = null;
          dialog.notice({ title: '预览页面生成失败', error: error });
        });
    } else {
      scaffolder
        .createPage({
          preview: true,
          destDir: toJS(this.props.newpage.targetPath),
          clientPath: currentProject.clientPath,
          clientSrcPath: currentProject.clientSrcPath,
          layout,
          blocks,
          libary: this.props.projects.currentProject.getLibraryType(),
          interpreter: ({ type, message, data }, next) => {
            switch (type) {
              case 'FILE_CREATED':
                data.forEach((file) => log.info(file));
                next(true);
                break;
              case 'ADD_DEPENDENCIES':
                const dependencies = data;
                log.debug('ADD_DEPENDENCIES', dependencies);
                npm
                  .run(
                    ['install', '--save', '--no-package-lock'].concat(
                      dependenciesFormat(dependencies)
                    ),
                    { cwd: projects.currentProject.clientPath }
                  )
                  .then(() => {
                    log.info('预览页面 依赖安装完成！');
                    next(true);
                  })
                  .catch(() => {
                    log.error('预览页面 依赖安装失败！');
                    next(false);
                  });
                break;
              default:
                next(true);
            }
          },
        })
        .then(() => {
          log.info('预览页面生成成功');
        })
        .catch((error) => {
          console.debug(error);
          log.error('generate-preview-page', error);
          interaction.notify({ title: '预览页面生成失败', type: 'error' });

          // 关闭窗口
          this.previewWindow.destroy();
          this.previewWindow = null;
        });
    }
  };

  previewWindow = null;

  openPreviewWindow = (options = {}) => {
    const { url = '', mobile = false, reload, createWindow } = options;
    if (url) {
      this.previewUrl = `${shared.windowURL(
        'preview'
      )}?iframeUrl=${encodeURIComponent(url)}&mobile=${mobile}`;
    } else if (createWindow) {
      this.previewUrl = shared.windowURL('preview');
    }

    if (reload) {
      if (this.previewWindow) {
        this.previewWindow.loadURL(this.previewUrl);
        this.previewWindow.show();
        this.previewWindow.focus();
      }
    } else {
      if (!this.previewWindow) {
        this.previewWindow = new remote.BrowserWindow({
          title: 'iceworks 预览服务',
          width: 1260,
          minWidth: 400,
          height: 800,
          minHeight: 800,
          resizable: true,
        });

        this.previewWindow.setMenu(null);
        this.previewWindow.loadURL(this.previewUrl); // 加载一个预览页面;
        this.previewWindow.on('close', () => {
          this.previewWindow.destroy();
          this.previewWindow = null;
        });
      } else {
        this.previewWindow.loadURL(this.previewUrl); // 加载一个预览页面;
      }
    }
  };

  /**
   * 区块别名检测，是否重名或者为空
   */
  aliasNameValidated = (blocks) => {
    let aliasNameCollector = [];
    let conflictName = '';

    const hasEmptyAliasName = blocks.some((block) => {
      return block.alias.trim() == '';
    });

    // 冲突检测
    const hasConflictAliasName = blocks.some((block) => {
      if (aliasNameCollector.indexOf(block.alias.toLowerCase()) === -1) {
        aliasNameCollector.push(block.alias.toLowerCase());
        return false;
      } else {
        conflictName = block.alias;
        return true;
      }
    });

    if (hasEmptyAliasName) {
      Feedback.toast.show({
        type: 'error',
        content: '已选 Blocks 名称不能为空，请修改后重试。',
        hasMask: true,
      });
      return false;
    } 
    if (hasConflictAliasName) {
      Feedback.toast.show({
        type: 'error',
        content: `已选 Blocks 存在多个名为: ${conflictName} 冲突，请修改后重试。`,
        hasMask: true,
      });
      return false;
    }
    return true;
  };

  // 生成页面，唤起 dialog 让用户输入页面名，与路由名
  generatePage = (blocks) => {
    let selectedBlocks;
    if (Array.isArray(blocks)) {
      selectedBlocks = blocks;
    } else {
      selectedBlocks = this.props.blocks.selected;
      // 检测别名是否为空或者重名
      if (!this.aliasNameValidated(selectedBlocks)) return;
    }
   
    this.props.newpage.openSave();
    this.setState({
      selectedBlocks
    });
  };

  /**
   * 添加区块，支持多个
   */
  handleBlocksAdd = (blockObj) => {
    if (!Array.isArray(blockObj)) {
      blockObj = [blockObj];
    } 
    blockObj.forEach( block => 
      this.props.blocks.addBlock(block)
    );
  };

  render() {
    const { projects, newpage, blocks } = this.props;
    const currentProject = projects.currentProject;
    const currentTabKey = blocks.currentTabKey;
    // 当前项目为空，则不渲染新建页面的组件
    if (!currentProject) return null;
    // 脚手架类型
    const applicationType = currentProject.getApplicationType();
    const showLayoutPicker = applicationType == 'ice';
    const showPreviewPage = ['ice', 'angular', 'rax'].includes(applicationType);
    return (
      <Dialog
        className="create-dialog"
        footer={false}
        minMargin={0}
        visible={this.props.newpage.visible}
        onCancel={this.handleCancelCreate}
        onClose={this.handleCancelCreate}
        onOk={this.handleCancelCreate}
        afterClose={this.resetData}
        closable="mask,close"
      >
        <div className="careate-page">
          <div className="create-page-body">
            <div className="material-wrapper">
              {showLayoutPicker && <BlockPickerLayouts />}
              <BlockPickerPanel
                handleBlocksAdd={this.handleBlocksAdd}
                handleOpenPreviewPage={this.handleOpenPreviewPage}
                generatePage={this.generatePage}
                style={{
                  paddingTop: showLayoutPicker ? 0 : 10,
                }}
              />
            </div>
            <BlockPickerPreviewer title="已选区块" />
          </div>
          <div className="create-page-footer">
            <Button onClick={this.handleCancelCreate}>
              <Icon size="small" type="close" /> 取消
            </Button>
            {/* 当前tab为区块组合时，预览页面功能内置 */}
            {showPreviewPage && (
              <Button
                disabled={!projects.currentProject.serverUrl}
                type="secondary"
                onClick={this.handleOpenPreviewPage}
              >
                <Icon size="small" type="eye" /> 预览页面
              </Button>
            )}
      
            <Button type="primary" onClick={this.generatePage}>
              <Icon size="small" type="paper-plane" /> 生成页面
            </Button>
          </div>
        </div>
        {
          this.props.newpage.savePageVisible && (
            <PageConfig
              selectedBlocks={this.state.selectedBlocks}
              libary={this.props.projects.currentProject.getLibraryType()}
            />
          )
        }
      </Dialog>
    );
  }
}

export default CreatePage;
