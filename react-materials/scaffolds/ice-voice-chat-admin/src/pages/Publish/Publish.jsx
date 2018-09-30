import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input } from '@icedesign/base';
import TopBar from '../../components/TopBar';

export default class Projects extends Component {
  static displayName = 'Projects';

  render() {
    return (
      <div>
        <TopBar
          extraBefore={<Input size="large" placeholder="请输入" />}
          buttonText="发布项目"
        />
        <IceContainer>Projects</IceContainer>
      </div>
    );
  }
}
