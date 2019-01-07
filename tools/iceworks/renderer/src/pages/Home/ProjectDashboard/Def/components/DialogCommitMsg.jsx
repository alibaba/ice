import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Feedback, Dialog, Input, CascaderSelect } from '@icedesign/base';

export default class DialogCommitMsg extends Component {
  static displayName = 'DialogCommitMsg';

  static propTypes = {
    commitVisible: PropTypes.bool,
    handleGitcommitClose: PropTypes.func,
    commitMessage: PropTypes.string,
    handleGitcommitOk: PropTypes.func,
    handleGitcommitMessage: PropTypes.func
  };

  static defaultProps = {
    commitVisible: false,
    handleGitcommitClose: () => {},
    handleGitcommitOk: () => {},
    handleGitcommitMessage: () => {},
    commitMessage: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      commitMessage: ''
    };
  }

  handleGitcommitMessage = (value) => {
    this.setState({
      commitMessage: value
    });
  }

  handleGitcommitOk = () => {
    this.props.handleGitcommitOk(this.state.commitMessage);
  }

  render() {
    const { commitVisible, handleGitcommitClose, handleGitcommitOk, handleGitcommitMessage } = this.props;
    const  { commitMessage } = this.state;
    return (
      <Dialog
        visible={commitVisible}
        title="Commit 信息"
        onClose={handleGitcommitClose}
        footer={
          <div>
            <Button
              disabled={commitMessage.length == 0}
              onClick={this.handleGitcommitOk}
              type="primary"
            >
              确定
            </Button>
            <Button onClick={handleGitcommitClose}>取消</Button>
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
    );
  }
}
