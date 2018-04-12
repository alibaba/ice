

import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import TabTable from './components/TabTable';

import './TagList.scss';

export default class TagList extends Component {
  static displayName = 'TagList';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '标签管理', link: '' },
      { text: '标签列表', link: '#/tag/list' },
    ];
    return (
      <div className="tag-list-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        <TabTable />
      </div>
    );
  }
}
