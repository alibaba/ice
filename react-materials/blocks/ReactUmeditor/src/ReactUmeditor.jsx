import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import ReactUmeditor from 'react-umeditor';

export default class BaseReactUmeditor extends Component {
  static displayName = 'BaseReactUmeditor';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value : "<p>React Editor like Umeditor</p><br />"
    };
  }

  handleChange = (value) => {
    this.setState({
      value
    })
  };

  render() {
    const editorProps = {
      onChange: this.handleChange,
      value: this.state.value,
    };

    return (
      <IceContainer>
        <ReactUmeditor {...editorProps} />
      </IceContainer>
    );
  }
}
