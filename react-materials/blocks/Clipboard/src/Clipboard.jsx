import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import IceContainer from '@icedesign/container';
import { Grid, Button, Input, Message } from '@alifd/next';

const { Row, Col } = Grid;

export default class Clipboard extends Component {
  static displayName = 'Clipboard';

  static propTypes = {};

  static defaultProps = {};

  state = {
    value:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.',
  };

  handleChange = (value) => {
    console.log(value);
    this.setState({
      value,
    });
  };

  handleCopy = (text) => {
    if (!text) {
      return Message.success('没有需要复制的内容');
    }
    Message.success('复制成功');
  };

  render() {
    return (
      <IceContainer>
        <Row wrap style={styles.row}>
          <Col l="10">
            <Input.TextArea
              style={{ width: '90%' }}
              rows={8}
              value={this.state.value}
              onChange={this.handleChange}
            />
          </Col>

          <Col l="4">
            <CopyToClipboard text={this.state.value} onCopy={this.handleCopy}>
              <Button type="primary">复制到剪贴板</Button>
            </CopyToClipboard>
          </Col>
          <Col l="10">
            <Input.TextArea
              style={{ width: '90%' }}
              rows={8}
              placeholder="通过右键粘贴功能到这里试试..."
              onChange={this.handleChange}
            />
          </Col>

          <Col l="10" />
        </Row>
      </IceContainer>
    );
  }
}

const styles = {
  row: {
    display: 'flex',
    alignItems: 'center',
  },
};
