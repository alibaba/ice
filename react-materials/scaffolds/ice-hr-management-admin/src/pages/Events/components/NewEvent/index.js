import React, { Component } from 'react';
import { Button } from '@icedesign/base';
import IceContainer from '@icedesign/container';

export default class NewEvent extends Component {
  render() {
    return (
      <IceContainer>
        <Button type="primary" size="large" style={{ width: '100%' }}>
          添加事项
        </Button>
      </IceContainer>
    );
  }
}
