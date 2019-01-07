import React, { Component } from 'react';
import CustomBreadcrumb from '../../components/CustomBreadcrumb';
import Filter from './Components/Filter';
import CardList from './Components/CardList';

const getData = (length = 10) => {
  return Array.from({ length }).map((item, index) => {
    return {
      title: `淘宝首页-P${index}`,
      desc: `产品方案 - 共 ${index} 个埋点`,
      creator: '张明',
      leader: '淘小宝',
      time: '2017-06-05 14:03',
    };
  });
};

export default class Scheme extends Component {
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
    this.fetchData(2);
  };

  render() {
    const { isLoading, data } = this.state;
    const breadcrumb = [
      {
        link: '/#/maintain/scheme',
        text: '埋点维护',
      },
      {
        link: '',
        text: '方案管理',
      },
    ];
    return (
      <div>
        <CustomBreadcrumb items={breadcrumb} title="方案管理" />
        <Filter onChange={this.handleFilterChange} />
        <CardList isLoading={isLoading} data={data} />
      </div>
    );
  }
}
