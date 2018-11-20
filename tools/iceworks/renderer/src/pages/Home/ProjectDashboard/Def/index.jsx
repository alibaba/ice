import { Button, Feedback, Dialog, Input } from '@icedesign/base';
import { EventEmitter } from 'events';
import { inject, observer } from 'mobx-react';
import { ipcRenderer, remote } from 'electron';
import { StringDecoder } from 'string_decoder';
import gitPromie from 'simple-git/promise';
import React, { Component } from 'react';
import pathExists from 'path-exists';
import path from 'path';

import DashboardCard from '../../../../components/DashboardCard';
import EmptyTips from '../../../../components/EmptyTips/';
import ExtraButton from '../../../../components/ExtraButton';
import Icon from '../../../../components/Icon';
import services from '../../../../services';
import spc from '../../../../spc';
import dialog from '../../../../components/dialog';
import projects from '../../../../stores/projects';

const { shared } = services;
const decoder = new StringDecoder('utf8');
let Client;
try {
  Client = remote.require('@ali/def-pub-client');
} catch (e) {
  console.error('Can not found `@ali/def-pub-client` dependencies');
  Client = {
    Client: class A {
      on() {}
      run() {
        Dialog.alert({
          title: '提示',
          content: <div style={{ width: 400 }}>{'不支持 DEF 环境'}</div>,
        });
      }
    },
  };
}

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

@inject('projects', 'user')
@observer
class Def extends Component {
  static extensionName = 'def';

  constructor(props) {
    super(props);

    this.state = {
      commitVisible: false,
      commitMessage: '',
      pushLoading: false,
      loading: true,
      isRepo: false,
      remote: {},
      currentBranch: {},
      status: {},
    };
  }

  componentDidMount() {
    this.gitCheckIsRepo();

    ipcRenderer.on('focus', this.gitCheckIsRepo);
    const { projects } = this.props;
    projects.on('change', this.gitCheckIsRepo);

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

  componentWillUnmount() {
    ipcRenderer.removeListener('focus', this.gitCheckIsRepo);
    this.props.projects.removeListener('change', this.gitCheckIsRepo);
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

  git = () => {
    const { projects } = this.props;
    const { currentProject } = projects;
    const cwd = currentProject.fullPath;
    return gitPromie(cwd);
  };

  getOriginRemote = () => {
    return this.git()
      .getRemotes(true)
      .then((remotes) => {
        return remotes.filter(({ name }) => name == 'origin');
      });
  };

  getBranches = () => {
    return this.git().branchLocal();
  };

  gitStatus = () => {
    return this.git().status();
  };

  gitLastCommit = (opts) => {
    return this.git().log(opts);
  };

  gitCheckIsRepo = () => {
    const { projects } = this.props;
    const { currentProject } = projects;
    const cwd = currentProject.fullPath;
    clientEmiter.cwd = cwd;
    this.git()
      .checkIsRepo()
      .then(async (isRepo) => {
        const isGit = isRepo && pathExists.sync(path.join(cwd, '.git'));
        if (isGit) {
          const originRemote = await this.getOriginRemote();
          const branches = await this.getBranches();
          const status = await this.gitStatus();
          this.setState({
            isRepo: isGit,
            loading: false,
            originRemote: originRemote[0] || {},
            currentBranch: branches.current,
            status,
          });
        } else {
          this.setState({
            isRepo: isGit,
            loading: false,
            originRemote: {},
            currentBranch: {},
            status: {},
          });
        }
      })
      .catch((err) => {
        console.error('gitCheckIsRepo', err);
        this.setState({ isRepo: false, loading: false });
      });
  };

  handleReload = () => {
    this.gitCheckIsRepo();
  };

  handlePublishToDaily = async () => {
    await this.cloudPublish('daily');
  };

  handlePublishToProd = async () => {
    await this.cloudPublish('prod');
  };

  handleGitcommitOpen = () => {
    this.setState({ commitVisible: true, commitMessage: '' });
  };

  handleGitcommitClose = () => {
    this.setState({ commitVisible: false });
  };

  handleGitcommitMessage = (value) => {
    this.setState({ commitMessage: value });
  };

  handleGitcommitOk = () => {
    const { commitMessage } = this.state;

    this.git()
      .add('.')
      .then(() => {
        this.git()
          .commit(commitMessage)
          .then(() => {
            Feedback.toast.success('commit 成功');
            this.setState({ commitVisible: false });
          })
          .catch((err) => {
            Dialog.alert({
              title: '提示',
              content: (
                <div style={{ width: 400 }}>
                  {(err && err.message) || 'commit 失败请重试'}
                </div>
              ),
            });
          });
      })
      .catch((err) => {
        Dialog.alert({
          title: '提示',
          content: (
            <div style={{ width: 400 }}>
              {(err && err.message) || 'git add 失败请重试'}
            </div>
          ),
        });
      });
  };

  handleGitpush = () => {
    const { currentBranch } = this.state;
    this.setState({ pushLoading: true });
    this.git()
      .push('origin', currentBranch)
      .then(() => {
        Feedback.toast.success('git push 成功');
        this.setState({ pushLoading: false });
      })
      .catch((err) => {
        Dialog.alert({
          title: '提示',
          content: (
            <div style={{ width: 400 }}>
              {(err && err.message) || 'git push 失败请重试'}
            </div>
          ),
        });
        this.setState({ pushLoading: false });
      });
  };

  cloudPublish = async (target) => {
    const { originRemote, currentBranch } = this.state;
    const user = this.getUserInfo();
    const lastCommit = await this.gitLastCommit([currentBranch]);

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
    if (!/[^\/]+\/\d+\.\d+\.\d+/i.test(currentBranch)) {
      Feedback.toast.error(
        '云构建要求分支名为： prefix/x.y.z 格式，例如：daily/1.0.0'
      );
      return;
    }

    if (!(originRemote.refs && originRemote.refs.push)) {
      Feedback.toast.error('当前项目未设置 git remote 地址');
      return;
    }

    new Promise((resolve, reject) => {
      if (target == 'daily') {
        this.git()
          .push('origin', currentBranch)
          .then(resolve)
          .catch(reject);
      } else {
        resolve();
      }
    })
      .then(() => {
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
      })
      .catch((err) => {
        Dialog.alert({
          title: '提示',
          content: (
            <div style={{ width: 400 }}>
              {(err && err.message) || '分支 git push 失败请重试'}
            </div>
          ),
        });
      });
  };

  renderFilesStatus = () => {
    const { status } = this.state;
    if (status && status.files && status.files.length > 0) {
      return [
        ['created', '#5485F7'],
        ['deleted', '#999999'],
        ['modified', '#FCDA52'],
        ['not_added', '#2ECA9C'],
        ['conflicted', '#FA7070'],
        ['renamed', '#FA7070'],
      ].map(([key, color]) => {
        if (Array.isArray(status[key]) && status[key].length > 0) {
          return (
            <div
              key={key}
              style={{ ...styles.statusTag, backgroundColor: color }}
            >
              {key} ({status[key].length})
            </div>
          );
        }
        return null;
      });
    }
    return (
      <div style={{ ...styles.statusTag, backgroundColor: '#2ECA9C' }}>
        nothing to commit
      </div>
    );
  };

  renderBody = () => {
    if (this.state.loading) {
      return <div>Loading</div>;
    }
    const { status } = this.state;
    const { projects } = this.props;
    const { currentProject } = projects;

    if (this.state.isRepo) {
      return (
        <div>
          <div style={styles.item}>
            <div style={styles.itemTitle}>Repo 地址:</div>
            <div style={styles.itemContent}>
              {(this.state.originRemote.refs &&
                this.state.originRemote.refs.push) ||
                '未设置'}
            </div>
          </div>
          <div style={styles.item}>
            <div style={styles.itemTitle}>当前分支:</div>
            <div style={styles.itemContent}>{this.state.currentBranch}</div>
          </div>
          <div style={styles.item}>
            <div style={styles.itemTitle}>文件状态:</div>
            <div style={styles.itemContent}>
              <div style={styles.statusWrapper}>{this.renderFilesStatus()}</div>
            </div>
          </div>
          <div
            style={{
              paddingTop: 5,
              marginTop: 5,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              borderTop: '1px solid #f4f4f4',
            }}
          >
            <Button.Group>
              <Button
                disabled={status && status.files && status.files.length == 0}
                size="small"
                onClick={this.handleGitcommitOpen}
              >
                Git commit
              </Button>
              <Button
                loading={this.state.pushLoading}
                size="small"
                onClick={this.handleGitpush}
              >
                Git push
              </Button>
            </Button.Group>
          </div>
          <div
            style={{
              paddingTop: 5,
              marginTop: 5,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              borderTop: '1px solid #f4f4f4',
            }}
          >
            <Button.Group>
              <Button
                size="small"
                type="secondary"
                onClick={this.handlePublishToDaily}
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
    return <EmptyTips>当前项目不是一个 Git 仓库</EmptyTips>;
  };

  render() {
    return (
      <DashboardCard>
        <DashboardCard.Header>
          <div>DEF 前端发布</div>
          <div>
            <ExtraButton
              style={{ color: '#3080FE' }}
              placement={'top'}
              tipText={'刷新'}
              onClick={this.handleReload}
            >
              <Icon type="reload" style={{ fontSize: 18 }} />
            </ExtraButton>
          </div>
        </DashboardCard.Header>
        <DashboardCard.Body>
          {this.renderBody()}
          <Dialog
            visible={this.state.commitVisible}
            title="Commit 信息"
            onClose={this.handleGitcommitClose}
            footer={
              <div>
                <Button
                  disabled={this.state.commitMessage.length == 0}
                  onClick={this.handleGitcommitOk}
                  type="primary"
                >
                  确定
                </Button>
                <Button onClick={this.handleGitcommitClose}>取消</Button>
              </div>
            }
          >
            <Input
              onChange={this.handleGitcommitMessage}
              placeholder="请输入 git commit 信息"
              multiple
              style={{ width: 400 }}
            />
          </Dialog>
        </DashboardCard.Body>
      </DashboardCard>
    );
  }
}

const styles = {
  statusTag: {
    padding: '2px 4px',
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
  },
  itemContent: {
    flex: '1 1 auto',
    padding: 4,
    boxSizing: 'border-box',
  },
};

export default Def;
