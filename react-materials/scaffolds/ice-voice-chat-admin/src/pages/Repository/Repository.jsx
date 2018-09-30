import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import TopBar from '../../components/TopBar';

export default class Repository extends Component {
  static displayName = 'Repository';

  render() {
    return (
      <div>
        <TopBar title="知识库" buttonText="新建知识库" />
        <IceContainer>Repository</IceContainer>
      </div>
    );
  }
}

const styles = {};
