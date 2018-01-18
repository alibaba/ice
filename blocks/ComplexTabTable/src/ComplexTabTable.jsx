/* eslint no-underscore-dangle:0 */
import React, { Component } from 'react';
import { Table, Pagination, Tab, DatePicker, Search } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import IceImg from '@icedesign/img';
import DataBinder from '@icedesign/data-binder';
import IceLabel from '@icedesign/label';
import SubCategoryItem from './SubCategoryItem';
import './ComplexTabTable.scss';

@DataBinder({
  tableData: {
    // 详细请求配置请参见 https://github.com/axios/axios
    url: '/mock/complex-tab-table-list.json',
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
export default class ComplexTabTable extends Component {
  static displayName = 'ComplexTabTable';

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.queryCache = {};
    this.state = {
      currentTab: 'solved',
      currentCategory: '1',
      tabList: [
        {
          text: '已解决',
          count: '123',
          type: 'solved',
          subCategories: [
            {
              text: '申请账号失败',
              id: '1',
            },
            {
              text: '粉丝数为0',
              id: '2',
            },
            {
              text: '空间不足',
              id: '3',
            },
            {
              text: '系统报错',
              id: '4',
            },
            {
              text: '网络异常',
              id: '5',
            },
            {
              text: '不在范围',
              id: '6',
            },
          ],
        },
        {
          text: '待解决',
          count: '10',
          type: 'needFix',
          subCategories: [
            {
              text: '网络异常',
              id: '21',
            },
            {
              text: '空间不足',
              id: '22',
            },
          ],
        },
        {
          text: '待验证',
          count: '32',
          type: 'needValidate',
          subCategories: [
            {
              text: '系统报错',
              id: '34',
            },
            {
              text: '网络异常',
              id: '35',
            },
            {
              text: '不在范围',
              id: '36',
            },
          ],
        },
      ],
    };
  }

  componentDidMount() {
    this.queryCache.page = 1;
    this.fetchData();
  }

  fetchData = () => {
    this.props.updateBindingData('tableData', {
      data: this.queryCache,
    });
  };

  renderTitle = (value, index, record) => {
    return (
      <div style={styles.titleWrapper}>
        <div>
          <IceImg src={record.cover} width={48} height={48} />
        </div>
        <span style={styles.title}>{record.title}</span>
      </div>
    );
  };

  editItem = (record, e) => {
    e.preventDefault();
    // todo
  };

  renderOperations = (value, index, record) => {
    return (
      <div
        className="complex-tab-table-operation"
        style={styles.complexTabTableOperation}
      >
        <a href="#" target="_blank" onClick={this.editItem.bind(this, record)}>
          解决
        </a>
        <a href="#" target="_blank">
          详情
        </a>
        <a href="#" target="_blank">
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
    const firstTabCatId = this.state.tabList.find((item) => {
      return item.type === tabKey;
    }).subCategories[0].id;

    this.setState({
      currentTab: tabKey,
      currentCategory: firstTabCatId,
    });
    this.queryCache.catId = firstTabCatId;
    this.fetchData();
  };

  onDateChange = (date, strDate) => {
    this.queryCache.date = strDate;
    this.fetchData();
  };

  onSearch = (value) => {
    this.queryCache.keywords = value.key;
    this.fetchData();
  };

  onSubCategoryClick = (catId) => {
    this.setState({
      currentCategory: catId,
    });
    this.queryCache.catId = catId;
    this.fetchData();
  };

  render() {
    const tableData = this.props.bindingData.tableData;

    const { tabList } = this.state;

    return (
      <div className="complex-tab-table">
        <IceContainer>
          <Tab
            onChange={this.onTabChange}
            type="bar"
            currentTab={this.state.currentTab}
            contentStyle={{
              padding: '4px 0 0 0',
            }}
            tabBarExtraContent={
              <div style={styles.tabExtra}>
                <DatePicker onChange={this.onDateChange} />
                <Search
                  style={styles.search}
                  type="normal"
                  inputWidth={150}
                  placeholder="搜索"
                  searchText=""
                  onSearch={this.onSearch}
                />
              </div>
            }
          >
            {tabList && tabList.length > 0
              ? tabList.map((tab) => {
                return (
                  <Tab.TabPane
                    key={tab.type}
                    tab={
                      <span>
                        {tab.text}{' '}
                        <span style={styles.tabCount}>{tab.count}</span>
                      </span>
                    }
                  >
                    {tab.subCategories && tab.subCategories.length > 0
                      ? tab.subCategories.map((catItem, index) => {
                        return (
                          <SubCategoryItem
                            {...catItem}
                            isCurrent={
                              catItem.id === this.state.currentCategory
                            }
                            onItemClick={this.onSubCategoryClick}
                            key={index}
                          />
                        );
                      })
                      : null}
                  </Tab.TabPane>
                );
              })
              : null}
          </Tab>
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
            />
          </div>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  complexTabTableOperation: { lineHeight: '28px' },
  titleWrapper: { display: 'flex', flexDirection: 'row' },
  title: { marginLeft: '10px', lineHeight: '20px' },
  tabExtra: { display: 'flex', alignItems: 'center' },
  search: { marginLeft: 10 },
  tabCount: { color: '#3080FE' },
  pagination: { textAlign: 'right', paddingTop: '26px' },
};
