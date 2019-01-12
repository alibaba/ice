// import { Icon } from '@icedesign/base';
import { inject, observer } from 'mobx-react';
import { Tab } from '@icedesign/base';
import fs from 'fs';
import fsExtra from 'fs-extra';
import path from 'path';
import pathExists from 'path-exists';
import React, { Component } from 'react';
import Tooltip from 'rc-tooltip';

import DashboardCard from '../../../components/DashboardCard/';
import EmptyTips from '../../../components/EmptyTips/';
import ExtraButton from '../../../components/ExtraButton/';
import Icon from '../../../components/Icon';
import services from '../../../services';
const { npm } = services;

@inject('projects', 'installer')
@observer
class Dependencies extends Component {
  static extensionName = 'dependencies';

  constructor(props) {
    super(props);
    this.state = {
      dependencies: {},
      devDependencies: {},
    };
  }

  unsafe_componentWillMount() {
    this.readPackage();
  }

  componentDidMount() {
    // ipcRenderer.on('focus', this.readPackage);
    this.props.projects.on('change', this.readPackage);
  }

  componentWillUnmount() {
    // ipcRenderer.removeListener('foucs', this.readPackage);
    this.props.projects.removeListener('change', this.readPackage);
  }

  readPackageVersion = (name, cwd) => {
    return new Promise((resolve) => {
      const pkgPath = path.join(cwd, 'node_modules', name, 'package.json');
      let v = '-';
      if (pathExists.sync(pkgPath)) {
        try {
          v = fsExtra.readJsonSync(pkgPath).version;
        } catch (e) {}
      }
      resolve([name, v]);
    });
  };

  updateOutdated = () => {
    const { projects } = this.props;
    const { dependencies, devDependencies } = this.state;
    const currentProject = projects.currentProject;
    npm.exec(
      'npm outdated --json --silent',
      { cwd: currentProject.clientPath },
      (error, stdout, stderr) => {
        if (stdout) {
          try {
            const outdatedDeps = JSON.parse(stdout);
            const outdated = [];
            for (const [key, value] of Object.entries(outdatedDeps)) {
              outdated.push({ name: key, ...value });
            }

            outdated.forEach((newer) => {
              if (newer.current && newer.current !== newer.wanted) {
                if (newer.name in dependencies) {
                  dependencies[newer.name].latest = newer.latest;
                  dependencies[newer.name].wanted = newer.wanted;
                }
                if (newer.name in devDependencies) {
                  devDependencies[newer.name].latest = newer.latest;
                  devDependencies[newer.name].wanted = newer.wanted;
                }
              }
            });

            this.setState({ dependencies, devDependencies });
          } catch (e) {}
        }
      }
    );
  };

  // 更新已经安装的包
  updateInstalled = () => {
    const { projects } = this.props;
    let { dependencies, devDependencies } = this.state;
    const currentProject = projects.currentProject;

    // 更新所有已经依赖的版本

    Promise.all(
      Object.keys(dependencies).map((name) => {
        return this.readPackageVersion(name, currentProject.clientPath);
      })
    )
      .then((depsInstalled) => {
        depsInstalled.forEach(([name, installedVersion]) => {
          dependencies[name].current = installedVersion;
        });
        return Promise.resolve();
      })
      .then(() => {
        return Promise.all(
          Object.keys(devDependencies).map((name) => {
            return this.readPackageVersion(name, currentProject.clientPath);
          })
        );
      })
      .then((devDepsInstalled) => {
        devDepsInstalled.forEach(([name, installedVersion]) => {
          devDependencies[name].current = installedVersion;
        });
        return Promise.resolve();
      })
      .then(() => {
        this.setState({ dependencies, devDependencies }, this.updateOutdated);
      });
  };

  readPackage = () => {
    const { projects } = this.props;
    const currentProject = projects.currentProject;
    let dependencies = {};
    let devDependencies = {};
    if (!currentProject || !currentProject.exists) return null;

    // package.json 的路径地址
    const packageFilePath = path.join(currentProject.clientPath, 'package.json');
    if (fs.existsSync(packageFilePath)) {
      let packageData = fs.readFileSync(packageFilePath);
      try {
        packageData = JSON.parse(String(packageData));
        let deps = packageData.dependencies;
        if (deps) {
          // 转换格式
          deps = Object.entries(deps).reduce((accumulator, current) => {
            const [name, version] = current;
            accumulator[name] = { require: version };
            return accumulator;
          }, {});
          dependencies = Object.assign(dependencies, deps);
        }
        let devDeps = packageData.devDependencies;
        if (devDeps) {
          // 转换格式
          devDeps = Object.entries(devDeps).reduce((accumulator, current) => {
            const [name, version] = current;
            accumulator[name] = { require: version };
            return accumulator;
          }, {});
          devDependencies = Object.assign(devDependencies, devDeps);
        }
        this.setState({ dependencies, devDependencies }, this.updateInstalled);
      } catch (e) {
        this.setState({ dependencies, devDependencies });
        console.log('package.json 文件 parse 失败'); // eslint-disable-line no-console
        console.error(e); // eslint-disable-line no-console
      }
    } else {
      this.setState({ dependencies, devDependencies });
    }
  };

  handleNpminstallOpen = () => {
    const { type } = this.props;
    this.props.installer.open(type);
  };

  handleReload = () => {
    let { dependencies, devDependencies } = this.state;
    Object.keys(dependencies).forEach((name) => {
      dependencies[name].current = '-';
      dependencies[name].wanted = false;
    });
    Object.keys(devDependencies).forEach((name) => {
      devDependencies[name].current = '-';
      devDependencies[name].wanted = false;
    });

    this.setState({ dependencies, devDependencies }, () => {
      setTimeout(() => {
        this.readPackage();
      }, 0);
    });
  };

  handleUpdateDependencies = (name, type) => {
    const { projects } = this.props;
    const deps = this.state[type];
    const currentProject = projects.currentProject;

    if (!deps[name].installing) {
      deps[name].installing = true;
      this.setState({ [type]: deps });
      npm.exec(
        `npm update ${name} --silent`,
        { cwd: currentProject.clientPath },
        (error) => {
          if (error) {
            deps[name].installing = false;
          } else {
            deps[name].current = deps[name].wanted;
            deps[name].installing = false;
            delete deps[name].wanted;
          }
          this.setState({ [type]: deps });
        }
      );
    }
  };

  renderDependencies = (deps, type = 'dependencies') => {
    const depsArr = Object.keys(deps);
    if (depsArr.length == 0) {
      return <EmptyTips style={{ minHeight: 40 }}>暂无依赖项</EmptyTips>;
    }
    return (
      <div style={styles.depsWrapper}>
        {depsArr.map((name) => {
          return (
            <div style={styles.depsItem} key={name}>
              <Tooltip placement={'top'} overlay={name}>
                <div
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    lineHeight: '20px',
                    color: '#999',
                  }}
                >
                  {name}
                </div>
              </Tooltip>
              <div
                style={{
                  lineHeight: '20px',
                  height: 20,
                  fontSize: 14,
                  fontWeight: 500,
                  display: 'flex',
                  flexDirection: 'row',
                  color: '#666',
                }}
              >
                <span>{deps[name].current}</span>
                {deps[name].wanted && (
                  <Tooltip
                    placement={'top'}
                    overlay={
                      <span>
                        升级到 {deps[name].wanted}{' '}
                        {deps[name].installing ? ' 正在更新中' : ''}
                      </span>
                    }
                  >
                    <div
                      style={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        lineHeight: '20px',
                        color: '#999',
                      }}
                    >
                      <span
                        style={{
                          paddingLeft: 8,
                          color: deps[name].installing ? '#fcda52' : '#2eca9c',
                          cursor: 'pointer',
                        }}
                        onClick={this.handleUpdateDependencies.bind(
                          this,
                          name,
                          type
                        )}
                      >
                        <Icon type="package" />
                      </span>
                    </div>
                  </Tooltip>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    const { dependencies, devDependencies } = this.state;
    let dependenciesOutdatedCount = 0;
    Object.entries(dependencies).forEach(([name, value]) => {
      if (value.wanted) {
        dependenciesOutdatedCount += 1;
      }
    });
    let devDependenciesOutdatedCount = 0;
    Object.entries(devDependencies).forEach(([name, value]) => {
      if (value.wanted) {
        devDependenciesOutdatedCount += 1;
      }
    });
    const { currentProject } = this.props.projects;
    const title = currentProject.nodeFramework ? '依赖管理(前端)' : '依赖管理'
    return (
      <DashboardCard>
        <DashboardCard.Header>
          <div>{title}</div>
          <div>
            <ExtraButton
              style={{ color: '#3080FE' }}
              placement={'top'}
              tipText={'刷新'}
              onClick={this.handleReload}
            >
              <Icon type="reload" style={{ fontSize: 18 }} />
            </ExtraButton>
            <ExtraButton
              style={{ color: '#3080FE' }}
              placement={'top'}
              tipText={'添加依赖'}
              onClick={this.handleNpminstallOpen}
            >
              <Icon type="plus-o" style={{ fontSize: 18 }} />
            </ExtraButton>
          </div>
        </DashboardCard.Header>
        <DashboardCard.Body>
          <Tab size="small" contentStyle={{ padding: '10px 0 0' }}>
            <Tab.TabPane
              tab={
                <div>
                  dependencies
                  {dependenciesOutdatedCount > 0 ? (
                    <span
                      style={{
                        paddingLeft: 10,
                        fontSize: 12,
                        color: '#2eca9c',
                      }}
                    >
                      ({dependenciesOutdatedCount})
                    </span>
                  ) : (
                    <span
                      style={{
                        paddingLeft: 10,
                        fontSize: 12,
                        color: '#666',
                      }}
                    >
                      ({Object.keys(dependencies).length})
                    </span>
                  )}
                </div>
              }
              key="dependencies"
            >
              {this.renderDependencies(dependencies)}
            </Tab.TabPane>
            <Tab.TabPane
              tab={
                <div>
                  devDependencies
                  {devDependenciesOutdatedCount > 0 ? (
                    <span
                      style={{
                        paddingLeft: 10,
                        fontSize: 12,
                        color: '#2eca9c',
                      }}
                    >
                      ({devDependenciesOutdatedCount})
                    </span>
                  ) : (
                    <span
                      style={{
                        paddingLeft: 10,
                        fontSize: 12,
                        color: '#666',
                      }}
                    >
                      ({Object.keys(devDependencies).length})
                    </span>
                  )}
                </div>
              }
              key="devDependencies"
            >
              {this.renderDependencies(devDependencies, 'devDependencies')}
            </Tab.TabPane>
          </Tab>
        </DashboardCard.Body>
      </DashboardCard>
    );
  }
}

const styles = {
  item: {
    borderBottom: '1px solid #eee',
    color: '#666',
    textAlign: 'left',
    padding: '4px',
  },
  depsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  depsItem: {
    flex: '0 0 33.33%',
    width: '33.33%',
    padding: '0 5px 8px',
  },
};

export default Dependencies;
