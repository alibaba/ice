import React, { Component } from 'react';
import TopBar from '../../components/TopBar';
import GeneralDialog from '../../components/GeneralDialog';
import FunctionTable from './components/FunctionTable';

export default class Function extends Component {
  state = {
    data: [],
  };

  getFormValue = (value) => {
    const { data } = this.state;
    data.push({
      name: value.title,
      desc: value.desc,
      language: 'javascript',
      skill: '无',
      status: '未发布',
    });
    this.setState({
      data,
    });
  };

  renderExtraAfter = () => {
    return (
      <GeneralDialog buttonText="添加函数" getFormValue={this.getFormValue} />
    );
  };

  render() {
    const { data } = this.state;
    return (
      <div>
        <TopBar title="函数管理" extraAfter={this.renderExtraAfter()} />
        <FunctionTable data={data} />
      </div>
    );
  }
}
