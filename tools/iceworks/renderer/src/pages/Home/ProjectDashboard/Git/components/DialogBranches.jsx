import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Dialog, Input, CascaderSelect } from '@icedesign/base';
import { inject, observer } from 'mobx-react';

@inject('git')
@observer
export default class DialogBranches extends Component {

  closeDilogGitBranches = () => {
    const { git } = this.props;
    git.visibleDialogBranches = false;
    git.gitFormReset();
  }

  handleGitBranchesOk = async () => {
    const { git } = this.props;
    const { branchOrigin, checkoutBranch, branchType } = git;
    if (branchOrigin === checkoutBranch && branchType === 'local') {
      const checkoutDone = await git.checkout();
      if (checkoutDone) {
        git.checkIsRepo();
      }
      git.gitFormReset();
    } else {
      const checkoutDone = await git.checkoutLocalBranch();
      if (checkoutDone) {
        git.checkIsRepo();
      }
      git.gitFormReset();
    }
  };

  handleSelectBranch = (value, data, extra) => {
    const { git } = this.props;
    if (extra.selectedPath[0].label === 'local') {
      git.branchOrigin = value;
      git.checkoutBranch = value;
      git.branchType = 'origin';
    } else {
      git.branchOrigin = value;
      git.checkoutBranch = '';
      git.branchType = 'local';
    }
  };

  displayBranch = (label) => {
    return label[1];
  };

  handleGitLocalBranch = (value) => {
    const { git } = this.props;
    git.checkoutBranch = value
  };

  render() {
    const { git } = this.props;

    return (
      <Dialog
        visible={git.visibleDialogBranches}
        title="切换分支"
        onClose={this.closeDilogGitBranches}
        footer={
          <div>
            <Button
              disabled={git.checkoutBranch.length == 0}
              onClick={this.handleGitBranchesOk}
              type="primary"
            >
              确定
            </Button>
            <Button onClick={this.closeDilogGitBranches}>取消</Button>
          </div>
        }
      >
        <div style={{ lineHeight: '28px', height: 20 }}>
          <span style={{ margin: '0 8px'}}>Checkout</span>
          <CascaderSelect
            placeholder="选择分支"
            onChange={this.handleSelectBranch}
            dataSource={git.branchesCheckout}
            style={{ verticalAlign: 'middle' }}
            displayRender={this.displayBranch}
          />
          <span style={{ margin: '0 8px'}}>as</span>
          <Input
            onChange={this.handleGitLocalBranch}
            placeholder="请输入本地分支名称"
            value={git.checkoutBranch}
            disabled={git.branchOrigin === ''}
          />
        </div>
      </Dialog>
    );
  }
}
