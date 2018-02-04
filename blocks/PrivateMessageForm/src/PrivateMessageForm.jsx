import React, { Component } from 'react';
import { Input, Button } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import './PrivateMessageForm.scss';

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

  // ICE: React Component 的生命周期

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

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
    console.log(this.state);
  };

  render() {
    return (
      <div className="private-message-form" style={styles.privateMessageForm}>
        <IceContainer style={styles.formCard}>
          <div style={styles.title}>私有消息</div>
          <div style={styles.subtitle}>给王明明发私有消息</div>
          <div style={styles.groupTitle}>标题</div>
          <div style={styles.inputWrap}>
            <Input
              style={styles.input}
              value={this.state.title}
              onChange={this.titleChange}
              placeholder="请输入标题"
            />
          </div>
          <div style={styles.groupTitle}>消息内容</div>
          <div style={styles.textareaWrap}>
            <Input
              style={styles.textarea}
              multiple
              value={this.state.message}
              onChange={this.messageChange}
              placeholder="请输入内容"
            />
          </div>
          <div style={styles.btnWrap}>
            <Button type="primary" onClick={this.sendMessage}>
              发送消息
            </Button>
          </div>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  formCard: { width: 518, paddingLeft: '30px' },
  title: {
    fontSize: '16px',
    marginBottom: '10px',
    color: '#000',
    fontWeight: 'bold',
  },
  subtitle: { color: '#000', fontSize: '14px', marginBottom: '30px' },
  groupTitle: { marginBottom: '10px' },
  input: { width: '332px', marginBottom: '20px' },
  textarea: { width: '332px', heihgt: '85px' },
  textareaWrap: { marginBottom: '20px' },
  privateMessageForm: {},
};
