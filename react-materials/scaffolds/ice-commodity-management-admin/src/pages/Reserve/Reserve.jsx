import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Table from './components/Table';
import PageHead from '../../components/PageHead';

@withRouter
export default class Reserve extends Component {
  handleClick = () => {
    this.props.history.push('add/reserve');
  };

  render() {
    return (
      <div>
        <PageHead
          title="预约管理"
          buttonText="添加预约"
          onClick={this.handleClick}
        />
        <Table />
      </div>
    );
  }
}
