import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import ReportTable from './components/ReportTable';

export default class Report extends Component {
  static displayName = 'Report';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const breadcrumb = [
      {
        link: '/#/validate/autotest',
        text: '埋点验证',
      },
      {
        link: '',
        text: '验证报告',
      },
    ];

    return (
      <div>
        <CustomBreadcrumb items={breadcrumb} title="验证报告" />
        <ReportTable />
      </div>
    );
  }
}
