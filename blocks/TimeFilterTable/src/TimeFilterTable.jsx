

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IceCard from '@icedesign/card';
import './TimeFilterTable.scss';
import { Table, Pagination, Tab, Radio, Search } from '@icedesign/base';
import DataBinder from '@icedesign/data-binder';
import IceLabel from '@icedesign/label';

const { Group: RadioGroup } = Radio;

@DataBinder({
  tableData: {
    // 详细请求配置请参见 https://github.com/axios/axios
    url: '/mock/time-filter-table.json',
    params: {
      page: 1,
    },
    defaultBindingData: {
      list: [],
      total: 100,
      pageSize: 10,
      currentPage: 1,
    },
  },
})
export default class TimeFilterTable extends Component {
  static displayName = 'TimeFilterTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.queryCache = {};
    this.state = {
      timeRange: 'day',
    };
  }

  // ICE: React Component 的生命周期

  componentWillMount() { }

  componentDidMount() {
    this.queryCache.page = 1;
    this.fetchData();
  }

  componentWillReceiveProps(nextProps, nextContext) { }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  componentWillUnmount() { }

  fetchData = () => {
    this.props.updateBindingData('tableData', {
      params: this.queryCache,
    });
  };

  changePage = (currentPage) => {
    this.queryCache.page = currentPage;
    this.fetchData();
  };

  onDateChange = (date) => {
    this.queryCache.timeRange = date;
    this.fetchData();
    this.setState({
      timeRange: date,
    });
  };

  onSearch = (value) => {
    this.queryCache.keywords = value.key;
    this.fetchData();
  };

  renderOrder = (value, index, record) => {
    return <span>{index + 1}</span>;
  };

  render() {
    const tableData = this.props.bindingData.tableData;

    return (
      <div className="time-filter-table" style={styles.timeFilterTable}>
        <IceCard style={styles.filterCard}>
          <div>
            <span>选择活动日期范围：</span>
            <RadioGroup
              value={this.state.timeRange}
              dataSource={[
                {
                  label: '今天',
                  value: 'day',
                },
                {
                  label: '本周',
                  value: 'week',
                },
                {
                  label: '本月',
                  value: 'month',
                },
              ]}
              onChange={this.onDateChange}
            />
          </div>
          <div>
            <Search
<<<<<<< HEAD
              style={styles.todo0}
=======
              style={styles.search}
>>>>>>> 6f8bbd33e4db62185bbe64c9db0ee6effd3c292f
              type="normal"
              inputWidth={150}
              placeholder="搜索"
              searchText=""
              onSearch={this.onSearch}
            />
          </div>
        </IceCard>
        <IceCard style={styles.tableCard}>
          <Table
            dataSource={tableData.list}
            isLoading={tableData.__loading}
            hasBorder={false}
          >
            <Table.Column title="顺序" cell={this.renderOrder} width={45} />
            <Table.Column title="活动名称" dataIndex="title" width={85} />
            <Table.Column title="备注" dataIndex="memo" width={150} />
            <Table.Column title="有效时间" dataIndex="validity" width={85} />
            <Table.Column title="负责人" dataIndex="owner" width={85} />
          </Table>
          <div style={styles.pagination}>
            <Pagination
              current={tableData.currentPage}
              pageSize={tableData.pageSize}
              total={tableData.total}
              onChange={this.changePage}
            />
          </div>
        </IceCard>
      </div>
    );
  }
}

const styles = {
  filterCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pagination: {
    textAlign: 'right',
    paddingTop: '20px',
    paddingBottom: '10px',
  },
  tableCard: {
    padding: '10px'
  },
  timeFilterTable: {},
  todo0: { marginLeft: '10px' },
};
