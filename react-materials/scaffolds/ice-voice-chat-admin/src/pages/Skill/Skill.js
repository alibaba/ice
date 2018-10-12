import React, { Component } from 'react';
import { Button } from '@icedesign/base';
import TopBar from '../../components/TopBar';
import Tabs from './components/Tabs';

export default class Skill extends Component {
  static displayName = 'Skill';

  renderExtraAfter = () => {
    return (
      <div>
        <Button size="large" type="normal" style={{ marginRight: '10px' }}>
          导入技能
        </Button>
        <Button size="large" type="primary">
          新建技能
        </Button>
      </div>
    );
  };

  render() {
    return (
      <div>
        <TopBar title="全部技能" extraAfter={this.renderExtraAfter()} />
        <Tabs />
      </div>
    );
  }
}
