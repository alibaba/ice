import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dialog, Button } from '@icedesign/base';
import { Form as ScaffoldForm, ScaffoldHoc } from '../Scaffold';
import { inject, observer } from 'mobx-react';

@inject('scaffold')
@observer
class CreateProjectDialog extends Component {
  static displayName = 'CreateProjectDialog';

  static propTypes = {
    scaffold: PropTypes.object.isRequired,
    handleGeneratorProject: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
  };

  static defaultProps = {};

  render() {
    return (
      <Dialog
        title="创建项目"
        autoFocus={true}
        className="poject-config-dialog"
        footerAlign="center"
        onClose={this.props.handleClose}
        footer={
          <div className="project-config-footer">
            <Button
              onClick={this.props.handleGeneratorProject}
              disabled={this.props.scaffold.isDisabled}
              type="primary"
            >
              {this.props.scaffold.isCreating ? '正在创建项目' : '开始创建项目'}
            </Button>
            <Button
              disabled={
                this.props.scaffold.isCreating &&
                this.props.scaffold.progress <= 0
              }
              onClick={this.props.handleClose}
            >
              取消
            </Button>
          </div>
        }
        visible={this.props.scaffold.visible}
      >
        <ScaffoldForm />
      </Dialog>
    );
  }
}

export default ScaffoldHoc(CreateProjectDialog);
