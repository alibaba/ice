import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import { Grid } from '@alifd/next';
import 'codemirror/lib/codemirror.css';

require('codemirror/mode/javascript/javascript');

const { Row, Col } = Grid;

const codeString = `
  const fn1 = () => {
    console.log('I ♥ ICE')
  }`;

export default class CustomCodemirror extends Component {
  static displayName = 'CustomCodemirror';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: codeString,
    };
  }

  onChange = (editor, data, value) => {
    console.log({ data, value });
    this.setState({
      value,
    });
  };

  renderCodeMirror = () => {
    const options = {
      mode: 'javascript',
      lineNumbers: true,
      tabSize: '2',
    };

    return (
      <CodeMirror
        value={this.state.value}
        options={options}
        onChange={this.onChange}
      />
    );
  };

  render() {
    return (
      <IceContainer>
        <Row wrap>
          <Col l="12" xxs="24">
            {this.renderCodeMirror()}
          </Col>
          <Col l="12" xxs="24">
            {this.renderCodeMirror()}
          </Col>
        </Row>
      </IceContainer>
    );
  }
}
