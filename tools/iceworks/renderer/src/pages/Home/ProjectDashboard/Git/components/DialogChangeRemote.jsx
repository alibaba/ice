import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Dialog, Input, Field } from '@icedesign/base';
import { inject, observer } from 'mobx-react';
import Notification from '@icedesign/notification';

@inject('git')
@observer
export default class DialogChangeRemote extends Component {

  constructor(props) {
    super(props);
    this.field = new Field(this);
  }

  componentWillMount() {
    const { git = {} } = this.props;
    if (git.remoteUrl) {
      this.field.setValue('remoteUrlInput', git.remoteUrl);
    } else {
      this.field.setValue('remoteUrlInput', '');
    }
  }

  handleAddRemote = () => {
    const { git = {} } = this.props;
    this.field.validate(async (errors, values) => {
      if (errors) return;
      const { remoteUrlInput } = values;
      if (remoteUrlInput === git.remoteUrl) {
        git.visibleDialogChangeRemote = false;
        return;
      }
      git.removeAndAddRemoting = true;
      const originRemote = await git.getOriginRemote();
      if (originRemote.length > 0 ) {
        await git.removeRemote();
      }
      const addDone = await git.addRemote(remoteUrlInput);
      if (addDone) {
        await git.checkIsRepo();
      }
      Notification.success({
        message: '仓库地址修改成功',
        duration: 8,
      });
      git.removeAndAddRemoting = false;
      git.visibleDialogChangeRemote = false;
    });
  }
  
  closeDialogChangeRemote = () => {
    const { git } = this.props;
    git.visibleDialogChangeRemote = false;
    this.field.reset();
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

  render() {
    const { git } = this.props;
    const { init } = this.field;

    return (
      <Dialog
        visible={git.visibleDialogChangeRemote}
        title="修改仓库地址"
        onClose={this.closeDialogChangeRemote}
        footer={
          <div>
            <Button
              type="primary"
              onClick={this.handleAddRemote}
              loading={git.removeAndAddRemoting}
            >
              确定
            </Button>
            <Button onClick={this.closeDialogChangeRemote}>取消</Button>
          </div> 
        }
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
              {...init('remoteUrlInput', {
                rules: {
                  validator: this.checkGitRepo,
                }
              })}
            />
            <br />
            {this.field.getError('remoteUrlInput') ? (
              <span style={{ 
                color: '#fa7070',
                fontSize: 12,
                display: 'inline-block',
                margin: '5px 0 0 10px'
              }}>
                {this.field.getError('remoteUrlInput').join(",")}
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