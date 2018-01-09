'use strict';

import React, { Component } from 'react';
import { Dialog, Button } from '@icedesign/base';
import IceCard from '@icedesign/card';
import './ConfirmDialog.scss';

export default class ConfirmDialog extends Component {
  static displayName = 'ConfirmDialog';

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  showDialog = () => {
    this.setState({
      visible: true,
    });
  };
  hideDialog = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <IceCard>
        <Dialog
          className="confirm-dialog"
          style={styles.dialog}
          autoFocus={false}
          footerAlign="center"
          title="删除提示"
          onOk={this.hideDialog}
          onCancel={this.hideDialog}
          onClose={this.hideDialog}
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
        <Button type="primary" onClick={this.showDialog}>显示 Dialog</Button>
      </IceCard>
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
