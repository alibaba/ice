import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Dialog, Button, Icon } from '@alifd/next';
import { enquireScreen } from 'enquire-js';

export default class ComplexDialog extends Component {
  static displayName = 'ComplexDialog';

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      isMobile: false,
    };
  }

  componentDidMount() {
    this.enquireScreenRegister();
  }

  enquireScreenRegister = () => {
    const mediaCondition = 'only screen and (max-width: 720px)';

    enquireScreen((mobile) => {
      this.setState({
        isMobile: mobile,
      });
    }, mediaCondition);
  };

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

  renderFooter = () => {
    return (
      <div style={styles.footer}>
        <Button onClick={this.hideDialog}>稍后前往</Button>
        <Button onClick={this.hideDialog} type="primary">
          前往认证
        </Button>
      </div>
    );
  };

  render() {
    const { isMobile } = this.state;
    const dialogStyle = {
      width: isMobile ? 'auto' : '640px',
      height: isMobile ? 'auto' : '340px',
    };
    return (
      <IceContainer>
        <Dialog
          className="complex-dialog"
          style={{ ...dialogStyle }}
          autoFocus={false}
          footer={this.renderFooter()}
          title="入驻成功"
          isFullScreen
          onClose={this.hideDialog}
          {...this.props}
          visible={this.state.visible}
        >
          <div style={styles.dialogContent}>
            <img
              style={styles.icon}
              src="//img.alicdn.com/tfs/TB1GOHLXyqAXuNjy1XdXXaYcVXa-52-52.png"
              srcSet="//img.alicdn.com/tfs/TB1h_K_b4rI8KJjy0FpXXb5hVXa-104-104.png"
              alt=""
            />
            <div style={styles.info}>
              恭喜您成功创作平台<br />现在可以认证符合自己的角色啦
            </div>
            <div style={styles.extraInfo}>
              角色是淘宝中对达人的XXX，通过角色您将获得特权
            </div>
            <div style={styles.authList}>
              <div style={styles.authItem}>
                <Icon style={styles.authItemIcon} size="xs" type="select" />
                V 标头像
              </div>
              <div style={styles.authItem}>
                <Icon style={styles.authItemIcon} size="xs" type="select" />
                角色标志
              </div>
              <div style={styles.authItem}>
                <Icon style={styles.authItemIcon} size="xs" type="select" />
                优先发表
              </div>
            </div>
          </div>
        </Dialog>

        <Button type="primary" onClick={this.showDialog}>
          显示 Dialog
        </Button>
      </IceContainer>
    );
  }
}

const styles = {
  icon: {
    width: '52px',
    height: '52px',
  },
  dialogContent: {
    // width: '640px',
    // height: '200px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  info: {
    marginTop: '10px',
    fontSize: '16px',
    textAlign: 'center',
  },
  extraInfo: {
    marginTop: '12px',
    fontSize: '12px',
    color: '#999999',
  },
  authList: {
    marginTop: '10px',
    fontSize: '12px',
    color: '#999999',
  },
  authItem: {
    marginTop: '5px',
  },
  authItemIcon: {
    color: '#2ECA9C',
    marginRight: '5px',
  },
  footer: {
    marginTop: '10px',
    marginBottom: '10px',
    textAlign: 'center',
  },
};
