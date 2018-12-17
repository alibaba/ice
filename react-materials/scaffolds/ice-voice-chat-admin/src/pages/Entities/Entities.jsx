import React, { Component } from 'react';
import TopBar from '../../components/TopBar';
import GeneralDialog from '../../components/GeneralDialog';
import EntitlesTable from './components/EntitlesTable';

export default class Entities extends Component {
  state = {
    data: [
      {
        name: 'weather',
        desc: '一些描述',
        preview: '--',
        skill: '无',
      },
    ],
  };

  getFormValue = (value) => {
    const { data } = this.state;
    data.push({
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
