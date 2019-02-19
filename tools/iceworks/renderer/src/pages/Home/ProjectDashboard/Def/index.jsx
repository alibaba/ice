import { Button, Feedback, Dialog, Input, CascaderSelect, Balloon } from '@icedesign/base';
import { FormBinderWrapper, FormBinder, FormError } from '@icedesign/form-binder';
import { EventEmitter } from 'events';
import { inject, observer } from 'mobx-react';
import { ipcRenderer, remote, shell } from 'electron';
import { StringDecoder } from 'string_decoder';
import gitPromie from 'simple-git/promise';
import React, { Component } from 'react';
import pathExists from 'path-exists';
import path from 'path';
import Notification from '@icedesign/notification';

import DashboardCard from '../../../../components/DashboardCard';
import EmptyTips from '../../../../components/EmptyTips';
import ExtraButton from '../../../../components/ExtraButton';
import Icon from '../../../../components/Icon';
import services from '../../../../services';
import spc from '../../../../spc';
import dialog from '../../../../components/dialog';
import projects from '../../../../stores/projects';

import GitTools from '../../../../lib/git-tools';

import Client from './Client';

const { shared } = services;
const decoder = new StringDecoder('utf8');
class ClientEmiter extends EventEmitter {
  constructor() {
    super();

    this.cwdValue = '';
  }

  set cwd(value) {
    this.cwdValue = value;
  }

  get cwd() {
    return this.cwdValue;
  }

  send(data) {
    spc.emit('session:data', {
      cwd: this.cwd,
      data: decoder.write(data),
    });
  }

  newline() {
    spc.emit('session:newline', { cwd: this.cwd });
  }
}

const clientEmiter = new ClientEmiter();

const client = new Client.Client();
client.on('start', () => {
  const currentProject = projects.currentProject;
  if (currentProject) {
    currentProject.toggleTerminal();
  }
  clientEmiter.emit('start');
});
client.on('message', (msg) => {
  clientEmiter.send(msg + '\n\r');
});
client.on('build_message', (msg) => {
  clientEmiter.send(msg);
});
client.on('error', (error) => {
  clientEmiter.send('\r\n' + error.message);
  clientEmiter.emit('error', error);
});
client.on('success', () => {
  clientEmiter.newline();
  clientEmiter.emit('success');
});

@inject('projects', 'user', 'git')
@observer
class Def extends Component {
  static extensionName = 'def';

  constructor(props) {
    super(props);

    this.state = {
      defPublishing: false,
    };
    this.init();
  }

  componentDidMount() {

    const { projects } = this.props;
    clientEmiter.on('start', () => {
      const { currentProject } = projects;
      currentProject.setCloudBuild('start');
    });

    clientEmiter.on('success', () => {
      const { currentProject } = projects;
      currentProject.setCloudBuild('success');
    });

    clientEmiter.on('error', () => {
      const { currentProject } = projects;
      currentProject.setCloudBuild('error');
    });
  }

  componentWillReceiveProps() {
    this.init();
  }

  init() {
    const { currentProject = {} } = this.props.projects;
    const cwd = currentProject.fullPath;
    clientEmiter.cwd = cwd;
  }

  getUserInfo = () => {
    const userValue = localStorage.getItem('login:user');
    let user;

    if (userValue) {
      try {
        user = JSON.parse(userValue);
      } catch (e) {}
    }
    return user;
  };


  handlePublishToDaily = async () => {
    try {
      await this.cloudPublish('daily');
    } catch (error) {
      console.error(error);
    }
  };

  handlePublishToProd = async () => {
    try {
      await this.cloudPublish('prod');
    } catch (error) {
      console.error(error);
    }
  };

  confirmFilesIsCommit = () => {
    const { currentProject } = this.props.projects;
    const trigger = <Icon type="help" style={{
      marginLeft: '3px',
      fontSize: '14px'
    }} />

    return new Promise( (resolve, reject) => {
      const dialog = Dialog.confirm({
        needWrapper: false,
        title: '提示',
        content: (
          <div style={{
            textAlign: 'center',
            margin: '20px 10px',
            fontSize: '16px',
          }}>
            当前 Git 仓库本地有未提交的代码，请确认操作
          </div>
        ),
        footer: (
          <div>
            <Button
              onClick={() => { resolve('git'); dialog.hide();}}
              type="primary"
            >
              提交并发布
              <Balloon
                trigger={trigger}
                align="b"
                alignment="edge"
                style={{ width: 600 }}
              >
                <div style={{
                  margin: '0 0 10px 0',
                  fontSize: '14px',
                }}>Git 提交将执行以下操作：</div>
                <ul>
                  <li><i>git add .</i></li>
                  <li><i>git commit -m 'chore: update {currentProject.projectName}'</i></li>
                  <li><i>git push</i></li>
                </ul>
              </Balloon>
            </Button>
            <Button onClick={() => { resolve(true); dialog.hide();}}>直接发布</Button>
            <Button onClick={() => { resolve(false); dialog.hide();}}>取消</Button>
          </div> 
        )
      });
    })
  }

  cloudPublish = async (target) => {
    const { projects, git } = this.props;
    const { originRemote, currentBranch, status } = git;
    const user = this.getUserInfo();
    // 1. 检测是否登录
    if (!user || !user.workid) {
      dialog.confirm(
        {
          title: '请先登录内网账号！',
          content: '是否立即登录，登录完成后请重新发布',
        },
        (ok) => {
          if (ok) {
            this.props.user.open();
          }
        }
      );
      return;
    }
    // 2. 分支是否合法
    if (!/[^\/]+\/\d+\.\d+\.\d+/i.test(currentBranch)) {
      Feedback.toast.error(
        '云构建要求分支名为： prefix/x.y.z 格式，例如：daily/1.0.0，请到 Git 插件变更分支'
      );
      return;
    }
    // 3. 开始发布
    await this.setState({ defPublishing: true });
    const lastCommit = await git.lastCommit();
    if (!lastCommit) {
      return;
    }
    const { currentProject } = projects;

    if (target == 'daily') {
      // 1. 如果有文件未提交，则供用户选择，进行git提交，或者
      if (status && status.files && status.files.length > 0) {
        const nextPublish = await this.confirmFilesIsCommit();
        if (nextPublish === 'git') {
          const commitDone = await git.addAndCommit('.', `chore: update ${currentProject.projectName}`);
          if (commitDone) {
            git.checkIsRepo();
          } else {
            this.setState({ defPublishing: false });
            return;
          }
        } else if (!nextPublish) {
          this.setState({ defPublishing: false });
          return;
        }
      } 
      // 2. push
      const pushDone = await git.push();
      if (pushDone) {
        Notification.success({
          message: 'Git 推送代码成功',
          duration: 8,
        });
      } else {
        this.setState({ defPublishing: false });
        return;
      }
    } 

    // eslint-disable-next-line
    console.log(currentBranch, '提交完成，开始进入前端发布');
    client.run({
      hideBuildMessage: true,
      // eslint-disable-next-line
      client_token: shared.defToken, // 可找 @上坡(shangpo.zw)  @星弛(xingchi.mxc)
      // eslint-disable-next-line
      client_emp_id: user.workid,
      target: target, // daily: 资源发布日常环境，prod: 资源发布线上环境
      repo: originRemote.refs.push, // 仓库地址
      branch: currentBranch, // 仓库分支
      // eslint-disable-next-line
      commit_id: lastCommit.latest.hash, // 当前发布的 commit id 值
      env: shared.defEnv, // (可选)DEF 发布系统的环境, daily: 日常，prepub: 预发，prod: 线上；联调时可使用
    });
    this.setState({ defPublishing: false 
    }, () => {
      git.checkIsRepo();
    });
   
  };

  renderBody = () => {
    const { projects, git } = this.props;
    const { currentProject } = projects;

    if (git.loading) {
      return <div>Loading</div>;
    }

    if (git.showMainPanel) {
      return (
        <div>
          <div
            style={{
              paddingTop: 5,
              marginTop: 5,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div
              style={{
                flex: 'auto',
                display: 'flex',
                flexDirection: 'flow',
                minHeight: 140,
              }}
            >
              <Icon type="tip" style={{ 
                color: 'rgb(48, 128, 254)', 
                paddingRight: 10,
                position: 'relative',
                top: '14px'
              }} />
              <div style={{ 
                color: '#aaa', 
                fontSize: 14 , 
                display: 'flex', 
                flexDirection: 'column', 
                maxWidth: '400px',
              }}>
                <p>1. git 操作请在 Git 插件中处理</p>
                <p style={{whiteSpace: 'initial'}}>2. def 发布要求分支名为： prefix/x.y.z，例如：daily/1.0.0</p>
              </div>
            </div>
            <Button.Group>
              <Button
                size="small"
                type="secondary"
                onClick={this.handlePublishToDaily}
                loading={this.state.defPublishing}
                disabled={currentProject.statusCloudBuild == 'start'}
              >
                日常发布
              </Button>
              <Button
                size="small"
                type="primary"
                onClick={this.handlePublishToProd}
                disabled={currentProject.statusCloudBuild == 'start'}
              >
                正式发布
              </Button>
            </Button.Group>
            {currentProject.statusCloudBuild == 'start' && (
              <div style={{ fontSize: 12, marginLeft: 10 }}>正在发布中...</div>
            )}
          </div>
        </div>
      );
    }
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <EmptyTips>该项目不是一个 Git 仓库，请在 Git 插件配置后使用</EmptyTips>
        {/* 唤起 Git 插件 */}
      </div>
    );
  };

  render() {
    return (
      <DashboardCard>
        <DashboardCard.Header>
          <div>DEF 发布</div>
        </DashboardCard.Header>
        <DashboardCard.Body>
          {this.renderBody()}
        </DashboardCard.Body>
      </DashboardCard>
    );
  }
}

const styles = {
  statusTag: {
    padding: '0 4px',
    color: '#fff',
    fontSize: 10,
    borderRadius: 2,
    marginRight: 5,
  },
  statusWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  itemTitle: {
    width: 80,
    flex: '0 0 80px',
    padding: 4,
    textAlign: 'right',
    boxSizing: 'border-box',
    lineHeight: '20px',
  },
  itemContent: {
    display: 'flex',
    padding: 4,
    boxSizing: 'border-box',
    overflow: 'hidden',
    lineHeight: '20px',
    flex: 1,
  },
  formError: {
    display: 'block',
    marginTop: '5px'
  }
};

export default Def;
