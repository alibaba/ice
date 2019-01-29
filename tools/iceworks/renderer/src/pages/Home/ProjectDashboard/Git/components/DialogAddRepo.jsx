import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Feedback, Dialog, Input, CascaderSelect } from '@icedesign/base';

export default class DialogAddRepo extends Component {

  static propTypes = {
    visible: PropTypes.bool,
    remoteUrl: PropTypes.string,
    handleGitRemoteAddOk: PropTypes.func,
  };

  static defaultProps = {
    visible: false,
    remoteUrl: '',
    handleGitRemoteAddOk: () => {}
  };

  constructor(props) {
    super(props);
    this.state = {
      remoteUrlInput: props.remoteUrl
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      remoteUrlInput: nextProps.remoteUrl
    })
  }

  handleGitRemoteUrl = (value) => {
    this.setState({ remoteUrlInput: value });
  };

  handleGitRemoteAddOk = () => {
    this.props.handleGitRemoteAddOk(this.state.remoteUrlInput);
  }

  render() {
    const { visible, handleGitRemoteAddClose } = this.props;

    return (

      <Dialog
        visible={visible}
        title="Git remote add"
        onClose={handleGitRemoteAddClose}
        footer={
          <div>
            <Button
              disabled={this.state.remoteUrlInput.length == 0}
              onClick={this.handleGitRemoteAddOk}
              type="primary"
              loading={this.state.gitRemoteAdding}
            >
              确定
            </Button>
            <Button onClick={handleGitRemoteAddClose}>取消</Button>
          </div> 
        }
      >
        <Input
          onChange={this.handleGitRemoteUrl}
          placeholder="请输入 git 仓库 URL，如：git@github.com:alibaba/ice.git"
          value={this.state.remoteUrlInput}
          style={{ width: 400 }}
        />
      </Dialog>
    );
  }
}
