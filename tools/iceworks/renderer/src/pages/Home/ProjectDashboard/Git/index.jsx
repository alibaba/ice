import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { 
  Step, Button, Input, Field, 
  Checkbox, Dialog, CascaderSelect, Dropdown,
  Menu, Loading, Feedback
} from '@icedesign/base';
import { ipcRenderer } from 'electron';
import Notification from '@icedesign/notification';

import DashboardCard from '../../../../components/DashboardCard';
import EmptyTips from '../../../../components/EmptyTips';
import ExtraButton from '../../../../components/ExtraButton';
import Icon from '../../../../components/Icon';

import DialogBranches from './components/DialogBranches';
import DialogNewBranch from './components/DialogNewBranch';
import DialogChangeRemote from './components/DialogChangeRemote';
import PluginHoc from '../PluginHoc';

const { Group: ButtonGroup } = Button;
const { Group: CheckboxGroup } = Checkbox;

const steps = ["Git init", "关联仓库"];

@inject('projects', 'git')
@observer
class GitPanel extends Component {
  static extensionName = 'git';
  static displayName = 'Git';

  constructor(props) {
    super(props);
    this.field = new Field(this);
    // 初始化gitTools
    this.init();
  }

  init() {
    const { git } = this.props;
    git.initTools();
  }

  componentDidMount() {
    const { git, projects } = this.props;
    try {
      git.checkIsRepo();
      // ipcRenderer.on('focus', this.handleReload);
      projects.on('change', this.onProjectChange);
    } catch (error) {
      let errMsg = (error && error.message) || '仓库地址错误';
      if (error && error.message && error.message.includes('ENOENT')) {
        errMsg = 'git 插件在当前项目不可用，请在插件设置中关闭，使用其他方式操作git。不可用原因可能为：项目读写权限问题，或者 simple-git 包在当前环境下不可用';
      }
      Dialog.alert({
        title: '提示',
        content: (
          <div style={{ width: 400 }}>
            {errMsg}
          </div>
        )
      });
    }
  }

  componentWillUnmount() {
    const { git, projects } = this.props;

    // ipcRenderer.removeListener('focus', this.handleReload);
    projects.removeListener('change', this.onProjectChange);
  }

  componentWillReceiveProps() {
    this.init();
  }

  onProjectChange = () => {
    const { git } = this.props;
    this.field.reset();
    git.reset();
    this.handleReload(true);
  }

  handleGitInit = () => {
    const { git } = this.props;
    const initDone = git.init();
    if (initDone) {
      this.handleReload(true);
    }
  };

  handleReload = (showLoading = false) => {
    const { git } = this.props;
    if (showLoading) {
      git.reloading = true;
    }
    git.checkIsRepo();
    git.reloading = false;
  };

  renderStep0 = () => {
    const { git } = this.props;
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <EmptyTips style={{minHeight: 90}}>该项目不是一个 Git 仓库，请点击 Git init 开始配置</EmptyTips>
        <Button
          type="secondary"
          onClick={this.handleGitInit}
          loading={git.gitIniting}
        >
          Git init
        </Button>
      </div>
    )
  }

  checkGitRepo(rule, value, callback) {
    if (/^git@.+.git$/.test(value)) {
      callback();
    } else if (/^http.+.git$/.test(value)) {
      callback("请使用 SSH 协议地址，即以 git@ 开头的地址");
    } else {
      callback("请输入正确的 git 仓库地址");
    }
  }

  renderStep1 = () => {
    const { git } = this.props;
    const { init } = this.field;

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <div style={styles.item}>
          <div style={styles.itemTitle}>仓库地址:</div>
          <div style={{
            height: 48,
            position: 'relative',
            top: 11,
          }}>
            <Input
              placeholder="如：git@github.com:alibaba/ice.git"
              style={{ marginLeft: 10, width: 240 }}
              {...init('remoteUrl', {
                rules: {
                  validator: this.checkGitRepo,
                }
              })}
            />
            <br />
            {this.field.getError('remoteUrl') ? (
              <span style={{ 
                color: '#fa7070',
                fontSize: 12,
                display: 'inline-block',
                margin: '5px 0 0 10px'
              }}>
                {this.field.getError('remoteUrl').join(",")}
              </span>
            ) : (
              ""
            )}
          </div>
        </div>
        <Button
          type="secondary"
          onClick={this.handleAddRemote}
          loading={git.gitRemoteAdding}
        >
          关联仓库
        </Button>
      </div>
    )
  }

  handleAddRemote = () => {
    const { git = {} } = this.props;
    this.field.validate((errors, values) => {
      if (errors) return;
      const { remoteUrl } = values;
      if (remoteUrl === git.remoteUrl) {
        return;
      }
      const addDone = git.addRemote(remoteUrl);
      if (addDone) {
        this.handleReload(true);
      }
    });
  }

  onFilesChange = (selectedFiles) => {
    const { git = {} } = this.props;
    git.selectedFiles = selectedFiles;
  }

  checkAllFiles = () => {
    const { git = {} } = this.props;
    if (git.selectedFiles && git.selectedFiles.length === 0) {
      git.selectedFiles = git.unstagedFiles.slice();
    } else {
      git.selectedFiles = [];
    }
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

  handleGitCommit = () => {
    const { git = {} } = this.props;
    const user = this.getUserInfo();
    const commitDone = git.addAndCommit();
    if (commitDone) {
      Notification.success({
        message: 'Git 提交成功',
        duration: 8,
      });
      this.handleReload(true);
    }
  }

  getFiles = () => {
    const { git = {} } = this.props;
    const statusMap = [
      ['conflicted', '#FA7070', '冲突'],
      ['not_added', '#2ECA9C', '未添加'],
      ['modified', '#FCDA52', '已变更'],
      ['created', '#5485F7', '新创建'],
      ['deleted', '#999999', '已删除'],
      ['renamed', '#FA7070', '重命名'],
    ];
    let dataSource = [];

    if (git.status && git.status.files && git.status.files.length > 0) {
      statusMap.forEach(([key, color, cn]) => {
        const files = git.status[key];
        if (Array.isArray(files) && files.length > 0) {
          const statusLabel = (
            <span
              key={key}
              style={{ ...styles.statusTag, backgroundColor: color }}
            >
              {cn}
            </span>
          )
          dataSource = dataSource.concat(files.map( (file, index) => {
            return (
              <div key={index} style={styles.fileItem}>
                <Checkbox value={file}>
                  {statusLabel}
                  <span>{file}</span>
                </Checkbox>
              </div>
            )
          }))
        }
      });
    }
    return dataSource;
  }

  setCommitMsg = (value) => {
    const { git = {} } = this.props;
    git.commitMsg = value;
  }

  renderMainPanel = () => {
    const { git = {} } = this.props;
    const dataSource = this.getFiles();
    return (
      <div style={styles.mainPanel}>
        <div style={styles.topContainer}>
          <div style={styles.filesTitle}>
            <span>
              变更文件
              <span style={{ paddingLeft: 10, fontSize: 12, color: '#666' }}>
                ({git.unstagedFiles.length})
              </span>
            </span>
            <ExtraButton
              onClick={this.checkAllFiles}
            >
              {/* <Icon type="good" /> */}
              全选
            </ExtraButton>
          </div>
          <div style={styles.filesContent}>
            <CheckboxGroup value={git.selectedFiles} onChange={this.onFilesChange}>
              {
                dataSource.map( item => {
                  return item;
                }) 
              }
            </CheckboxGroup>
          </div>
        </div>
        <div style={styles.bottomContainer}>
          <Input
            onChange={this.setCommitMsg}
            value={git.commitMsg}
            placeholder="提交信息"
            style={{ flexGrow: 2, display: 'flex', height: 28, borderRadius: 0 }}
          />
          <Button
            type="primary"
            disabled={git.selectedFiles.length === 0 || !git.commitMsg}
            onClick={this.handleGitCommit}
            loading={git.gitCommiting}
            style={{ width: 120, borderRadius: 0, position: 'relative', left: '-1px' }}
          >
            { git.unstagedFiles.length === 0 && '提交' }
            { git.unstagedFiles.length !== 0 && git.selectedFiles.length === 0 && '选择文件提交' }
            { git.selectedFiles.length !== 0 && !git.commitMsg && '输入信息提交' }
            { git.selectedFiles.length !== 0 && git.commitMsg && '提交' }
          </Button>
        </div>
      </div>
    );
  }

  handleChangeRemote = () => {
    const { git } = this.props;
    git.visibleDialogChangeRemote = true;
  }

  handleGitNewBranchOpen = () => {
    const { git } = this.props;
    if (git.remoteUrl) {
      git.visibleDialogNewBranch = true;
    } else {
      Feedback.toast.error('当前项目未设置仓库地址');
    }
  };

  handleGitBranchesOpen = () => {
    const { git } = this.props;
    if (!git.remoteUrl) {
      Feedback.toast.error('当前项目未设置 git remote 地址');
      return;
    }
    git.getBranches();
  };

  handlePull = () => {
    const { git } = this.props;
    const pullDone = git.pull();
    if (pullDone) {
      Notification.success({
        message: 'Git 拉取当前分支最新代码成功',
        duration: 8,
      });
    }
  }

  handlePush = () => {
    const { git } = this.props;
    const pushDone = git.push();
    if (pushDone) {
      Notification.success({
        message: 'Git 推送当前分支本地代码成功',
        duration: 8,
      });
    }
  }

  render() {
    const { git } = this.props;
    const { currentStep } = git;

    const menu = (
      <Menu>
        <Menu.Item
          onClick={this.handleGitNewBranchOpen}
        >新建分支</Menu.Item>
        <Menu.Item
          onClick={this.handleGitBranchesOpen}
        >切换分支</Menu.Item>
      </Menu>
    );

    return (
      
      <DashboardCard >
        <Loading visible={git.reloading} style={{width: '100%', height: '100%'}} shape="fusion-reactor">
          <DashboardCard.Header>
            <div>
              Git
              {
                git.showMainPanel && (
                  <span style={{ paddingLeft: 10, fontSize: 12, color: '#666' }}>
                    （{git.currentBranch}）
                  </span>
                )
              }
            </div>
            {
              git.showMainPanel && (
                <div>
                  <ExtraButton
                    style={{ color: '#3080FE' }}
                    placement={'top'}
                    tipText={'变更分支'}
                    onClick={this.handlePull}
                  >
                    <Dropdown
                      trigger={
                        <a style={{zIndex: 2}}>
                          <Icon type="git" style={{fontSize: 16}} />
                        </a>
                      }
                      align="tr br"
                      triggerType="click"
                    >
                      {menu}
                    </Dropdown>
                  </ExtraButton>
                  <ExtraButton
                    style={{ color: '#3080FE' }}
                    placement={'top'}
                    tipText={'Pull'}
                    onClick={this.handlePull}
                  >
                    <Icon type="down-arrow" style={{ fontSize: 18 }} />
                  </ExtraButton>
                  <ExtraButton
                    style={{ color: '#3080FE' }}
                    placement={'top'}
                    tipText={'Push'}
                    onClick={this.handlePush}
                  >
                    <Icon type="up-arrow" style={{ fontSize: 18 }} />
                  </ExtraButton>
                  <ExtraButton
                    style={{ color: '#3080FE' }}
                    placement={'top'}
                    tipText={'修改仓库地址'}
                    onClick={this.handleChangeRemote}
                  >
                    <Icon type="edit" style={{ fontSize: 18 }} />
                  </ExtraButton>
                  <ExtraButton
                    style={{ color: '#3080FE' }}
                    placement={'top'}
                    tipText={'刷新'}
                    onClick={() => {
                      this.handleReload(true);
                    }}
                  >
                    <Icon type="reload" style={{ fontSize: 18 }} />
                  </ExtraButton>
                </div>
              )
            }
          </DashboardCard.Header>
          <DashboardCard.Body>
            {
              git.loading ? (
                <div>Loading</div>
              ) : git.showMainPanel ? (
                // git.unstagedFiles.length === 0 ? (
                //   <div
                //     style={{
                //       display: 'flex',
                //       flexDirection: 'column',
                //       alignItems: 'center'
                //     }}
                //   >
                //     <EmptyTips>暂无变更文件</EmptyTips>
                //   </div>
                // ) : (
                  // 主面板
                  this.renderMainPanel()
                // )
              ) : (
                // 初始化引导
                <div>
                  <Step current={currentStep} shape="circle">
                    {
                      steps.map( (item, index) => {
                        return <Step.Item key={index} title={item} />
                      })
                    }
                  </Step>
                  { currentStep === 0 && this.renderStep0() }
                  { currentStep === 1 && this.renderStep1() }
                </div>
              )
            }
            {
              git.visibleDialogChangeRemote && (
                <DialogChangeRemote />
              )
            }
            <DialogNewBranch />
            <DialogBranches />
          </DashboardCard.Body>
        </Loading>
      </DashboardCard>
    );
  }
}

// export default GitPanel;
export default PluginHoc(GitPanel);

const styles = {
  statusTag: {
    padding: '3px 4px',
    color: '#fff',
    fontSize: 10,
    borderRadius: 2,
    marginRight: 5,
    display: 'inline-block',
    position: 'relative',
    top: '-1px'
  },
  item: {
    flex: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    minHeight: 90,
  },
  itemTitle: {
    width: 80,
    flex: '0 0 80px',
    padding: 4,
    textAlign: 'right',
    boxSizing: 'border-box',
    lineHeight: '20px',
  },
  mainPanel: {
    display: 'flex',
    flexDirection: 'column',
    height: '215px',
  },
  topContainer: {
    flexGrow: 2,
    display: 'flex',
    flexDirection: 'column',
    height: 187,
  },
  bottomContainer: {
    height: 28,
    display: 'flex',
  },
  filesTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    height: 22
  },
  filesContent: {
    flexGrow: 2,
    background: '#f5f2f0',
    overflow: 'auto',
    marginBottom: 10,
    height: 155,
    padding: '5px'
  },
  files: {
    display: 'flex',
    flexDirection: 'column',
    padding: '4px 5px 0'
  },
  fileItem: {
    paddingBottom: 4
  }
};
