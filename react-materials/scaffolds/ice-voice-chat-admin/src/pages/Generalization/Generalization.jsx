import React, { Component } from 'react';
import TopBar from '../../components/TopBar';
import GeneralDialog from '../../components/GeneralDialog';
import GeneralizationTable from './components/GeneralizationTable';

// MOCK 数据，实际业务按需进行替换
const getData = () => {
  return Array.from({ length: 10 }).map((item, index) => {
    return {
      id: index + 1,
      name: `USER.SYN.10${index}`,
      desc: '规则描述',
      words: '--',
      skill: '无',
    };
  });
};

export default class Generalization extends Component {
  state = {
    data: getData(),
  };

  getFormValue = (value) => {
    const { data } = this.state;
    data.push({
      id: data.length + 1,
      name: value.title,
      desc: value.desc,
      words: '--',
      skill: '无',
    });
    this.setState({
      data,
    });
  };

  renderExtraAfter = () => {
    return (
      <GeneralDialog buttonText="新建规则" getFormValue={this.getFormValue} />
    );
  };

  render() {
    const { data } = this.state;
    return (
      <div>
        <TopBar
          title="泛化规则管理（Generalization）"
          extraAfter={this.renderExtraAfter()}
        />
        <GeneralizationTable data={data} />
      </div>
    );
  }
}
