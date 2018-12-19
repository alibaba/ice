import React, { Component } from 'react';
import cloneDeep from 'lodash.clonedeep';
import PropTypes from 'prop-types';
import { Table, Pagination, Button, Feedback } from '@icedesign/base';
import SearchFilter from './SearchFilter';

const defaultSearchQuery = {
  id: '',
  archiveId: '',
  applyCode: '',
  name: '',
  otherCompany: '',
  principal: '',
  createTime: [],
  signTime: [],
  endTime: [],
  state: '',
  type: '',
  checkbox: 'false',
};

export default class ContractTable extends Component {
  static displayName = 'ContractTable';

  static propTypes = {
    enableFilter: PropTypes.bool,
    searchQueryHistory: PropTypes.object,
  };

  static defaultProps = {
    enableFilter: true,
    searchQueryHistory: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      searchQuery: cloneDeep(defaultSearchQuery),
      pageIndex: 1,
      dataSource: [],
    };
  }

  componentDidMount() {
    this.fetchDataSource();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.hasOwnProperty('searchQueryHistory')) {
      this.setState({
        searchQuery: Object.assign(cloneDeep(defaultSearchQuery), nextProps.searchQueryHistory),
        pageIndex: 1,
      }, this.fetchDataSource);
    }
  }

  fetchDataSource = () => {
    this.setState({
      loading: true,
    });

    // 根据当前的 searchQuery/pageIndex 获取列表数据，使用 setTimeout 模拟异步请求
    const { searchQuery, pageIndex } = this.state;

    setTimeout(() => {
      const dataSource = Array.from({ length: 20 }).map((item, index) => {
        return {
          id: `00000${index}`,
          name: '聘用合同',
          ourCompany: '杭州xxx科技有限公司',
          otherCompany: '上海xxx科技有限公司',
          amount: '999,999',
          currency: 'CNY',
          state: '签约中',
        };
      });

      this.setState({
        loading: false,
        dataSource,
      });

    }, 1 * 1000);

  };

  onSearchChange = (searchQuery) => {
    this.setState({
      searchQuery,
    });
  };

  onSearchSubmit = (searchQuery) => {
    this.setState({
      searchQuery,
      pageIndex: 1,
    }, this.fetchDataSource);
  };

  onSearchReset = () => {
    this.setState({
      searchQuery: cloneDeep(defaultSearchQuery),
    });
  };

  onPaginationChange = (pageIndex) => {
    this.setState({
      pageIndex,
    }, this.fetchDataSource);
  }


  renderState = (value) => {
    return (
      <div style={styles.state}>
        <span style={styles.stateText}>{value}</span>
      </div>
    );
  };

  renderOper = () => {
    return (
      <div>
        <Button
          shape="text"
          onClick={() => {
            Feedback.toast.success('修改合同');
          }}
        >
          修改合同
        </Button>
        <span style={styles.separator} />
        <Button
          shape="text"
          onClick={() => {
            Feedback.toast.success('查看详情');
          }}
        >
          查看详情
        </Button>
      </div>
    );
  };

  getTableColumns = () => {
    return [
      {
        title: '合同编号',
        dataIndex: 'id',
        key: 'id',
        lock: true,
        width: 100,
      },
      {
        title: '合同名称',
        dataIndex: 'name',
        key: 'name',
        lock: true,
        width: 100,
      },
      {
        title: '我方公司',
        dataIndex: 'ourCompany',
        key: 'ourCompany',
        width: 160,
      },
      {
        title: '对方公司',
        dataIndex: 'otherCompany',
        key: 'otherCompany',
        width: 160,
      },
      {
        title: '合同金额',
        dataIndex: 'amount',
        key: 'amount',
        width: 100,
      },
      {
        title: '币种',
        dataIndex: 'currency',
        key: 'currency',
        width: 60,
      },
      {
        title: '合同状态',
        dataIndex: 'state',
        key: 'state',
        cell: this.renderState,
        width: 100,
      },
      {
        title: '操作',
        dataIndex: 'detail',
        key: 'detail',
        cell: this.renderOper,
        width: 200,
      },
    ];
  };

  render() {
    const { enableFilter } = this.props;
    const { searchQuery, dataSource, loading, pageIndex } = this.state;

    return (
      <div>
        {enableFilter && <SearchFilter
          value={searchQuery}
          onChange={this.onSeacrhChange}
          onSubmit={this.onSearchSubmit}
          onReset={this.onSearchReset}
        />}
        <Table
          dataSource={dataSource}
          hasBorder={false}
          isLoading={loading}
        >
          {this.getTableColumns().map((item) => {
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
  stateText: {
    display: 'inline-block',
    padding: '5px 10px',
    color: '#5e83fb',
    background: '#fff',
    border: '1px solid #5e83fb',
    borderRadius: '4px',
  },
  link: {
    margin: '0 5px',
    color: 'rgba(49, 128, 253, 0.65)',
    cursor: 'pointer',
    textDecoration: 'none',
  },
  separator: {
    margin: '0 8px',
    display: 'inline-block',
    height: '12px',
    width: '1px',
    verticalAlign: 'middle',
    background: '#e8e8e8',
  },
  pagination: {
    margin: '20px 0',
    textAlign: 'center',
  },
};
