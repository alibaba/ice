import React, { Component } from 'react';
import { Input, Button, Grid, Message } from '@alifd/next';
import IceContainer from '@icedesign/container';

const { Row, Col } = Grid;
const Toast = Feedback.toast;

export default class PrivateMessageForm extends Component {
  static displayName = 'PrivateMessageForm';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      message: '',
    };
  }

  titleChange = (title) => {
    this.setState({
      title,
    });
  };

  messageChange = (message) => {
    this.setState({
      message,
    });
  };

  sendMessage = () => {
    const { title, message } = this.state;
    if (title && message) {
      Toast.success('发送成功');
      return;
    }
    Toast.error('您还有未填项');
  };

  render() {
    return (
      <div className="private-message-form">
        <IceContainer title="私有消息">
          <Row style={styles.formRow}>
            <Col xxs="5" s="5" l="2">
              标题
            </Col>
            <Col s="14" l="7">
              <Input
                style={{ width: '100%' }}
                value={this.state.title}
                onChange={this.titleChange}
                placeholder="请输入标题"
              />
            </Col>
          </Row>

          <Row style={styles.formRow}>
            <Col xxs="5" s="5" l="2">
              消息内容
            </Col>
            <Col s="14" l="7">
              <Input.TextArea
                style={{ width: '100%' }}
                value={this.state.message}
                onChange={this.messageChange}
                placeholder="请输入内容" />
            </Col>
          </Row>

          <Row>
            <Col xxs="5" s="5" l="2">
              {' '}
            </Col>
            <Col>
              <Button type="primary" onClick={this.sendMessage}>
                发送消息
              </Button>
            </Col>
          </Row>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  formRow: {
    marginBottom: '20px',
  },
};
