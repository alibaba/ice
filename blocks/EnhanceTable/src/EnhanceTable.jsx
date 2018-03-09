/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import { Table, Pagination, Tab, Search } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import DataBinder from '@icedesign/data-binder';
import IceLabel from '@icedesign/label';
import { enquireScreen } from 'enquire-js';

@DataBinder({
  tableData: {
    // 详细请求配置请参见 https://github.com/axios/axios
    url: '/mock/enhance-table-list.json',
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
export default class EnhanceTable extends Component {
  static displayName = 'EnhanceTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.queryCache = {};
    this.state = {
      activeKey: 'solved',
    };
  }

  componentDidMount() {
    this.queryCache.page = 1;
    this.fetchData();
    this.enquireScreenRegister();
  }

  enquireScreenRegister = () => {
    const mediaCondition = 'only screen and (max-width: 720px)';

    enquireScreen((mobile) => {
      this.setState({
        isMobile: mobile,
      });
    }, mediaCondition);
  };

  fetchData = () => {
    this.props.updateBindingData('tableData', {
      data: this.queryCache,
    });
  };

  renderTitle = (value, index, record) => {
    return (
      <div style={styles.titleWrapper}>
        <span style={styles.title}>{record.title}</span>
      </div>
    );
  };

  editItem = (record, e) => {
    e.preventDefault();
    // TODO: record 为该行所对应的数据，可自定义操作行为
  };

  renderOperations = (value, index, record) => {
    return (
      <div
        className="enhance-table-operation"
        style={styles.enhanceTableOperation}
      >
        <a
          href="#"
          style={styles.operation}
          target="_blank"
          onClick={this.editItem.bind(this, record)}
        >
          解决
        </a>
        <a href="#" style={styles.operation} target="_blank">
          详情
        </a>
        <a href="#" style={styles.operation} target="_blank">
          分类
        </a>
      </div>
    );
  };

  renderStatus = (value) => {
    return (
      <IceLabel inverse={false} status="default">
        {value}
      </IceLabel>
    );
  };

  changePage = (currentPage) => {
    this.queryCache.page = currentPage;

    this.fetchData();
  };

  onTabChange = (tabKey) => {
    this.setState({
      activeKey: tabKey,
    });
    this.queryCache.activeKey = tabKey;

    if (tabKey === 'solved') {
      this.fetchData();
    } else if (tabKey === 'needFix') {
      this.fetchData();
    } else {
      console.log(`你点击了 ${tabKey}`);
    }
  };

  onSearch = (value) => {
    this.queryCache.keywords = value.key;
    this.fetchData();
  };

  render() {
    const tableData = this.props.bindingData.tableData;

    return (
      <div className="enhance-table" style={styles.enhanceTable}>
        <IceContainer style={styles.card}>
          <div>
            <Tab
              onChange={this.onTabChange}
              size="small"
              type="text"
              activeKey={this.state.activeKey}
              contentStyle={{ display: 'none' }}
            >
              <Tab.TabPane
                key="solved"
                tab={
                  <span>
                    已解决 <span style={styles.tabCount}>123</span>
                  </span>
                }
              />
              <Tab.TabPane
                key="needFix"
                tab={
                  <span>
                    待解决 <span style={styles.tabCount}>10</span>
                  </span>
                }
              />
              <Tab.TabPane
                key="needValidate"
                tab={
                  <span>
                    待验证 <span style={styles.tabCount}>2</span>
                  </span>
                }
              />
            </Tab>
          </div>
          <div style={styles.extraFilter}>
            <Search
              style={styles.search}
              type="primary"
              inputWidth={150}
              placeholder="搜索"
              searchText=""
              onSearch={this.onSearch}
            />
          </div>
        </IceContainer>
        <IceContainer>
          <Table
            dataSource={tableData.list}
            isLoading={tableData.__loading}
            className="basic-table"
            style={styles.basicTable}
            hasBorder={false}
          >
            <Table.Column
              title="问题描述"
              cell={this.renderTitle}
              width={320}
            />
            <Table.Column title="问题分类" dataIndex="type" width={85} />
            <Table.Column
              title="发布时间"
              dataIndex="publishTime"
              width={150}
            />
            <Table.Column
              title="状态"
              dataIndex="publishStatus"
              width={85}
              cell={this.renderStatus}
            />
            <Table.Column
              title="操作"
              dataIndex="operation"
              width={150}
              cell={this.renderOperations}
            />
          </Table>
          <div style={styles.pagination}>
            <Pagination
              current={tableData.currentPage}
              pageSize={tableData.pageSize}
              total={tableData.total}
              onChange={this.changePage}
              type={this.state.isMobile ? 'simple' : 'normal'}
            />
          </div>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  titleWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    marginLeft: '10px',
    lineHeight: '20px',
  },
  enhanceTableOperation: {
    lineHeight: '28px',
  },
  operation: {
    marginRight: '12px',
    textDecoration: 'none',
  },
  card: {
    minHeight: 0,
    marginBottom: 20,
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  tabCount: {
    color: '#3080FE',
  },
  extraFilter: {
    display: 'flex',
    alignItems: 'center',
  },
  search: {
    marginLeft: 10,
  },
  pagination: {
    textAlign: 'right',
    paddingTop: '26px',
  },
};
