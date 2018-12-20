/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Dialog, Input, Feedback, Button } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
} from '@icedesign/form-binder';

export default class Card extends Component {
  state = {
    visible: false,
  };

  onOpen = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  handleConfirm = () => {
    const { getFormValue } = this.props;
    console.log(this.props);
    this.refs.form.validateAll((error, value) => {
      if (error) {
        Feedback.toast.error('请输入完整的信息');
        return;
      }

      this.setState(
        {
          visible: false,
        },
        () => {
          getFormValue(value);
        }
      );
    });
  };

  render() {
    const { buttonText, dialogTitle } = this.props;
    return (
      <div>
        <Button type="primary" size="large" onClick={this.onOpen}>
          {buttonText}
        </Button>
        <Dialog
          visible={this.state.visible}
          onOk={this.handleConfirm}
          closable="esc,mask,close"
          onCancel={this.onClose}
          onClose={this.onClose}
          title={dialogTitle || buttonText}
        >
          <IceFormBinderWrapper value={this.state.value} ref="form">
            <div style={styles.formContent}>
              <div style={styles.formItem}>
                <div style={styles.formLabel}>标题</div>
                <IceFormBinder required>
                  <Input name="title" size="large" style={{ width: '400px' }} />
                </IceFormBinder>
              </div>
              <div style={styles.formItem}>
                <div style={styles.formLabel}>描述</div>
                <IceFormBinder required>
                  <Input
                    multiple
                    placeholder="这里是一段描述"
                    name="desc"
                    size="large"
                    style={{ width: '400px' }}
                  />
                </IceFormBinder>
              </div>
            </div>
          </IceFormBinderWrapper>
        </Dialog>
      </div>
    );
  }
}

const styles = {
  formContent: {
    margin: '0 20px',
  },
  formItem: {
    marginBottom: '25px',
    display: 'flex',
    alignItems: 'center',
  },
  formLabel: {
    width: '58px',
    marginRight: '15px',
    textAlign: 'right',
  },
  formError: {
    marginLeft: '10px',
  },
  submitButton: {
    marginLeft: '85px',
  },
};
