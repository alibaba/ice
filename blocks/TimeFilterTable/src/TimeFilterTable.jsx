/* eslint no-underscore-dangle:0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Table, Pagination, Radio, Search } from '@icedesign/base';
import DataBinder from '@icedesign/data-binder';

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

  componentDidMount() {
    this.queryCache.page = 1;
    this.fetchData();
  }

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

  renderOrder = (value, index) => {
    return <span>{index + 1}</span>;
  };

  render() {
    const tableData = this.props.bindingData.tableData;

    return (
      <div className="time-filter-table">
        <IceContainer style={styles.filterCard}>
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
              style={styles.search}
              type="normal"
              inputWidth={150}
              placeholder="搜索"
              searchText=""
              onSearch={this.onSearch}
            />
          </div>
        </IceContainer>
        <IceContainer style={styles.tableCard}>
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
        </IceContainer>
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
    padding: '10px',
  },
};
