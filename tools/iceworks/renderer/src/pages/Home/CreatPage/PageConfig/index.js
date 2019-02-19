import { Dialog, Button, Form, Input, Field, Feedback } from '@icedesign/base';
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';
import React, { Component } from 'react';

// import ReactDOM from 'react-dom';
import uppercamelcase from 'uppercamelcase';
import PropTypes from 'prop-types';

import { dependenciesFormat } from '../../../../lib/project-utils';
import projectScripts from '../../../../lib/project-scripts';
import dialog from '../../../../components/dialog';
import Progress from '../../../../components/Progress';
import services from '../../../../services';

let container;
const { log, npm, interaction, scaffolder } = services;
const FormItem = Form.Item;
import './index.scss';

const generatePageName = (pages = []) => {
  return `page${pages.length > 0 ? pages.length + 1 : ''}`;
};

const generateNavName = (pages = []) => {
  return `Nav${pages.length > 0 ? pages.length + 1 : ''}`;
};

const pageExists = (pages, name = '') => {
  return pages.some((n) => {
    return n.toLowerCase() == name.trim().toLowerCase();
  });
};

@inject('projects', 'newpage', 'blocks', 'customBlocks', 'progress')
@observer
class PageConfig extends Component {
  static propTypes = {
    newpage: PropTypes.object,
    progress: PropTypes.object,
    blocks: PropTypes.object,
    projects: PropTypes.object,
    selectedBlocks: PropTypes.array,
    libary: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.field = new Field(this);
  }

  handleClose = () => {
    if (!this.props.newpage.isCreating) {
      this.props.newpage.closeSave();
      this.props.progress.reset();
    }
  };

  handleOk = () => {
    const { progress } = this.props;
    this.field.validate((errors, values) => {
      if (errors) {
        // 表单验证失败
      } else {
        // 检测页面名与区块名是否冲突
        if (this.props.blocks.pageNameConflict(values.pageName)) {
          Feedback.toast.error(
            `页面目录名与区块名 ${values.pageName} 存在冲突，请修改后重试`
          );
          return false;
        }
        this.props.newpage.isCreating = true;

        const { currentProject } = this.props.projects;
        const layout = toJS(this.props.newpage.currentLayout);
        const blocks = toJS(this.props.selectedBlocks);
        const libraryType = currentProject.getLibraryType();
        const pageName = toJS(values.pageName);

        // 创建页面
        const config = {
          name: libraryType == 'react' ? uppercamelcase(pageName) : pageName,
          layout: layout,
          blocks: blocks,
          nodeFramework: currentProject.nodeFramework
        };
        console.info('createPage config:', config);
        let createResult;
        if (currentProject.scaffold && currentProject.scaffold.isAvailable()) {
          console.info('使用 .iceworks 模板新建');
          currentProject.scaffold
            .createPage(config)
            .then((result) => {
              createResult = result;
              console.info('create result:', createResult);
              const dependencies = toJS(result.dependencies);
              log.info(
                'new page dependencies',
                this.props.newpage.targetPath,
                dependencies
              );
              log.debug('add dependencies', this.props.newpage.targetPath);
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
                name: toJS(values.routeText),
                path: toJS(values.routePath),
              };
              return currentProject.scaffold.appendMenu(menuConfig);
            })
            .then(() => {
              const pageClassName = uppercamelcase(toJS(values.pageName));
              let routerConfig;

              // angular 的模板生成的路由
              if (libraryType == 'angular') {
                routerConfig = {
                  path: toJS(values.routePath),
                  pagePath: createResult.output.page,
                  component: `${pageClassName}Component`,
                  module: `${pageClassName}Module`,
                };
              } else {
                routerConfig = {
                  path: toJS(values.routePath),
                  component: pageClassName,
                  pagePath: createResult.output.page,
                  layoutName: layout && uppercamelcase(layout.name),
                  layoutPath: layout && createResult.output.layout,
                };
              }
              return currentProject.scaffold.appendRouter(routerConfig);
            })
            .then(() => {
              const content = [];
              if (values.pageName) {
                content.push(`页面目录：${values.pageName}`);
              }
              if (values.routePath) {
                content.push(`路由路径：${values.routePath}`);
              }
              if (values.routeText) {
                content.push(`页面导航名：${values.routeText}`);
              }
              interaction.notify({
                title: '生成页面成功',
                body: content.join(' '),
              });
              this.props.newpage.emit('generate-page-success');

              log.info('generate-page-success', 'page 创建成功');

              progress.end();
              this.props.newpage.isCreating = false;
              this.props.newpage.closeSave();
              this.props.newpage.toggle();
            })
            .catch((error) => {
              log.error('generate-page', error);
              console.error(error);
              dialog.notice({
                title: '生成页面失败',
                error: error,
              });
              progress.reset();
              this.props.newpage.isCreating = false;
            })
            .then(() => {
              return currentProject.scaffold.removePreviewPage({
                nodeFramework: currentProject.nodeFramework
              });
            })
            .then(() => {
              log.debug('移除临时页面成功');
            })
            .catch((error) => {
              log.debug('移除临时页面失败', error);
            });
        } else {
          let applicationType = '';
          if (currentProject) {
            applicationType = currentProject.getApplicationType();
          }

           // 进度条
          progress.start(true);
          progress.setStatusText('正在生成页面');
          progress.setSectionCount(blocks.length);
          
          scaffolder
            .createPage({
              pageName: toJS(values.pageName), // 页面名
              routePath: toJS(values.routePath), // 路由名
              routeText: toJS(values.routeText), // 路由导航名
              clientPath: currentProject.clientPath,
              clientSrcPath: currentProject.clientSrcPath,
              layout: layout,
              blocks: blocks,
              excludeLayout: applicationType == 'react', // hack react 的模板不生成 layout
              // hack vue
              libary: this.props.libary,
              progressFunc: progress.handleProgressFunc,
              interpreter: ({ type, message, data }, next) => {
                console.log(type, message);
                switch (type) {
                  case 'UNSUPPORTED_DESTPATH':
                    Feedback.toast.error(message);
                    break;
                  case 'DESTDIR_EXISTS_OVERRIDE':
                    log.warn('DESTDIR_EXISTS_OVERRIDE', values.pageName);
                    interaction.confirm(
                      {
                        type: 'info',
                        title: '文件冲突',
                        message: `已存在 ${values.pageName} 页面，是否覆盖？`,
                      },
                      () => {
                        next(true);
                      },
                      () => {
                        next(false);
                      }
                    );
                    break;
                  case 'FILE_CREATED':
                    data.forEach((file) => log.info(file));
                    next(true);
                    break;
                  case 'ADD_DEPENDENCIES':
                    const dependencies = data;
                    log.info(
                      'new page dependencies',
                      this.props.newpage.targetPath,
                      dependencies
                    );
                    log.debug(
                      'add dependencies',
                      this.props.newpage.targetPath
                    );
                    projectScripts.npminstall(
                      currentProject,
                      dependenciesFormat(dependencies).join(' '),
                      false,
                      (error, dependencies) => {
                        if (error) {
                          log.error('genereator page install dependencies error');
                          log.info('reinstall page dependencies');
                          next(false);
                        } else {
                          log.info(
                            'genereator page install dependencies success'
                          );
                          next(true);
                        }
                      }
                    )
                    break;
                  default:
                    next(true);
                }
              },
            })
            .catch((error) => {
              log.error('generate-page', error);
              dialog.notice({
                title: '生成页面失败',
                error: error,
              });
              progress.reset();
              this.props.newpage.isCreating = false;
            })
            .then((goon) => {
              if (goon == false) {
                progress.end();
                this.props.newpage.isCreating = false;
              } else {
                const content = [];
                if (values.pageName) {
                  content.push(`页面目录：${values.pageName}`);
                }
                if (values.routePath) {
                  content.push(`路由路径：${values.routePath}`);
                }
                if (values.routeText) {
                  content.push(`页面导航名：${values.routeText}`);
                }
                interaction.notify({
                  title: '生成页面成功',
                  body: content.join(' '),
                });
                this.props.newpage.emit('generate-page-success');

                log.info('generate-page-success', 'page 创建成功');

                progress.end();
                this.props.newpage.isCreating = false;
                this.props.newpage.closeSave();
                this.props.newpage.toggle();

                // 移除 previewPage 临时文件
                return scaffolder.removePreviewPage({
                  clientSrcPath: currentProject.clientSrcPath
                });
              }
            })
            .then(() => {
              log.debug('移除临时页面成功');
            })
            .catch((error) => {
              log.debug('移除临时页面失败', error);
            });
        }
      }
    });
  };

  // 卸载组件
  // handleAfterClose = () => {
  //   ReactDOM.unmountComponentAtNode(container);
  //   container.parentNode.removeChild(container);
  // };

  render() {
    const { init } = this.field;
    const { projects, newpage } = this.props;
    const { currentProject } = projects;
    let applicationType = '';
    if (currentProject) {
      applicationType = currentProject.getApplicationType();
    }
    const isIceApp = applicationType == 'ice'; // create-react-app 的项目
    const isAngularApp = applicationType == 'angular'; // @angular/cli 的项目
    const isRaxApp = applicationType == 'rax'; // rax 类型的项目

    const formItemLayout = {
      labelCol: {
        fixedSpan: 5,
      },
    };

    // 允许设置导航名
    const availableRouter = isIceApp || isAngularApp || isRaxApp;

    return (
      <Dialog
        title="填写页面信息"
        visible={this.props.newpage.savePageVisible}
        onClose={this.handleClose}
        onCancel={this.handleClose}
        // afterClose={this.handleAfterClose}
        footer={
          <div>
            <Button
              disabled={this.props.newpage.isCreating}
              size="small"
              onClick={this.handleClose}
            >
              取消
            </Button>
            <Button
              loading={this.props.newpage.isCreating}
              size="small"
              type="primary"
              onClick={this.handleOk}
            >
              确定
            </Button>
          </div>
        }
      >
        <Form
          size="small"
          direction="ver"
          style={{ width: 320, paddingTop: '30px' }}
          field={this.field}
        >
          <FormItem {...formItemLayout} required label="页面目录名">
            <Input
              style={{ width: 200 }}
              {...init('pageName', {
                initValue: generatePageName(this.props.newpage.pages),
                rules: [
                  {
                    required: true,
                    message: '不能为空',
                    trigger: ['onChange'],
                  },
                  {
                    pattern: /^[a-z]([-_a-z0-9]*)$/i,
                    message: '请输入字母与数字组合，字母开头',
                    trigger: ['onChange'],
                  },
                  {
                    pattern: /^(?!index$)/i,
                    message: '`index` 为关键字，请更换',
                    trigger: ['onChange'],
                  },
                  {
                    message: '已存在同名页面，请更换',
                    validator: (rule, value, cb) => {
                      if (pageExists(newpage.pages, value)) {
                        cb('error');
                      } else {
                        cb();
                      }
                    },
                  },
                ],
              })}
              placeholder="请输入页面目录名，字母与数字组合，字母开头"
            />
          </FormItem>
          {availableRouter && (
            <FormItem {...formItemLayout} required label="路由路径">
              <Input
                style={{ width: 200 }}
                {...init('routePath', {
                  initValue: generatePageName(this.props.newpage.pages),
                  rules: [
                    {
                      required: true,
                      message: '不能为空',
                      trigger: ['onBlur', 'onChange'],
                    },
                    {
                      pattern: /^(\/?)([a-zA-Z0-9:])([a-zA-Z0-9:]*)((\/)?[a-zA-Z0-9:]+)$/,
                      message:
                        '请输入小写字母数字组合，支持二级路由以 `/` 分隔',
                      trigger: ['onBlur', 'onChange'],
                    },
                  ],
                })}
                placeholder="请输入小写字母数字组合，支持二级路由以 `/` 分隔"
              />
            </FormItem>
          )}
          {availableRouter && (
            <FormItem {...formItemLayout} label="页面导航名">
              <Input
                style={{ width: 200 }}
                {...init('routeText', {
                  initValue: generateNavName(this.props.newpage.pages),
                  rules: [{ trigger: ['onBlur', 'onChange'] }],
                })}
                placeholder="为空则不生成导航项"
              />
            </FormItem>
          )}
        </Form>
        <Progress
          currentProject={currentProject}
        />
      </Dialog>
    );
  }
}

export default PageConfig;

