import React, { Component } from 'react';
import TopBar from '../../components/TopBar';
import GeneralDialog from '../../components/GeneralDialog';
import EntitlesTable from './components/EntitlesTable';
import mockdata from './data';

export default class Entities extends Component {
  state = {
    data: mockdata, // MOCK 数据，实际业务按需进行替换
  };

  getFormValue = (value) => {
    const { data } = this.state;
    data.push({
      id: data.length + 1,
      name: value.title,
      desc: value.desc,
      preview: '--',
      skill: '无',
    });
    this.setState({
      data,
    });
  };

  renderExtraAfter = () => {
    return (
      <GeneralDialog buttonText="新建实体" getFormValue={this.getFormValue} />
    );
  };

  render() {
    const { data } = this.state;
    return (
      <div>
        <TopBar
          title="实体管理（Entities）"
          extraAfter={this.renderExtraAfter()}
        />
        <EntitlesTable data={data} />
      </div>
    );
  }
}
