import React, { Component } from 'react';
import Filter from './components/Filter';
import Content from './components/Content';

import './BasicList.scss';

const mockData = () => {
  return Array.from({ length: 10 }).map((item, index) => {
    return {
      title: `${index + 1}. 这里是试卷名称这里是试卷名称这里是试卷名称`,
      time: `2018-06-1${index}`,
      citation: index + 1,
      score: index + 90,
      subject: '自然语言',
      count: 20,
    };
  });
};

export default class BaiscList extends Component {
  static displayName = 'BaiscList';

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  mockApi = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockData());
      }, 600);
    });
  };

  fetchData = () => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        this.mockApi().then((data) => {
          this.setState({
            data,
            isLoading: false,
          });
        });
      }
    );
  };

  render() {
    const { isLoading, data } = this.state;
    return (
      <div className="list-page">
        <Filter fetchData={this.fetchData} />
        <Content data={data} isLoading={isLoading} />
      </div>
    );
  }
}
