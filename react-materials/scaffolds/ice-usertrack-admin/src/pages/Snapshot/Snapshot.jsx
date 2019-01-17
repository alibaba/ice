import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import Filter from './components/Filter';
import SnapshotTable from './components/SnapshotTable';

const getData = (length = 10) => {
  return Array.from({ length }).map((item, index) => {
    return {
      name: '新版手淘',
      appid: `2018${index}`,
      version: `0.0.${index}`,
      creator: '淘小宝',
      createTime: `2018-08-28 14:29:0${index}`,
      status: '正常',
    };
  });
};
export default class snapshot extends Component {
  state = {
    isLoading: false,
    data: [],
  };

  componentDidMount() {
    this.fetchData();
  }

  mockApi = (len) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getData(len));
      }, 600);
    });
  };

  fetchData = (len) => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        this.mockApi(len).then((data) => {
          this.setState({
            data,
            isLoading: false,
          });
        });
      }
    );
  };

  handleFilterChange = () => {
    this.fetchData(5);
  };

  render() {
    const { isLoading, data } = this.state;
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
        <Filter onChange={this.handleFilterChange} />
        <SnapshotTable
          data={data}
          isLoading={isLoading}
          fetchData={this.fetchData}
        />
      </div>
    );
  }
}
