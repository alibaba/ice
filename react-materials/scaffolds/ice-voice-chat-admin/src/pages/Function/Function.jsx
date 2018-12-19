import React, { Component } from 'react';
import TopBar from '../../components/TopBar';
import GeneralDialog from '../../components/GeneralDialog';
import FunctionTable from './components/FunctionTable';

// MOCK 数据，实际业务按需进行替换
const getData = () => {
  return Array.from({ length: 10 }).map((item, index) => {
    return {
      id: index + 1,
      name: 'GetUser',
      desc: '获取用户信息',
      language: 'NodeJS 8.x',
      skill: '无',
      status: '已发布',
    };
  });
};

export default class Function extends Component {
  state = {
    data: getData(),
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
