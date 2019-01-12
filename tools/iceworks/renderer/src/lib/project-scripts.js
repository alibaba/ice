import { Dialog } from '@icedesign/base';
import { remote } from 'electron';
import fs from 'fs';
import path from 'path';
import pathExists from 'path-exists';
import React from 'react';
import rimraf from 'rimraf';
import { dependenciesFormat } from './project-utils';
import dialog from '../components/dialog';
import services from '../services';
import terms from '../terms';

const detectPort = remote.require('detect-port');
import isAlibaba from './is-alibaba';
import { re } from 'junk';

const { log, folder, interaction, npm, sessions, paths } = services;
const { getClientPath, NODE_FRAMEWORKS } = paths;

// todo 后续抽出到独立套件保持独立更新
// todo vue cli 后续需要升级
const configs = {
  vue: {
    devDependencies: {
      '@vue/cli-plugin-babel': '^3.0.0-beta.6',
      '@vue/cli-plugin-eslint': '^3.0.0-beta.6',
      '@vue/cli-service': '^3.0.0-beta.6',
      '@vue/eslint-config-airbnb': '^3.0.0-beta.6',
    },
    scripts: {
      start: 'vue-cli-service serve',
      build: 'vue-cli-service build',
    },
  },
  react: {
    devDependencies: {
      'ice-scripts': '^1.0.0',
    },
    scripts: {
      start: 'ice dev',
      build: 'ice build',
    },
  },
};

/**
 * session 以“项目路径”为 key 做处理
 */

export default {
  /**
   * 启动项目服务，并改变项目的状态
   * @param {Object} project 项目 stores 实例
   */
  start(project) {
    const libraryType = project.getLibraryType();
    if (sessions.startProxy.has(project.fullPath)) {
      project.devStart();
      log.debug('服务已启动');
    } else {
      // @HACK angular 默认端口为 4200
      let DEFAULT_PORT = 4444;
      if (libraryType == 'angular') {
        DEFAULT_PORT = 4200;
      } else if (libraryType == 'rax') {
        DEFAULT_PORT = 4200;
      }

      detectPort(DEFAULT_PORT)
        .then((newPort) => {
          return new Promise((resolve, reject) => {
            if (newPort === DEFAULT_PORT) {
              resolve(newPort);
            } else {
              project.serverPort = newPort;
              Dialog.confirm({
                title: '端口冲突',
                content: (
                  <div style={{ lineHeight: '24px' }}>
                    <div>默认端口 `{DEFAULT_PORT}` 已被占用</div>
                    <div>
                      是否使用
                      <input
                        style={{
                          width: 60,
                          borderLeft: 'none',
                          borderRight: 'none',
                          borderTop: 'none',
                          margin: '0 6px',
                          borderBottom: '1px solid #ddd',
                        }}
                        max={65535}
                        type="number"
                        defaultValue={newPort}
                        onChange={(event) => {
                          const value = event.target.value;
                          project.serverPort = Number(value);
                        }}
                      />
                      启动服务？
                    </div>
                  </div>
                ),
                onOk: () => {
                  resolve(project.serverPort);
                },
                onCancel: () => {
                  reject();
                },
                onClose: () => {
                  reject();
                },
              });
            }
          });
        })
        .then((port) => {
          project.devStart();
          let shellArgs = ['start'];
          if (libraryType == 'angular') {
            shellArgs = ['run', 'start', '--', `--port=${port}`];
          }
          sessions.startProxy.start(
            {
              cwd: project.fullPath,
              shell: 'npm',
              shellArgs: shellArgs,
              env: project.nodeFramework
                ? {}
                : { PORT: port },
            },
            (code) => {
              project.devStop();
              if (code !== 0) {
                if (!project.terminalVisible) {
                  project.toggleTerminal();
                  terms.writeln(project.fullPath, '');
                  terms.writeln(project.fullPath, '解决办法：');
                  terms.writeln(
                    project.fullPath,
                    '    1. 当前项目依赖未安装或依赖缺失，请重装依赖后重试。'
                  );
                }
              }
            }
          );
        })
        .catch((error) => {
          console.error(error);
          console.log('取消');
        });
    }
  },
  /**
   * 停止项目，并改变项目的状态
   * @param {Object} project 项目 stores 实例
   */
  stop(project) {
    sessions.startProxy.stop(project.fullPath);
    project.devStop();
  },
  /**
   * 构建项目，并改变项目的状态
   * @param {Object} project 项目 stores 实例
   */
  build(project) {
    if (!sessions.buildProxy.has(project.fullPath)) {
      project.buildStart();
      sessions.buildProxy.start(
        {
          cwd: project.fullPath,
          shell: 'npm',
          shellArgs: ['run', 'build'],
        },
        (code) => {
          if (code === 0) {
            project.buildDone();
            const dist = path.join(project.clientPath, 'build');

            interaction.notify({
              title: '构建完成，点击查看构建结果',
              body: dist,
              onClick: () => {
                folder.open(dist);
              },
            });
          } else {
            project.buildFailed();
            dialog.notice({
              title: '构建失败',
              error: '请查看运行日志',
            });
          }
        }
      );
    }
  },

  /** 
   * 依赖单个安装，目前只支持client（前端）安装。
   * TODO: 支持前后端选择安装，需要配合UI处理
   */
  npminstall: (project, deps, isDev = false, callback) => {
    let dependencies = deps.split(/\s+/);
    dependencies = dependencies.filter((d) => !!d.trim());

    let hasAli = dependencies.some((dep) => {
      return dep.startsWith('@ali/') || dep.startsWith('@alife/');
    });

    let hasMidway = dependencies.some((dep) => {
      return dep.startsWith('midway');
    });

    let env = {};

    if (hasAli) {
      // 检测到含有 @ali 的包自动将路径设置为集团内部
      env.npm_config_registry = 'http://registry.npm.alibaba-inc.com';
      env.yarn_registry = 'http://registry.npm.alibaba-inc.com';

      if (hasMidway) {
        dependencies[dependencies.indexOf('midway')] = '@ali/midway';
      }
    } else if (hasMidway) {
      // 开源 midway 不能从 tnpm 源下载
      env.npm_config_registry = 'https://registry.npmjs.com';
      env.yarn_registry = 'https://registry.npmjs.com';
    }

    if (dependencies.length > 0) {
      dependencies = dependencies.map((dep) => {
        if (dep.lastIndexOf('@') > 0) {
          return dep;
        } else {
          return `${dep}@latest`;
        }
      });
      let installPrefix = '--save';
      if (isDev) {
        installPrefix = '--save-dev';
      }

      const cwd = project.clientPath;

      sessions.manager.new(
        {
          cwd: cwd,
          env: env,
          shell: 'npm',
          shellArgs: ['install', '--no-package-lock', installPrefix].concat(
            dependenciesFormat(dependencies)
          ),
        },
        (code) => {
          if (code !== 0) {
            log.error('安装依赖失败', cwd, dependencies);
            callback(1, dependencies);
          } else {
            log.info('安装依赖成功', cwd, dependencies);
            callback(null, dependencies);
          }
        }
      );
    }
  },

  /** 
   * project: 当前项目
   * 依赖全量安装/重装，都是client和server共同执行。
   */
  install: ({ project, reinstall = true }, callback) => {
    log.debug('开始安装', project.fullPath);
    let nodeModulesPaths = [];
    nodeModulesPaths.push(path.join(project.clientPath, 'node_modules'));
    if (project.serverPath) {
      nodeModulesPaths.push(path.join(project.serverPath, 'node_modules'));
    }  
    // const nodeModulesPath = path.join(cwd, 'node_modules');
    new Promise(async (resolve, reject) => {
      if (reinstall) {
        const cwd = nodeModulesPaths[0];
        terms.writeln(cwd, '正在清理 node_modules 目录请稍等...');
        rimraf(cwd, (error) => {
          log.debug('node_modules 删除成功');
          if (error) {
            terms.writeln(cwd, '清理 node_modules 失败');
            reject(error);
          } else {   
            terms.writeln(cwd, '清理 node_modules 目录完成');
            resolve();
          }
        });
      } else {
        resolve();
      }
    })
      .then(() => {
        if (nodeModulesPaths.length === 2) {
          return new Promise(async (resolve, reject) => {
            const cwd = nodeModulesPaths[1];
            rimraf(cwd, (error) => {
              if (error) {
                terms.writeln(cwd, '清理 node_modules 失败');
                reject(error);
              } else {
                terms.writeln(cwd, '清理 node_modules 目录完成');
                resolve();
              }
            })
         })
        } else {
          return Promise.resolve();
        }
      })
      .catch((error) => {
        callback(1, {
          title: '依赖清空失败',
          content: `清理 node_modules 目录失败，请尝试手动删除 ${nodeModulesPath} ${
            error.message
          }`,
        });
      })
      .then(() => {
        return isAlibaba();
      })
      .then((isAli) => {
        let env = {};

        if (project.nodeFramework === 'midway') {
          console.debug('安装依赖 - 检测为 Midway 项目');
          // 开源 Midway 不能从 tnpm 源下载
          env.npm_config_registry = 'https://registry.npmjs.com';
          env.yarn_registry = 'https://registry.npmjs.com';
        } else if (isAli) {
          console.debug('安装依赖 - 检测为内网环境');
          // 检测到内网环境自动将路径设置为集团内部
          env.npm_config_registry = 'http://registry.npm.alibaba-inc.com';
          env.yarn_registry = 'http://registry.npm.alibaba-inc.com';
        }

        sessions.manager.new(
          {
            cwd: project.fullPath,
            env: env,
            shell: 'npm',
            shellArgs: ['install', '--no-package-lock'],
          },
          (code) => {
            if (code !== 0) {
              log.error('project-install-failed');
              callback(code, {
                title: '重装依赖失败',
                content:
                  '请检查网络连接是否正常，可展开【运行日志】日志查看详细反馈信息',
              });
            } else {
              callback(0);
            }
          }
        );
      });
  },

};
