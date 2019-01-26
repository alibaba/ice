/* eslint no-prototype-builtins:0, react/forbid-prop-types:0 */
import React, { Component } from 'react';
import cloneDeep from 'lodash.clonedeep';
import PropTypes from 'prop-types';
import { Table, Pagination } from '@alifd/next';
import SearchFilter from './SearchFilter';

export default class CustomTable extends Component {
  static displayName = 'CustomTable';

  static propTypes = {
    enableFilter: PropTypes.bool,
    searchQueryHistory: PropTypes.object,
    dataSource: PropTypes.array,
  };

  static defaultProps = {
    enableFilter: true,
    searchQueryHistory: null,
    dataSource: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      searchQuery: cloneDeep(this.props.searchQueryHistory),
      pageIndex: 1,
      dataSource: [],
    };
  }

  componentDidMount() {
    this.fetchDataSource();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.hasOwnProperty('searchQueryHistory')) {
      this.setState(
        {
          searchQuery: Object.assign(
            cloneDeep(this.props.searchQueryHistory),
            nextProps.searchQueryHistory
          ),
          pageIndex: 1,
        },
        this.fetchDataSource
      );
    }
  }

  fetchDataSource = () => {
    this.setState({
      loading: true,
    });

    // 根据当前的 searchQuery/pageIndex 获取列表数据，使用 setTimeout 模拟异步请求

    setTimeout(() => {
      this.setState({
        loading: false,
        dataSource: this.props.dataSource,
      });
    }, 1 * 1000);
  };

  onSearchChange = (searchQuery) => {
    this.setState({
      searchQuery,
    });
  };

  onSearchSubmit = (searchQuery) => {
    this.setState(
      {
        searchQuery,
        pageIndex: 1,
      },
      this.fetchDataSource
    );
  };

  onSearchReset = () => {
    this.setState({
      searchQuery: cloneDeep(this.props.searchQueryHistory),
    });
  };

  onPaginationChange = (pageIndex) => {
    this.setState(
      {
        pageIndex,
      },
      this.fetchDataSource
    );
  };

  render() {
    const { enableFilter, columns, formConfig, hasAdvance } = this.props;
    const { searchQuery, dataSource, loading, pageIndex } = this.state;

    return (
      <div>
        {enableFilter && (
          <SearchFilter
            formConfig={formConfig}
            value={searchQuery}
            onChange={this.onSeacrhChange}
            onSubmit={this.onSearchSubmit}
            onReset={this.onSearchReset}
            hasAdvance={hasAdvance}
          />
        )}
        <Table dataSource={dataSource} hasBorder={false} loading={loading}>
          {columns.map((item) => {
            return (
              <Table.Column
                title={item.title}
                dataIndex={item.dataIndex}
                key={item.key}
                sortable={item.sortable || false}
                cell={item.cell}
                width={item.width || 'auto'}
                lock={item.lock}
              />
            );
          })}
        </Table>
        <Pagination
          style={styles.pagination}
          current={pageIndex}
          onChange={this.onPaginationChange}
        />
      </div>
    );
  }
}

const styles = {
  pagination: {
    margin: '20px 0',
    textAlign: 'center',
  },
};
