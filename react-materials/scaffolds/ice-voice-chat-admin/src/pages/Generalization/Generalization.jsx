import React, { Component } from 'react';
import TopBar from '../../components/TopBar';
import GeneralDialog from '../../components/GeneralDialog';
import GeneralizationTable from './components/GeneralizationTable';

export default class Generalization extends Component {
  state = {
    data: [],
  };

  getFormValue = (value) => {
    const { data } = this.state;
    data.push({
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
