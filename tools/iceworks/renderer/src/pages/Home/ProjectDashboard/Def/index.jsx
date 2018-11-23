import { Button, Feedback, Dialog, Input, CascaderSelect } from '@icedesign/base';
import { EventEmitter } from 'events';
import { inject, observer } from 'mobx-react';
import { ipcRenderer, remote, shell } from 'electron';
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
      isGit: false,
      isRepo: false,
      remote: {},
      currentBranch: '',
      status: {},
      gitIniting: false,
      remoteAddVisible: false,
      remoteUrl: '',
      gitRemoteAdding: false,
      branchesVisible: false,
      branches: [],
      checkoutBranch: '',
      branchOrigin: '',
      branchType: '',
      newBranchVisible: false,
      newBranch: '',
      defPublishing: false,
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
            isGit,
            isRepo,
            loading: false,
            originRemote: originRemote[0] || {},
            currentBranch: branches.current,
            status,
          });
        } else {
          this.setState({
            isGit,
            isRepo,
            loading: false,
            originRemote: {},
            currentBranch: {},
            status: {},
          });
        }
      })
      .catch((err) => {
        console.error('gitCheckIsRepo', err);
        this.setState({ isGit: false, loading: false });
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
    if (!this.state.originRemote.refs) {
      Feedback.toast.error('当前项目未设置 git remote 地址');
      return;
    }
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
            Feedback.toast.show({
              type: 'success',
              content: 'commit 成功，请确认文件状态更新后再进行其他操作',
              duration: 5000
            });
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
    if (!this.state.originRemote.refs) {
      Feedback.toast.error('当前项目未设置 git remote 地址');
      return;
    }
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

  handleGitInit = () => {
    this.setState({
      gitIniting: true
    });
    this.git()
      .init()
      .then(() => {
        this.setState(
          { gitIniting: false },
          this.handleReload
        );
      })
      .catch((err) => {
        Dialog.alert({
          title: '提示',
          content: (
            <div style={{ width: 400 }}>
              {(err && err.message) || 'git init 失败请重试'}
            </div>
          ),
        });
        this.setState({ gitIniting: false });
      });
  };

  gitFormReset = () => {
    this.setState({
      remoteUrl: '',
      branches: [],
      checkoutBranch: '',
      branchOrigin: '',
      branchType: '',
      newBranch: '',
    })
  };

  handleGitRemoteAddOpen = () => {
    this.setState({ remoteAddVisible: true });
  };

  handleGitRemoteAddClose = () => {
    this.setState(
      { remoteAddVisible: false },
      this.gitFormReset
    );
  };

  handleGitRemoteUrl = (value) => {
    this.setState({ remoteUrl: value });
  };

  handleGitRemoteAddOk = () => {
    this.setState({ gitRemoteAdding: true });
    if (this.state.originRemote.refs && this.state.originRemote.refs.push) {
      this.git()
        .removeRemote('origin')
        .then(this.addRemote)
        .catch((err) => {
          Dialog.alert({
            title: '提示',
            content: (
              <div style={{ width: 400 }}>
                {(err && err.message) || 'git remote remove 失败请重试'}
              </div>
            ),
          });
          this.setState(
            { gitRemoteAdding: false },
            this.gitFormReset
          );
        })
    } else {
      this.addRemote()
    }
  };

  addRemote = () => {
    this.git()
      .addRemote('origin', this.state.remoteUrl)
      .then(() => {
        this.setState({
          gitRemoteAdding: false,
          remoteAddVisible: false,
        }, this.handleReload);
        this.gitFormReset();
      })
      .catch((err) => {
        Dialog.alert({
          title: '提示',
          content: (
            <div style={{ width: 400 }}>
              {(err && err.message) || 'git remote add 失败请重试'}
            </div>
          ),
        });
        this.setState(
          { gitRemoteAdding: false },
          this.gitFormReset
        );
      })
  };

  handleGitBranchesOpen = () => {
    if (!this.state.originRemote.refs) {
      Feedback.toast.error('当前项目未设置 git remote 地址');
      return;
    }

    Feedback.toast.show({
      type: "loading",
      content: "Git fetching",
    });
    this.git()
      .fetch()
      .then(() => {
        this.git()
          .branch(['--remotes', '--list', '-v'])
          .then(originBranches => {
            this.git()
              .branchLocal()
              .then(localBranches => {
                const local = localBranches.all.map((value) => {
                  return { label: value, value };
                });
                const origin = originBranches.all.map((value) => {
                  return { label: value, value };
                });
                const branches = [];
                if (local.length > 0) {
                  branches.push({
                    label: 'local',
                    value: 'local',
                    children: local,
                  });
                }
                if (origin.length > 0) {
                  branches.push({
                    label: 'origin',
                    value: 'origin',
                    children: origin,
                  });
                }
                Feedback.toast.hide();
                if (branches.length === 0) {
                  Feedback.toast.error('本地和远程仓库均无分支，请先 push');
                  return;
                }
                this.setState({
                  branches,
                  branchesVisible: true
                });
              });
          })
          .catch((err) => {
            Dialog.alert({
              title: '提示',
              content: (
                <div style={{ width: 400 }}>
                  {(err && err.message) || 'git branch 失败请重试'}
                </div>
              ),
            });
            Feedback.toast.hide();
            this.setState({ branchesVisible: false });
          });
      })
      .catch((err) => {
        Dialog.alert({
          title: '提示',
          content: (
            <div style={{ width: 400 }}>
              {(err && err.message) || 'git fetch 失败请重试'}
            </div>
          ),
        });
        this.setState({ branchesVisible: false });
      })
  };

  handleGitBranchesClose = () => {
    this.setState(
      { branchesVisible: false },
      this.gitFormReset
    );
  };

  handleSelectBranch = (value, data, extra) => {
    if (extra.selectedPath[0].label === 'local') {
      this.setState({
        branchOrigin: value,
        checkoutBranch: value,
        branchType: 'local'
      })
    } else {
      this.setState({
        branchOrigin: value,
        checkoutBranch: '',
        branchType: 'origin'
      })
    }
  };

  handleGitLocalBranch = (value) => {
    this.setState({ checkoutBranch: value });
  };

  handleGitBranchesOk = () => {
    const { branchOrigin, checkoutBranch, branchType } = this.state;
    if (branchOrigin === checkoutBranch && branchType === 'local') {
      this.git()
        .checkout(checkoutBranch)
        .then(() => {
          this.setState(
            { branchesVisible: false },
            this.handleReload
          );
          this.gitFormReset();
        })
        .catch((err) => {
          Dialog.alert({
            title: '提示',
            content: (
              <div style={{ width: 400 }}>
                {(err && err.message) || 'git checkout 失败请重试'}
              </div>
            ),
          });
          this.setState(
            { branchesVisible: false },
            this.gitFormReset()
          );
        })
    } else {
      this.git()
        .checkoutBranch(checkoutBranch, branchOrigin)
        .then(() => {
          this.setState(
            { branchesVisible: false },
            this.handleReload
          );
          this.gitFormReset();
        })
        .catch((err) => {
          Dialog.alert({
            title: '提示',
            content: (
              <div style={{ width: 400 }}>
                {(err && err.message) || 'git checkout -b 失败请重试'}
              </div>
            ),
          });
          this.setState(
            { branchesVisible: false },
            this.gitFormReset
          );
        });
    }
  };

  displayBranch = (label) => {
    return label[1];
  };

  handleGitNewBranchOpen = () => {
    if (this.state.originRemote.refs) {
      this.setState({ newBranchVisible: true });
    } else {
      Feedback.toast.error('当前项目未设置 git remote 地址');
    }
  };

  handleGitNewBranchClose = () => {
    this.setState(
      { newBranchVisible: false },
      this.gitFormReset
    );
  };

  handleGitNewBranch = (value) => {
    this.setState({ newBranch: value });
  };

  handleGitNewBranchOk = () => {
    this.git()
      .checkoutLocalBranch(this.state.newBranch)
      .then(() => {
        this.setState(
          { newBranchVisible: false },
          this.handleReload
        );
        this.gitFormReset();
      })
      .catch((err) => {
        Dialog.alert({
          title: '提示',
          content: (
            <div style={{ width: 400 }}>
              {(err && err.message) || 'git checkout -b 失败请重试'}
            </div>
          ),
        });
        this.setState(
          { newBranchVisible: false },
          this.gitFormReset()
        );
      });
  };

  handleOpenDocument = () => {
    shell.openExternal(
      'http://def.alibaba-inc.com/doc/start/intro'
    );
  };

  cloudPublish = async (target) => {
    const { originRemote, currentBranch } = this.state;
    if (!currentBranch) {
      Feedback.toast.show({
        type: 'error',
        content: '请先建立 Git 远程分支再进行 DEF 发布',
        duration: 3000
      });
      return;
    }

    await this.setState({ defPublishing: true });
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
      this.setState({ defPublishing: false });
      return;
    }
    if (!/[^\/]+\/\d+\.\d+\.\d+/i.test(currentBranch)) {
      Feedback.toast.error(
        '云构建要求分支名为： prefix/x.y.z 格式，例如：daily/1.0.0'
      );
      this.setState({ defPublishing: false });
      return;
    }

    if (!(originRemote.refs && originRemote.refs.push)) {
      Feedback.toast.error('当前项目未设置 git remote 地址');
      this.setState({ defPublishing: false });
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
        this.setState({ defPublishing: false });
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
        this.setState({ defPublishing: false });
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

    if (this.state.isGit) {
      return (
        <div>
          <div style={styles.item}>
            <div style={styles.itemTitle}>Repo 地址:</div>
            {(this.state.originRemote.refs &&
              (
                <div style={{
                  ...styles.itemContent,
                  justifyContent: 'space-between'
                }}>
                  <p style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    margin: 0,
                  }}>
                    {this.state.originRemote.refs.push}
                  </p>
                  <div style={{ width: 24 }}>
                    <ExtraButton
                      style={{ color: '#3080FE' }}
                      placement={'top'}
                      tipText="修改仓库地址"
                      onClick={this.handleGitRemoteAddOpen}
                    >
                      <Icon type="edit" />
                    </ExtraButton>
                  </div>
                </div>
              )
            ) || (
              <div style={{
                ...styles.itemContent,
                justifyContent: 'space-between'
              }}>
                <div>未设置</div>
                <div style={{ width: 24 }}>
                  <ExtraButton
                    style={{ color: '#3080FE' }}
                    placement={'top'}
                    tipText="关联仓库"
                    onClick={this.handleGitRemoteAddOpen}
                  >
                    <Icon type="edit" />
                  </ExtraButton>
                </div>
              </div>
            )}
          </div>
          <div style={styles.item}>
            <div style={styles.itemTitle}>当前分支:</div>
            <div style={{
              ...styles.itemContent,
              justifyContent: 'space-between'
            }}>
              <p style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                margin: 0,
              }}>
                {this.state.currentBranch}
              </p>
              <div
                style={{
                  width: 48,
                  display: 'flex',
                  justifyContent: 'space-around'
                }}
              >
                <ExtraButton
                  style={{ color: '#3080FE' }}
                  placement={'top'}
                  tipText={'新建分支'}
                  onClick={this.handleGitNewBranchOpen}
                >
                  <Icon type="plus-o" />
                </ExtraButton>
                <ExtraButton
                  style={{ color: '#3080FE' }}
                  placement={'top'}
                  tipText="切换分支"
                  onClick={this.handleGitBranchesOpen}
                >
                  <Icon type="edit" />
                </ExtraButton>
              </div>
            </div>
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
        <EmptyTips>当前项目不是一个 Git 仓库</EmptyTips>
        <Button
          type="secondary"
          onClick={this.handleGitInit}
          loading={this.state.gitIniting}
        >
          Git init
        </Button>
      </div>
    );
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
              tipText={'DEF 文档'}
              onClick={this.handleOpenDocument}
            >
              <Icon type="help" style={{ fontSize: 18 }} />
            </ExtraButton>
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
          <Dialog
            visible={this.state.remoteAddVisible}
            title="Git remote add"
            onClose={this.handleGitRemoteAddClose}
            footer={
              <div>
                <Button
                  disabled={this.state.remoteUrl.length == 0}
                  onClick={this.handleGitRemoteAddOk}
                  type="primary"
                  loading={this.state.gitRemoteAdding}
                >
                  确定
                </Button>
                <Button onClick={this.handleGitRemoteAddClose}>取消</Button>
              </div>
            }
          >
            <Input
              onChange={this.handleGitRemoteUrl}
              placeholder="请输入 git 仓库 URL"
              value={this.state.remoteUrl}
              style={{ width: 400 }}
            />
          </Dialog>
          <Dialog
            visible={this.state.branchesVisible}
            title="Git Branches"
            onClose={this.handleGitBranchesClose}
            footer={
              <div>
                <Button
                  disabled={this.state.checkoutBranch.length == 0}
                  onClick={this.handleGitBranchesOk}
                  type="primary"
                >
                  确定
                </Button>
                <Button onClick={this.handleGitBranchesClose}>取消</Button>
              </div>
            }
          >
            <div style={{ lineHeight: '28px', height: 20 }}>
              <span style={{ margin: '0 8px'}}>Checkout</span>
              <CascaderSelect
                placeholder="选择分支"
                onChange={this.handleSelectBranch}
                dataSource={this.state.branches}
                style={{ verticalAlign: 'middle' }}
                displayRender={this.displayBranch}
              />
              <span style={{ margin: '0 8px'}}>as</span>
              <Input
                onChange={this.handleGitLocalBranch}
                placeholder="请输入本地分支名称"
                value={this.state.checkoutBranch}
                disabled={this.state.branchOrigin === ''}
              />
            </div>
          </Dialog>
          <Dialog
            visible={this.state.newBranchVisible}
            title="New Branch"
            onClose={this.handleGitNewBranchClose}
            footer={
              <div>
                <Button
                  disabled={this.state.newBranch.length == 0}
                  onClick={this.handleGitNewBranchOk}
                  type="primary"
                >
                  确定
                </Button>
                <Button onClick={this.handleGitNewBranchClose}>取消</Button>
              </div>
            }
          >
            <div style={{ lineHeight: '28px', height: 20 }}>
              <Input
                onChange={this.handleGitNewBranch}
                placeholder="请输入分支名称"
                value={this.state.newBranch}
                style={{ width: 400 }}
              />
            </div>
          </Dialog>
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
};

export default Def;
