

import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import EditableTable from './components/EditableTable';

import './NavigationSetting.scss';

export default class NavigationSetting extends Component {
  static displayName = 'NavigationSetting';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      { text: '通用设置', link: '' },
      { text: '菜单设置', link: '#/setting/navigation' },
    ];
    return (
      <div className="navigation-setting-page">
        <CustomBreadcrumb dataSource={breadcrumb} />
        <EditableTable />
      </div>
    );
  }
}
