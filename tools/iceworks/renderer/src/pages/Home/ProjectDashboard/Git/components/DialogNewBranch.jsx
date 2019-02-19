import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Dialog, Input, Field } from '@icedesign/base';
import { inject, observer } from 'mobx-react';

@inject('git')
@observer
export default class DialogNewBranch extends Component {

  constructor(props) {
    super(props);
    this.field = new Field(this);
  }

  closeDialogNewBranch = () => {
    const { git } = this.props;
    git.visibleDialogNewBranch = false;
    git.gitFormReset()
    this.field.reset();
  };

  handleGitNewBranchOk = () => {
    const { git } = this.props;
    this.field.validate(async (errors, values) => {
      if (errors) return;
      const { newBranch } = values;
      const newBranchDone = await git.newBranch(newBranch);

      if (newBranchDone) {
        git.visibleDialogNewBranch = false;
        await git.checkIsRepo();
        git.gitFormReset();
      } else {
        git.visibleDialogNewBranch = false;
        git.gitFormReset();
      }
    });
  };

  // 检测分支是否合法
  checkNewBranch = (rule, value, callback) => {
    if (value) {
      callback();
    } else {
      callback("请输入分支名称");
    }
  };

  render() {
    const { git } = this.props;
    const { init } = this.field;

    return (
      <Dialog
        visible={git.visibleDialogNewBranch}
        title="新建分支"
        onClose={this.closeDialogNewBranch}
        footer={
          <div>
            <Button
              onClick={this.handleGitNewBranchOk}
              type="primary"
            >
              确定
            </Button>
            <Button onClick={this.closeDialogNewBranch}>取消</Button>
          </div>
        }
      >
        <div style={styles.item}>
          <div style={styles.itemTitle}>新分支名：</div>
          <div style={{
            height: 48,
            position: 'relative',
            top: 11,
          }}>
            <Input
              placeholder="请输入分支名称"
              style={{ width: 350, marginLeft: 10 }}
              {...init('newBranch', {
                rules: {
                  validator: this.checkNewBranch,
                }
              })}
            />
            <br />
            {this.field.getError('newBranch') ? (
              <span style={{ 
                color: '#fa7070',
                fontSize: 12,
                display: 'inline-block',
                margin: '5px 0 0 10px'
              }}>
                {this.field.getError('newBranch').join(",")}
              </span>
            ) : (
              ""
            )}
          </div>
        </div>
      </Dialog>
    );
  }
}

const styles = {
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
};
