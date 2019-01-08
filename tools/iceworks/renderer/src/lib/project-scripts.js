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

const { log, folder, interaction, npm, sessions } = services;

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

const repairPackage = ({ projectPath, libary }) => {
  const packageFilePath = path.join(projectPath, 'package.json');

  return new Promise((resolve, reject) => {
    pathExists(packageFilePath).then((exists) => {
      if (!exists) {
        reject();
      } else {
        try {
          const pakcageContents = fs.readFileSync(packageFilePath);
          const packageData = JSON.parse(pakcageContents.toString());

          // hack 通过 libary 简单判断 vue 的处理逻辑，先耦合进来
          const projectType = libary;

          packageData.scripts = packageData.scripts || {};
          packageData.devDependencies = packageData.devDependencies || {};

          packageData.scripts = Object.assign({}, packageData.scripts, {
            ...configs[projectType].scripts,
          });

          const originBuildConfig = packageData.ice;

          // Copy to buildConfig
          if (originBuildConfig) {
            if (originBuildConfig.projectName) {
              packageData.title = originBuildConfig.projectName;
            }

            packageData.buildConfig = {
              theme: originBuildConfig.themePackage,
              entry: originBuildConfig.entry,
            };

            delete packageData.ice;
          }

          packageData.devDependencies = Object.assign(
            {},
            packageData.devDependencies,
            {
              ...configs[projectType].devDependencies,
            }
          );

          fs.writeFileSync(
            packageFilePath,
            JSON.stringify(packageData, null, 2)
          );
          resolve();
        } catch (error) {
          reject(error);
        }
      }
    });
  });
};

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
            const dist = path.join(project.fullPath, 'build');

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

  npminstall: (cwd, deps, isDev = false, callback) => {
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

  install: ({ cwd, reinstall = true, isMidway = false }, callback) => {
    log.debug('开始安装', cwd);
    const nodeModulesPath = path.join(cwd, 'node_modules');
    new Promise((resolve, reject) => {
      if (reinstall) {
        terms.writeln(cwd, '正在清理 node_modules 目录请稍等...');
        rimraf(nodeModulesPath, (error) => {
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

        if (isMidway) {
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
            cwd: cwd,
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

  // FIXME 这里与 ice 项目强耦合，其他类型的项目无法修复
  repair: ({ path: projectPath, libary }, callback) => {
    log.debug('开始修复项目', projectPath);
    // 添加 start build
    const nodeMoudlesPath = path.join(projectPath, 'node_modules');
    repairPackage({ projectPath, libary })
      .then(() => {
        log.debug('删除 node_modules', nodeMoudlesPath);
        return new Promise((resolve, reject) => {
          rimraf(nodeMoudlesPath, (error) => {
            if (error) {
              reject(error);
            } else {
              log.debug('删除 node_modules 完成', nodeMoudlesPath);
              resolve();
            }
          });
        });
      })
      .catch((error) => {
        log.debug('删除 node_modules 失败', nodeMoudlesPath);
        callback({
          title: '依赖清空失败',
          error: `清理 node_modules 目录失败，请尝试手动删除 ${nodeMoudlesPath}
 ${error.message}`,
        });
      })
      .then(() => {
        return npm.run(['install', '--no-package-lock'], {
          cwd: projectPath,
        });
      })
      .then(() => {
        log.debug('安装 node_modules 成功', projectPath);
        callback(null);
      })
      .catch((error) => {
        log.debug('安装 node_modules 失败', projectPath);
        log.error(error);
        callback({
          title: '项目修复失败',
          error: error,
        });
      });
  },
};
