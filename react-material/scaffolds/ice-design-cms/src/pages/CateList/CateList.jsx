

import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import TabTable from './components/TabTable';

import './CateList.scss';

export default class CateList extends Component {
  static displayName = 'CateList';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '分类管理', link: '' },
      { text: '分类列表', link: '#/cate/list' },
    ];
    return (
      <div className="cate-list-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        <TabTable />
      </div>
    );
  }
}
