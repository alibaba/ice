

import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import SimpleFluencyForm from './components/SimpleFluencyForm';

import './CreateCate.scss';

export default class CreateCate extends Component {
  static displayName = 'CreateCate';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '分类管理', link: '' },
      { text: '添加分类', link: '#/cate/list' },
    ];
    return (
      <div className="create-cate-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        <SimpleFluencyForm />
      </div>
    );
  }
}
