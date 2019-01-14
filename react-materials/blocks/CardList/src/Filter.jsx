import React, { Component } from 'react';
import { Input, Button } from '@alifd/next';
import IceContainer from '@icedesign/container';

export default class Filter extends Component {
  static displayName = 'Filter';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  onChange = (value) => {
    console.log({ value });
  };

  render() {
    return (
      <IceContainer style={styles.container}>
        <div style={styles.label}>方案名称:</div>
        <Input placeholder="请输入方案名称" hasClear onChange={this.onChange} />
        <Button type="primary" style={styles.button}>
          查 询
        </Button>
      </IceContainer>
    );
  }
}

const styles = {
  container: {
    margin: '20px 0px',
    display: 'flex',
    alignItems: 'center',
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    height: '32px',
    fontWeight: '500',
    marginRight: '10px',
  },
  button: {
    marginLeft: '20px',
  },
};
