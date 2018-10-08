import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import TopBar from '../../components/TopBar';

export default class Skill extends Component {
  static displayName = 'Skill';

  render() {
    return (
      <div>
        <TopBar title="全部技能" buttonText="新建技能" />
        <IceContainer>Skill</IceContainer>
      </div>
    );
  }
}

const styles = {};
