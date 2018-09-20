import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import Filter from './components/Filter';
import SnapshotTable from './components/SnapshotTable';

export default class snapshot extends Component {
  static displayName = 'snapshot';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      {
        link: '/#/monitor/version',
        text: '埋点监控',
      },
      {
        link: '',
        text: '方案监控',
      },
    ];

    return (
      <div>
        <CustomBreadcrumb items={breadcrumb} title="方案管理" />
        <Filter />
        <SnapshotTable />
      </div>
    );
  }
}
