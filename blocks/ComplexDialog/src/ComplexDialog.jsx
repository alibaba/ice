'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dialog, Button, Icon } from '@icedesign/base';
import './ComplexDialog.scss';

import CreateFuncDialog from './CreateFuncDialog';

class ComplexDialog extends Component {
  static displayName = 'ComplexDialog';

  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible
    };
  }

  renderFooter = () => {
    return (
      <div style={styles.footer}>
        <Button onClick={this.props.onCancel}>稍后前往</Button>
        <Button onClick={this.props.onOk} type="primary">
          前往认证
        </Button>
      </div>
    );
  };

  render() {
    return (
      <Dialog
        className="complex-dialog"
        style={styles.complexDialog}
        style={styles.dialog}
        autoFocus={false}
        footer={this.renderFooter()}
        title="入驻成功"
        isFullScreen={true}
        {...this.props}
        visible={this.state.visible}
      >
        <div style={styles.dialogContent}>
          <img
            style={styles.icon}
            src="//img.alicdn.com/tfs/TB1GOHLXyqAXuNjy1XdXXaYcVXa-52-52.png"
            srcSet="//img.alicdn.com/tfs/TB1h_K_b4rI8KJjy0FpXXb5hVXa-104-104.png"
          />
          <div style={styles.info}>
            恭喜您成功创作平台<br />现在可以认证符合自己的角色啦
          </div>
          <div style={styles.extraInfo}>
            角色是淘宝中对达人的XXX，通过角色您将获得特权
          </div>
          <div style={styles.authList}>
            <div style={styles.authItem}>
              <Icon style={styles.authItemIcon} size="xs" type="select" /> V
              标头像
            </div>
            <div style={styles.authItem}>
              <Icon style={styles.authItemIcon} size="xs" type="select" />{' '}
              角色标志
            </div>
            <div style={styles.authItem}>
              <Icon style={styles.authItemIcon} size="xs" type="select" />{' '}
              优先发表
            </div>
          </div>
        </div>
      </Dialog>
    );
  }
}

const styles = {
  dialog: { width: '640px' },
  icon: { width: '52px', height: '52px' },
  dialogContent: {
    height: '200px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  info: { marginTop: '10px', fontSize: '16px', textAlign: 'center' },
  extraInfo: { marginTop: '12px', fontSize: '12px', color: '#999999' },
  authList: { marginTop: '10px', fontSize: '12px', color: '#999999' },
  authItem: { marginTop: '5px' },
  authItemIcon: { color: '#2ECA9C' },
  footer: { marginTop: '10px', marginBottom: '10px', textAlign: 'center' }
};

export default CreateFuncDialog(ComplexDialog);
