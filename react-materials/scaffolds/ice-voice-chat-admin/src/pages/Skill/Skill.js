import React, { Component } from 'react';
import { Button, Message } from '@alifd/next';
import TopBar from '../../components/TopBar';
import GeneralDialog from '../../components/GeneralDialog';
import Tabs from './components/Tabs';

const mockData = [
  {
    name: 'joke',
    desc: '笑话',
    tag: '预置',
  },
  {
    name: 'weather',
    desc: '天气',
    tag: '预置',
  },
];

export default class Skill extends Component {
  state = {
    data: mockData,
  };

  handleImport = () => {
    Message.error('暂不支持导入');
  };

  getFormValue = (value) => {
    const { data } = this.state;
    data.push({
      name: value.title,
      desc: value.desc,
      tag: '预置',
    });
    this.setState({
      data,
    });
  };

  renderExtraAfter = () => {
    return (
      <div style={{ display: 'flex' }}>
        <Button
          type="normal"
          style={{ marginRight: '10px' }}
          onClick={this.handleImport}
        >
          导入技能
        </Button>
        <GeneralDialog buttonText="新建技能" getFormValue={this.getFormValue} />
      </div>
    );
  };

  render() {
    const { data } = this.state;
    return (
      <div>
        <TopBar title="全部技能" extraAfter={this.renderExtraAfter()} />
        <Tabs data={data} />
      </div>
    );
  }
}
