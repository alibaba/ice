import React, { Component } from 'react';
import TopBar from '../../components/TopBar';
import FunctionTable from './components/FunctionTable';

const tableData = [
  {
    name: 'USER.FUC.1',
    language: 'JavaScript',
    skill: '无',
  },
];

export default class Function extends Component {
  static displayName = 'Function';

  render() {
    return (
      <div>
        <TopBar title="函数管理" buttonText="添加函数" />
        <FunctionTable data={tableData} />
      </div>
    );
  }
}
