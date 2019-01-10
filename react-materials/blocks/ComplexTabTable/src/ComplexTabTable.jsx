/* eslint no-underscore-dangle:0 */
import React, { Component } from 'react';
import { Table, Pagination, Tab, Search } from '@alifd/next';
import IceContainer from '@icedesign/container';
import IceImg from '@icedesign/img';
import IceLabel from '@icedesign/label';
import SubCategoryItem from './SubCategoryItem';
import data from './data';
import './ComplexTabTable.scss';

export default class ComplexTabTable extends Component {
  static displayName = 'ComplexTabTable';

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.queryCache = {};
    this.state = {
      isMobile: false,
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
    // TODO: record 为该行所对应的数据，可自定义操作行为
  };

  renderOperations = (value, index, record) => {
    return (
      <div style={styles.complexTabTableOperation}>
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

  onSubCategoryClick = (catId) => {
    this.setState({
      currentCategory: catId,
    });
    this.queryCache.catId = catId;
    this.fetchData();
  };

  renderTabBarExtraContent = () => {
    return (
      <div style={styles.tabExtra}>
        <Search
          style={styles.search}
          type="secondary"
          placeholder="搜索"
          searchText=""
          onSearch={this.onSearch}
        />
      </div>
    );
  };

  render() {
    const { tabList } = this.state;

    return (
      <div className="complex-tab-table">
        <IceContainer>
          <Tab
            onChange={this.onTabChange}
            shape="bar"
            currentTab={this.state.currentTab}
            contentStyle={{
              padding: 0,
            }}
            extra={
              !this.state.isMobile ? this.renderTabBarExtraContent() : null
            }
          >
            {tabList && tabList.length > 0
              ? tabList.map((tab) => {
                  return (
                    <Tab.Item
                      key={tab.type}
                      title={
                        <span>
                          {tab.text}
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
                    </Tab.Item>
                  );
                })
              : null}
          </Tab>
        </IceContainer>
        <IceContainer>
          <Table
            dataSource={data}
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
            <Pagination />
          </div>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  complexTabTableOperation: {
    lineHeight: '28px',
  },
  titleWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    marginLeft: '10px',
    lineHeight: '20px',
  },
  operation: {
    marginRight: '12px',
    textDecoration: 'none',
  },
  tabExtra: {
    display: 'flex',
    alignItems: 'center',
  },
  search: {
    marginLeft: 10,
  },
  tabCount: {
    marginLeft: '5px',
    color: '#3080FE',
  },
  pagination: {
    textAlign: 'right',
    paddingTop: '26px',
  },
};
