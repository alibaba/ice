import React, { Component } from 'react';
import { Dialog, Button } from '@alifd/next';
import IceContainer from '@icedesign/container';
import { enquireScreen } from 'enquire-js';

export default class SuccessDialog extends Component {
  static displayName = 'SuccessDialog';

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

  render() {
    const { isMobile } = this.state;
    const dialogStyle = {
      width: isMobile ? 'auto' : '640px',
      height: isMobile ? 'auto' : '340px',
    };

    return (
      <IceContainer>
        <Dialog
          className="success-dialog"
          style={{ ...dialogStyle }}
          autoFocus={false}
          footer={false}
          title="认证申请已提交"
          {...this.props}
          onClose={this.hideDialog}
          visible={this.state.visible}
        >
          <div style={styles.dialogContent}>
            <img
              style={styles.icon}
              src="//img.alicdn.com/tfs/TB1GOHLXyqAXuNjy1XdXXaYcVXa-52-52.png"
              srcSet="//img.alicdn.com/tfs/TB1h_K_b4rI8KJjy0FpXXb5hVXa-104-104.png"
              alt="提示图标"
            />
            <p style={styles.text}>我们将在5-7个工作日内完成审核，请耐心等待</p>
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
  dialogContent: {
    height: '200px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  icon: {
    width: '52px',
    height: '52px',
    marginTop: '46px',
    marginBottom: '10px',
  },
  text: {
    fontSize: '16px',
  },
};
