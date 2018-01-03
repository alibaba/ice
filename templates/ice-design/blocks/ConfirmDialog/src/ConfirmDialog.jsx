'use strict';

import React, { Component } from 'react';
import { Dialog } from '@icedesign/base';
import './ConfirmDialog.scss';

import CreateFuncDialog from './CreateFuncDialog';

class ConfirmDialog extends Component {
  static displayName = 'ConfirmDialog';

  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible
    };
  }

  render() {
    return (
      <Dialog
        className="confirm-dialog"
        style={styles.dialog}
        autoFocus={false}
        footerAlign="center"
        title="删除提示"
        {...this.props}
        visible={this.state.visible}
      >
        <div style={styles.dialogContent}>
          <img
            style={styles.icon}
            src="//img.alicdn.com/tfs/TB1PTrfb_nI8KJjy0FfXXcdoVXa-52-52.png"
            srcSet="//img.alicdn.com/tfs/TB1c5feb46I8KJjy0FgXXXXzVXa-104-104.png"
          />
          <p style={styles.text}>
            {this.props.text ? this.props.text : '你确定要删除此条内容吗？'}
          </p>
        </div>
      </Dialog>
    );
  }
}

const styles = {
  dialog: { width: '640px' },
  icon: {
    width: '52px',
    height: '52px',
    marginTop: '26px',
    marginBottom: '10px'
  },
  dialogContent: {
    height: '160px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  text: { fontSize: '16px;' }
};

export default CreateFuncDialog(ConfirmDialog);
