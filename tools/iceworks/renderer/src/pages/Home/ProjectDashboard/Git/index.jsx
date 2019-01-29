import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { Step, Button, Input, Field, Checkbox } from '@icedesign/base';
import { ipcRenderer } from 'electron';
import Notification from '@icedesign/notification';

import DashboardCard from '../../../../components/DashboardCard';
import EmptyTips from '../../../../components/EmptyTips';
import ExtraButton from '../../../../components/ExtraButton';
import Icon from '../../../../components/Icon';

import DialogAddRepo from './components/DialogAddRepo';

const { Group: ButtonGroup } = Button;
const { Group: CheckboxGroup } = Checkbox;

const steps = ["Git init", "关联仓库"];

@inject('projects', 'git')
@observer
export default class GitPanel extends Component {
  static extensionName = 'git';

  constructor(props) {
    super(props);
    this.field = new Field(this);
    this.state = {
      // remoteAddVisible: false, // 控制添加 Repo 弹窗显示
      // remoteUrlInput: '',
      // gitRemoteAdding: false // 关联仓库
    };

    // 初始化gitTools
    this.init();
  }
  async componentWillMount() {
    const { git, projects } = this.props;

    await git.checkIsRepo();
  }

  componentDidMount() {
    const { git, projects } = this.props;

    ipcRenderer.on('focus', this.handleReload);
    projects.on('change', this.handleReload);
  }

  componentWillUnmount() {
    const { git, projects } = this.props;

    ipcRenderer.removeListener('focus', this.handleReload);
    projects.removeListener('change', this.handleReload);
  }

  init() {
    const { git } = this.props;
    git.initTools();
  }

  handleGitInit = async () => {
    const { git } = this.props;
    const initDone = await git.init();
    if (initDone) {
      this.handleReload();
    }
  };

  handleReload = async () => {
    const { git } = this.props;
    await git.checkIsRepo();
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
        <EmptyTips style={{minHeight: 90}}>当前项目不是一个 Git 仓库，请点击 Git init 开始初始化</EmptyTips>
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

  // handleGitRemoteAddOpen = () => {
  //   this.setState({ 
  //     remoteAddVisible: true,
  //   });
  // };

  // handleGitRemoteAddClose = () => {
  //   this.setState({ remoteAddVisible: false });
  // }

  // handleGitRemoteAddOk = async (value) => {
  //   const { git } = this.props;

  //   this.setState({ 
  //     gitRemoteAdding: true,
  //   }, async () => {
  //     try {
  //       let originRemote = await git.getOriginRemote();
  //       if (originRemote.length > 0 ) {
  //         await git.removeRemote();
  //       }
  //       await git.addRemote(value);
  //       this.setState({
  //         gitRemoteAdding: false,
  //         remoteAddVisible: false,
  //       }, () => {
  //         this.handleReload();
  //         git.gitFormReset();
  //       });

  //     } catch (error) {
  //       this.setState({ 
  //         gitRemoteAdding: false 
  //       }, git.gitFormReset );
  //     }
  //   });
  // }

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
    const { remoteAddVisible } = this.state;
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
              style={{ width: 350, marginLeft: 10 }}
              {...init("remoteUrlInput", {
                rules: {
                  validator: this.checkGitRepo,
                }
              })}
            />
            <br />
            {this.field.getError("remoteUrlInput") ? (
              <span style={{ 
                color: '#fa7070',
                fontSize: 12,
                display: 'inline-block',
                margin: '5px 0 0 10px'
              }}>
                {this.field.getError("remoteUrlInput").join(",")}
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
    this.field.validate(async (errors, values) => {
      if (errors) return;
      const { remoteUrlInput } = values;
      const addDone = await git.addRemote(remoteUrlInput);
      if (addDone) {
        git.checkIsRepo();
      }
    });
  }

  onFilesChange = (selectedFiles) => {
    console.log('selectedFiles: ', selectedFiles);
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

  handleGitCommit = async () => {
    const { git = {} } = this.props;
    console.log('selectedFiles: ', git.selectedFiles);
    console.log('commitMsg: ', git.commitMsg);
    const commitDone = await git.addAndCommit();
    if (commitDone) {
      Notification.success({
        message: 'Git 提交成功',
        duration: 8,
      });
      await git.checkIsRepo();
    }
  }

  getFiles = () => {
    const { git = {} } = this.props;
    const statusMap = [
      ['conflicted', '#FA7070'],
      ['not_added', '#2ECA9C'],
      ['modified', '#FCDA52'],
      ['created', '#5485F7'],
      ['deleted', '#999999'],
      ['renamed', '#FA7070'],
    ];
    let dataSource = [];

    if (git.status && git.status.files && git.status.files.length > 0) {
      statusMap.forEach(([key, color]) => {
        const files = git.status[key];
        if (Array.isArray(files) && files.length > 0) {
          const statusLabel = (
            <span
              key={key}
              style={{ ...styles.statusTag, backgroundColor: color }}
            >
              {key}
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

  render() {
    const { git } = this.props;
    const { currentStep } = git;

    return (
      <DashboardCard>
        <DashboardCard.Header>
          <div>
            Git
            <span style={{ paddingLeft: 10, fontSize: 12, color: '#666' }}>
              （{git.currentBranch}）
            </span>
          </div>
          <div>
            <ExtraButton
              style={{ color: '#3080FE' }}
              placement={'top'}
              tipText={'修改仓库地址/分支'}
              onClick={this.serachPages}
            >
              <Icon type="edit" style={{ fontSize: 18 }} />
            </ExtraButton>
            <ExtraButton
              style={{ color: '#3080FE' }}
              placement={'top'}
              tipText={'Pull'}
              onClick={this.serachPages}
            >
              <Icon type="down-arrow" style={{ fontSize: 18 }} />
            </ExtraButton>
            <ExtraButton
              style={{ color: '#3080FE' }}
              placement={'top'}
              tipText={'Push'}
              onClick={this.handleCreatePage}
            >
              <Icon type="up-arrow" style={{ fontSize: 18 }} />
            </ExtraButton>
            <ExtraButton
              style={{ color: '#3080FE' }}
              placement={'top'}
              tipText={'刷新'}
              onClick={this.handleCreatePage}
            >
              <Icon type="reload" style={{ fontSize: 18 }} />
            </ExtraButton>
          </div>
        </DashboardCard.Header>
        <DashboardCard.Body>
          {
            git.loading ? (
              <div>Loading</div>
            ) : git.showMainPanel ? (
              // 主面板
              this.renderMainPanel()
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
        </DashboardCard.Body>
      </DashboardCard>
    );
  }
}

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
