import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Button,
  Table,
  Dialog,
  Pagination,
  Icon,
  Breadcrumb,
} from '@alifd/next';

import styles from './index.module.scss';

const { Column } = Table;
const PAGESIZE = 10;

// MOCK 数据，实际业务按需进行替换
const getData = () => {
  return Array.from({ length: 20 }).map((item, index) => {
    return {
      deviceId: `1000${index}`,
      typeId: `3${index}949245${index}`,
      modelId: `TAOBAO122${index}`,
      modelName: '测试设备',
      onlineStatus: '在线',
      connectStatus: '已连接',
      boundStatus: '未绑定',
    };
  });
};
const Fetch = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 200,
        content: {
          total: 88,
          dataSource: getData(),
        },
      });
    }, 1000);
  });

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTableLoading: true,
      dataSource: [],
      current: 1,
      total: 0,
    };
    // 输入框
    this.value = '';
  }

  componentDidMount() {
    this.getData(1, true);
  }

  getData(page = 1, isInit = false) {
    if (!isInit) {
      this.setState({
        isTableLoading: true,
      });
    }

    Fetch().then((data) => {
      if (data.code === 200) {
        const { content } = data;
        this.setState({
          dataSource: content.dataSource,
          isTableLoading: false,
          total: content.total,
          current: page,
        });
      }
    });
  }

  onClickDelete = () => {
    Dialog.confirm({
      title: '操作',
      style: { width: '250px' },
      content: '是否要删除该数据',
      onOk: () => {
        // 发送删除请求-loading-删除成功
      },
    });
  };

  onPaginationChange = (page) => {
    this.getData(page);
  };

  onSearch = () => {
    this.value = this.state.value;
    this.getData(1);
  };

  onInputChange = (value) => {
    this.setState({ value });
  };

  renderStatus = () => {
    const splitSpan = <span className={styles.split}>|</span>;
    const view = (
      <Link to="view" className={styles.action}>
        查看
      </Link>
    );
    const deleteItem = (
      <a
        href="javascrpt:void(0)"
        className={styles.action}
        onClick={this.onClickDelete}
      >
        删除
      </a>
    );
    const edit = (
      <Link to="edit" className={styles.action}>
        编辑
      </Link>
    );
    return (
      <div>
        {view}
        {splitSpan}
        {edit}
        {splitSpan}
        {deleteItem}
      </div>
    );
  };

  renderOnlineStatus = (value) => {
    return (
      <span style={{ color: '#ee6f6d', fontWeight: 'bold' }}>
        <i className={styles.dot} />
        {value}
      </span>
    );
  };

  renderBoundStatus = (value) => {
    return <span style={{ color: '#999' }}>{value}</span>;
  };

  renderConnectStatus = (value) => {
    return <span style={{ color: '#57ca9a' }}>{value}</span>;
  };

  render() {
    const { value, isTableLoading, total, current, dataSource } = this.state;
    return (
      <div className={styles.container}>
        <Breadcrumb className={styles.Breadcrumb}>
          <Breadcrumb.Item>型号管理</Breadcrumb.Item>
        </Breadcrumb>
        <div className={styles.content}>
          <div className={styles.head}>
            <Search
              type="primary"
              placeholder="输入型号／类型／ID"
              value={value}
              onChange={this.onInputChange}
              onSearch={this.onSearch}
              searchText="搜索"
            />
            <Link to="/edit">
              <Button type="primary">
                <Icon type="add" size="xs" style={{ marginRight: '4px' }} />
                新增
              </Button>
            </Link>
          </div>
          <Table
            hasBorder={false}
            isZebra={false}
            dataSource={dataSource}
            loading={isTableLoading}
            className="rhino-table"
          >
            <Column title="DeviceID" dataIndex="deviceId" />
            <Column title="型号ID" dataIndex="typeId" />
            <Column title="设备型号-ID" dataIndex="modelId" />
            <Column title="设备型号-名称" dataIndex="modelName" />
            <Column
              title="在线状态"
              dataIndex="onlineStatus"
              cell={this.renderOnlineStatus}
            />
            <Column
              title="连接状态"
              dataIndex="connectStatus"
              cell={this.renderConnectStatus}
            />
            <Column
              title="绑定状态"
              dataIndex="boundStatus"
              cell={this.renderBoundStatus}
            />
            <Column title="操作" cell={this.renderStatus} width={200} />
          </Table>
          <Pagination
            className={styles.pagination}
            current={current}
            onChange={this.onPaginationChange}
            total={total}
            pageSize={PAGESIZE}
          />
        </div>
      </div>
    );
  }
}

export default Home;
