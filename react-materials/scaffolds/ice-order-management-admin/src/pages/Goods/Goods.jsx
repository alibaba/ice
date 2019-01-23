import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Table from './components/Table';
import PageHead from '../../components/PageHead';

@withRouter
export default class Goods extends Component {
  handleClick = () => {
    this.props.history.push('add/goods');
  };

  render() {
    return (
      <div>
        <PageHead
          title="商品管理"
          buttonText="添加商品"
          onClick={this.handleClick}
        />
        <Table />
      </div>
    );
  }
}
