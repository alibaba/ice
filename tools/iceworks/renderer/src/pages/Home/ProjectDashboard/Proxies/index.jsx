/**
 * 获取当前页面项目的所有 page
 */

import { Dialog, Input, Button, Feedback, Checkbox } from '@icedesign/base';
import { inject, observer } from 'mobx-react';
import deepcopy from 'deepcopy';
import fs from 'fs';
import path from 'path';
import React, { Component } from 'react';
import Tooltip from 'rc-tooltip';

import DashboardCard from '../../../../components/DashboardCard/';
import ExtraButton from '../../../../components/ExtraButton/';
import Icon from '../../../../components/Icon';
import EmptyTips from '../../../../components/EmptyTips/';

const newRuleItem = ['', { enable: true }];

Object.fromEntries = (array) => {
  return array.reduce((obj, [k, v]) => ({ ...obj, [k]: v }), {});
};

@inject('projects', 'newpage', 'pageBlockPicker')
@observer
class Proxies extends Component {
  static extensionName = 'proxies';

  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      proxyConfig: {},
      proxyConfigRules: [],
    };
  }

  componentWillMount() {
    this.readProxyConfig();
  }

  componentDidMount() {
    this.props.projects.on('change', this.readProxyConfig);
  }

  componentWillUnmount() {
    this.props.projects.removeListener('change', this.readProxyConfig);
  }

  readProxyConfig = () => {
    const { currentProject } = this.props.projects;

    if (currentProject) {
      const pkgFilePath = path.join(currentProject.clientPath, 'package.json');
      try {
        let pkgData = fs.readFileSync(pkgFilePath);
        pkgData = JSON.parse(pkgData.toString());
        const proxyConfig = pkgData.proxyConfig || {};
        let proxyConfigRules = Object.entries(proxyConfig).map(
          ([rule, options]) => {
            if (typeof options == 'string') {
              return [rule, { target: options, enable: true }];
            }
            return [rule, { ...options }];
          }
        );
        this.setState({
          proxyConfig,
          proxyConfigRules: proxyConfigRules,
        });
      } catch (e) {}
    }
  };

  writeProxyConfig = (proxyConfig, cb) => {
    const { currentProject } = this.props.projects;
    if (currentProject) {
      const pkgFilePath = path.join(currentProject.clientPath, 'package.json');
      try {
        let pkgData = fs.readFileSync(pkgFilePath);
        pkgData = JSON.parse(pkgData.toString());
        pkgData.proxyConfig = proxyConfig;

        fs.writeFile(pkgFilePath, JSON.stringify(pkgData, null, 2), cb);
      } catch (e) {
        console.error(pkgFilePath + ' 不存在');
      }
    }
  };

  handleModifyRules = () => {
    this.setState({
      visible: true,
    });
  };

  handleClose = () => {
    this.setState({
      proxyConfigRules: Object.entries(this.state.proxyConfig),
      visible: false,
    });
  };

  handleChangeRule = (index, value) => {
    this.setState((state) => {
      state.proxyConfigRules[index][0] = value;
      return {
        proxyConfigRules: state.proxyConfigRules,
      };
    });
  };
  handleChangeEnable = (index, value) => {
    this.setState((state) => {
      state.proxyConfigRules[index][1].enable = value;
      return {
        proxyConfigRules: state.proxyConfigRules,
      };
    });
  };

  handleChangeRuleTarget = (index, value) => {
    this.setState((state) => {
      state.proxyConfigRules[index][1].target = value;
      return {
        proxyConfigRules: state.proxyConfigRules,
      };
    });
  };

  handleAddRule = () => {
    this.setState((state) => {
      state.proxyConfigRules.push(deepcopy(newRuleItem));
      return {
        proxyConfigRules: state.proxyConfigRules,
      };
    });
  };

  handleDeleteRule = (index) => {
    this.setState((state) => {
      state.proxyConfigRules.splice(index, 1);
      return {
        proxyConfigRules: state.proxyConfigRules,
      };
    });
  };

  handleSaveProxy = () => {
    let { proxyConfigRules } = this.state;

    proxyConfigRules = proxyConfigRules.filter(([rule, options]) => {
      return rule && options.target && rule !== '' && options.target !== '';
    });

    const proxyConfig = Object.fromEntries(proxyConfigRules);

    this.writeProxyConfig(proxyConfig, (error) => {
      if (!error) {
        Feedback.toast.success('代理配置修改成功，重启调试服务使代理生效');
        this.setState({
          proxyConfig,
          proxyConfigRules,
          visible: false,
        });
      } else {
        Feedback.toast.error('代理配置修改失败');
      }
    });
  };

  renderProxyConfig = () => {
    const { proxyConfig } = this.state;
    const proxyRules = Object.keys(proxyConfig);
    if (proxyConfig && proxyRules.length > 0) {
      return (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>启用</th>
              <th style={styles.th}>匹配规则</th>
              <th style={styles.th}>代理目标地址</th>
            </tr>
          </thead>
          <tbody>
            {proxyRules.map((rule, index) => {
              return (
                <tr key={index}>
                  <td style={styles.td}>
                    {proxyConfig[rule].enable ? 'Y' : 'N'}
                  </td>
                  <td style={styles.td}>{rule}</td>
                  <td style={styles.td}>{proxyConfig[rule].target}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    } else {
      return <EmptyTips>暂无代理配置</EmptyTips>;
    }
  };

  renderProxyForm = () => {
    let { proxyConfigRules } = this.state;

    if (Array.isArray(proxyConfigRules) && proxyConfigRules.length == 0) {
      proxyConfigRules.push(deepcopy(newRuleItem));
    }

    return (
      <div>
        <div style={styles.ruleItem}>
          <div style={styles.ruleEnable}>启用</div>
          <div style={styles.rule}>
            匹配规则
            <Tooltip
              placement="top"
              overlay={
                <div style={{ maxWidth: 300 }}>
                  <dl style={{ margin: 0, padding: 0 }}>
                    <dt style={{ fontSize: 14, padding: '5px 0' }}>规则说明</dt>
                    <dd
                      style={{ color: '#aaa', lineHeight: '20px', margin: 0 }}
                    >
                      `/**` 表示匹配所有请求。
                    </dd>
                    <dd
                      style={{ color: '#aaa', lineHeight: '20px', margin: 0 }}
                    >
                      `/api/**` 表示匹配所有起始路径为 `/api` 的请求。
                    </dd>
                    <dt style={{ fontSize: 14, padding: '5px 0' }}>
                      目标地址说明
                    </dt>
                    <dd
                      style={{ color: '#aaa', lineHeight: '20px', margin: 0 }}
                    >
                      匹配路径后的请求将实际以目标地址 + 原请求地址发送请求。
                    </dd>
                    <dd
                      style={{ color: '#aaa', lineHeight: '20px', margin: 0 }}
                    >
                      例如：匹配规则为 `/**` 目标地址为
                      `http://127.0.0.1:7001`，当发送请求 `/get/users` 则请求到
                      `http://127.0.0.1:7001/get/users`。
                    </dd>
                  </dl>
                </div>
              }
            >
              <Icon type="help" />
            </Tooltip>
          </div>
          <div style={styles.ruleTarget}>代理目标地址</div>
          <div style={styles.ruleBtns}>
            <Button size="small" type="primary" onClick={this.handleAddRule}>
              新增
            </Button>
          </div>
        </div>
        {proxyConfigRules.map((rule, index) => {
          return (
            <div style={styles.ruleItem} key={index}>
              <div style={styles.ruleEnable}>
                <Checkbox
                  checked={rule[1].enable}
                  placeholder="/**"
                  onChange={this.handleChangeEnable.bind(this, index)}
                />
              </div>
              <div style={styles.rule}>
                <Input
                  style={{ width: '100%' }}
                  value={rule[0]}
                  placeholder="/**"
                  onChange={this.handleChangeRule.bind(this, index)}
                />
              </div>
              <div style={styles.ruleTarget}>
                <Input
                  style={{ width: '100%' }}
                  value={rule[1].target}
                  placeholder="http://127.0.0.1:7001"
                  onChange={this.handleChangeRuleTarget.bind(this, index)}
                />
              </div>
              <div style={styles.ruleBtns}>
                <Button
                  size="small"
                  onClick={this.handleDeleteRule.bind(this, index)}
                >
                  删除
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    return (
      <DashboardCard>
        <DashboardCard.Header>
          <div>代理配置</div>
          <div>
            <ExtraButton
              style={{ color: '#3080FE' }}
              placement={'top'}
              tipText={'刷新'}
              onClick={this.readProxyConfig}
            >
              <Icon type="reload" style={{ fontSize: 18 }} />
            </ExtraButton>
            <ExtraButton
              style={{ color: '#3080FE' }}
              placement={'top'}
              tipText={'修改代理规则'}
              onClick={this.handleModifyRules}
            >
              <Icon type="edit" style={{ fontSize: 18 }} />
            </ExtraButton>
          </div>
        </DashboardCard.Header>
        <DashboardCard.Body>
          {this.renderProxyConfig()}
          <Dialog
            style={{ width: '60%' }}
            title="自定义代理配置"
            visible={this.state.visible}
            onClose={this.handleClose}
            onCancel={this.handleClose}
            footer={
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}
              >
                <Button type="primary" onClick={this.handleSaveProxy}>
                  保存
                </Button>
                <Button onClick={this.handleClose}>取消</Button>
              </div>
            }
          >
            {this.renderProxyForm()}
          </Dialog>
        </DashboardCard.Body>
      </DashboardCard>
    );
  }
}

const styles = {
  table: {
    width: '100%',
  },
  th: {
    lineHeight: '24px',
    borderBottom: '1px solid #eee',
    textAlign: 'left',
    padding: '3px',
  },
  td: {
    lineHeight: '20px',
    borderBottom: '1px solid #eee',
    padding: '3px',
    color: '#666',
  },
  ruleItem: {
    padding: '5px 0',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  rule: {
    width: '40%',
    flex: '0 0 40%',
    padding: '0 5px',
  },
  ruleEnable: {
    width: '40px',
    flex: '0 0 40px',
    padding: '0 5px',
    textAlign: 'center',
  },
  ruleTarget: {
    flex: 'auto',
    padding: '0 5px',
  },
  ruleBtns: {
    flex: '0 0 auto',
    padding: '0 0 0 5px',
  },
};

export default Proxies;
